const Profile = require('../models/Profile');

// @desc    Get profile data (public)
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne();

        // Return null data if no profile (frontend handles "no data" state)
        if (!profile) {
            return res.status(200).json({ success: true, data: null });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update or Create profile (admin)
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
    try {
        const { name, headline, bio, location, status, socialLinks, avatar, resumeLink } = req.body;

        // Ensure headline is an array (handle comma-separated string input from simple forms)
        let processedHeadline = headline;
        if (typeof headline === 'string') {
            processedHeadline = headline.split(',').map(h => h.trim()).filter(h => h.length > 0);
        }

        // Upsert logic: find existing or create new
        let profile = await Profile.findOne();

        if (profile) {
            // Update
            profile = await Profile.findByIdAndUpdate(
                profile._id,
                { name, headline: processedHeadline, bio, location, status, socialLinks, avatar, resumeLink },
                { new: true, runValidators: true }
            );
        } else {
            // Create
            profile = await Profile.create({
                name, headline: processedHeadline, bio, location, status, socialLinks, avatar, resumeLink
            });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};
