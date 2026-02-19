const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, name: 1 });
        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single skill by ID
// @route   GET /api/skills/:id
// @access  Public
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json({ success: true, data: skill });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.status(200).json({ success: true, message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
