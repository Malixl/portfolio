const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
exports.getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found',
            });
        }

        res.status(200).json({
            success: true,
            data: experience,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private
exports.createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);

        res.status(201).json({
            success: true,
            data: experience,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
exports.updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found',
            });
        }

        res.status(200).json({
            success: true,
            data: experience,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};
