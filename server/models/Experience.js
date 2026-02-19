const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: [true, 'Role is required'],
        },
        company: {
            type: String,
            required: [true, 'Company is required'],
        },
        period: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Experience', ExperienceSchema);
