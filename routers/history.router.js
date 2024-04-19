const router = require('express').Router();
const HistoryController = require('../controller/history.controller');

router.post('/createHistory',HistoryController.createHistory);
router.get('/findHistory',HistoryController.findHistory);

module.exports = router;