const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
    {
        institution: {
            type: String,
            required: [true, 'Institution name is required'],
        },
        degree: {
            type: String,
            required: [true, 'Degree is required'],
        },
        field: {
            type: String,
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

module.exports = mongoose.model('Education', EducationSchema);
