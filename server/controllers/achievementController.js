const Achievement = require('../models/Achievement');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: achievements.length,
            data: achievements,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
exports.getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement not found',
            });
        }

        res.status(200).json({
            success: true,
            data: achievement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Create new achievement
// @route   POST /api/achievements
// @access  Private
exports.createAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.create(req.body);

        res.status(201).json({
            success: true,
            data: achievement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private
exports.updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement not found',
            });
        }

        res.status(200).json({
            success: true,
            data: achievement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
// @access  Private
exports.deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement not found',
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
