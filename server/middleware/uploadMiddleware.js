const multer = require('multer');

// Store files in memory buffer (we'll upload to Cloudinary, not disk)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
});

module.exports = upload;
