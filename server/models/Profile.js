const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        headline: {
            type: [String],
            trim: true,
            default: ['Full-Stack Developer']
        },
        bio: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            default: 'Open to Work',
            trim: true
        },
        socialLinks: {
            github: { type: String, trim: true },
            linkedin: { type: String, trim: true },
            instagram: { type: String, trim: true },
            behance: { type: String, trim: true },
            email: { type: String, trim: true }
        },
        avatar: {
            type: String,
            trim: true // URL to image
        },
        resumeLink: {
            type: String,
            trim: true // URL to resume PDF
        }
    },
    { timestamps: true }
);

// Ensure only one profile document exists (singleton pattern via logic, or just convention)
module.exports = mongoose.model('Profile', ProfileSchema);
