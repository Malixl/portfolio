const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Skill name is required'],
        },
        icon: {
            type: String,
        },
        type: {
            type: String,
            enum: ['tech', 'hardskill', 'softskill'],
            default: 'tech',
        },
        category: {
            type: String,
        },
        // Updated: Changed from Number (0-100) to String enum
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
            default: 'Intermediate',
        },
        description: {
            type: String,
        },
        year: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Skill', SkillSchema);
