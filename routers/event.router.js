const router = require('express').Router();
const EventController = require('../controller/event.controller');

router.post('/createEvent',EventController.createEvent);

router.get('/getEventList',EventController.getEventList);

router.delete('/deleteEvent',EventController.deleteEvent);

router.get('/getOwnEvent',EventController.getOwnEventList);

router.put('/startEvent',EventController.startEvent);

router.get('/getEventDetail',EventController.getEventDetail);

router.get('/getFilter',EventController.getFilter);

router.get('/getPendingEvent',EventController.getPendingEvent);
router.get('/getJoinEvent',EventController.getJoinEvent);

router.put('/editEvent',EventController.editEvent);


router.delete('/cancelEvent',EventController.cancelEvent);



module.exports = router;