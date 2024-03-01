const router = require('express').Router();
const ClubController = require('../controller/club.controller');

router.post('/createClub',ClubController.createClub);

module.exports = router;