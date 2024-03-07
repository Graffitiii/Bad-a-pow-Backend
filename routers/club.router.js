const router = require('express').Router();
const ClubController = require('../controller/club.controller');

router.post('/createClub',ClubController.createClub);
router.get('/getClub',ClubController.getClub);

module.exports = router;