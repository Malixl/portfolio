const express = require('express');
const router = express.Router();
const {
    getAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
} = require('../controllers/achievementController');

router.route('/').get(getAchievements).post(createAchievement);
router.route('/:id').get(getAchievementById).put(updateAchievement).delete(deleteAchievement);

module.exports = router;
