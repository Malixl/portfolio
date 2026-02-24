const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
        },
        description: {
            type: String,
        },
        content: {
            type: String,
        },
        image: {
            type: String,
        },
        category: {
            type: [String],
        },
        techStack: {
            type: [String],
        },
        hardSkills: {
            type: [String],
        },
        softSkills: {
            type: [String],
        },
        relatedTo: {
            type: String,
        },
        links: [{
            label: String,
            url: String,
            icon: String
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
