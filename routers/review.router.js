const router = require('express').Router();
const ReviewController = require('../controller/review.controller');

router.post('/createReview',ReviewController.createReview);

router.get('/getReviewList',ReviewController.getReviewList);

module.exports = router;