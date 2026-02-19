const Education = require('../models/Education');

// @desc    Get all education entries
// @route   GET /api/education
// @access  Public
exports.getEducations = async (req, res) => {
    try {
        const education = await Education.find().sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: education.length,
            data: education,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Get single education entry
// @route   GET /api/education/:id
// @access  Public
exports.getEducationById = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                message: 'Education entry not found',
            });
        }

        res.status(200).json({
            success: true,
            data: education,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Create new education entry
// @route   POST /api/education
// @access  Private
exports.createEducation = async (req, res) => {
    try {
        const education = await Education.create(req.body);

        res.status(201).json({
            success: true,
            data: education,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Update education entry
// @route   PUT /api/education/:id
// @access  Private
exports.updateEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!education) {
            return res.status(404).json({
                success: false,
                message: 'Education entry not found',
            });
        }

        res.status(200).json({
            success: true,
            data: education,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// @desc    Delete education entry
// @route   DELETE /api/education/:id
// @access  Private
exports.deleteEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                message: 'Education entry not found',
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
