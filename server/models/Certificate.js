const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Certificate title is required'],
        },
        issuer: {
            type: String,
            required: [true, 'Issuer is required'],
        },
        date: {
            type: String,
        },
        credentialUrl: {
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

module.exports = mongoose.model('Certificate', CertificateSchema);
