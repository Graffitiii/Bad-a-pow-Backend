const router = require('express').Router();
const EventController = require('../controller/event.controller');

router.post('/createEvent',EventController.createEvent);

router.get('/getEventList',EventController.getEventList);

router.put('/putEvent/:id',EventController.putEventList);

router.delete('/deleteEvent',EventController.deleteEvent);

router.get('/getOwnEvent',EventController.getOwnEventList);

module.exports = router;