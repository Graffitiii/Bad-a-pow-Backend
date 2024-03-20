const router = require('express').Router();
const UserControlController = require("../controller/userControl.controller")

router.post('/userControlStore',UserControlController.createUserControl);
router.post('/userControlAddFollow',UserControlController.addFollowClub);
router.delete('/userControlUnFollow',UserControlController.unFollowClub);
router.post('/userControlRegisOwner',UserControlController.registerOwner);
router.get('/getUserControl',UserControlController.getUserControl);
router.post('/requestJoinEvent',UserControlController.sendRequest);
router.delete('/unRequestEvent',UserControlController.unRequest);

router.post('/joinEvent',UserControlController.joinEvent);
router.delete('/unJoinEvent',UserControlController.unJoinEvent);

module.exports = router;