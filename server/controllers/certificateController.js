const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
exports.getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
exports.getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.status(200).json({ success: true, data: certificate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a new certificate
// @route   POST /api/certificates
// @access  Private
exports.createCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.create(req.body);
        res.status(201).json({ success: true, data: certificate });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private
exports.updateCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.status(200).json({ success: true, data: certificate });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private
exports.deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
