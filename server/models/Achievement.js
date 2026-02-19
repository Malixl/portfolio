const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        issuer: {
            type: String,
        },
        date: {
            type: Date,
        },
        proofLink: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Achievement', AchievementSchema);
