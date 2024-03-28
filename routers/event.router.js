const router = require('express').Router();
const EventController = require('../controller/event.controller');

router.post('/createEvent',EventController.createEvent);

router.get('/getEventList',EventController.getEventList);

router.put('/putEvent/:id',EventController.putEventList);

router.delete('/deleteEvent',EventController.deleteEvent);

router.get('/getOwnEvent',EventController.getOwnEventList);

router.put('/putEventStatus',EventController.putEventStatus);

router.get('/getEventDetail',EventController.getEventDetail);

router.get('/getFilter',EventController.getFilter);

router.get('/getPendingEvent',EventController.getPendingEvent);
router.get('/getJoinEvent',EventController.getJoinEvent);

router.put('/editEvent',EventController.editEvent);



module.exports = router;