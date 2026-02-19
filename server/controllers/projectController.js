const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
