const express = require('express');
const router = express.Router();

// Middleware
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Controllers
const authController = require('../controllers/authController');
const projectController = require('../controllers/projectController');
const skillController = require('../controllers/skillController');
const experienceController = require('../controllers/experienceController');
const blogController = require('../controllers/blogController');
const achievementController = require('../controllers/achievementController');
const educationController = require('../controllers/educationController');
const profileController = require('../controllers/profileController');
const certificateController = require('../controllers/certificateController');
const uploadController = require('../controllers/uploadController');

// ==================== AUTH ROUTES (Public) ====================
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// ==================== PROJECT ROUTES ====================
router.get('/projects', projectController.getProjects);
router.post('/projects', protect, projectController.createProject);
router.put('/projects/:id', protect, projectController.updateProject);
router.delete('/projects/:id', protect, projectController.deleteProject);

// ==================== SKILL ROUTES ====================
router.get('/skills', skillController.getSkills);
router.post('/skills', protect, skillController.createSkill);
router.put('/skills/:id', protect, skillController.updateSkill);
router.delete('/skills/:id', protect, skillController.deleteSkill);

// ==================== EXPERIENCE ROUTES ====================
router.get('/experiences', experienceController.getExperiences);
router.post('/experiences', protect, experienceController.createExperience);
router.put('/experiences/:id', protect, experienceController.updateExperience);
router.delete('/experiences/:id', protect, experienceController.deleteExperience);

// ==================== BLOG ROUTES ====================
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', protect, blogController.createBlog);
router.put('/blogs/:id', protect, blogController.updateBlog);
router.delete('/blogs/:id', protect, blogController.deleteBlog);

// ==================== ACHIEVEMENT ROUTES ====================
router.get('/achievements', achievementController.getAchievements);
router.post('/achievements', protect, achievementController.createAchievement);
router.put('/achievements/:id', protect, achievementController.updateAchievement);
router.delete('/achievements/:id', protect, achievementController.deleteAchievement);

// ==================== EDUCATION ROUTES ====================
router.get('/educations', educationController.getEducations);
router.post('/educations', protect, educationController.createEducation);
router.put('/educations/:id', protect, educationController.updateEducation);
router.delete('/educations/:id', protect, educationController.deleteEducation);

// ==================== CERTIFICATE ROUTES ====================
router.get('/certificates', certificateController.getCertificates);
router.post('/certificates', protect, certificateController.createCertificate);
router.put('/certificates/:id', protect, certificateController.updateCertificate);
router.delete('/certificates/:id', protect, certificateController.deleteCertificate);

// ==================== PROFILE ROUTES ====================
router.get('/profile', profileController.getProfile);
router.put('/profile', protect, profileController.updateProfile);

// ==================== UPLOAD ROUTES ====================
router.post('/upload', protect, upload.single('image'), uploadController.uploadImage);
router.delete('/upload', protect, uploadController.deleteImage);

// Document upload (PDF for CV, etc.)
const multer = require('multer');
const docUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});
router.post('/upload/document', protect, docUpload.single('document'), uploadController.uploadDocument);

module.exports = router;
