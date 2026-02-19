const cloudinary = require('../config/cloudinary');

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload to Cloudinary from buffer
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio',
                    resource_type: 'image',
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' },
                    ],
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        res.status(200).json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: error.message || 'Upload failed' });
    }
};

// @desc    Upload document (PDF, etc.) to Cloudinary
// @route   POST /api/upload/document
// @access  Private
exports.uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio/documents',
                    resource_type: 'raw',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        res.status(200).json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ success: false, message: error.message || 'Upload failed' });
    }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload
// @access  Private
exports.deleteImage = async (req, res) => {
    try {
        const { publicId } = req.body;
        if (!publicId) {
            return res.status(400).json({ success: false, message: 'Public ID is required' });
        }

        await cloudinary.uploader.destroy(publicId);
        res.status(200).json({ success: true, message: 'Image deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
