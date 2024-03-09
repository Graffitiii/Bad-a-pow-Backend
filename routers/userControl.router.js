const router = require('express').Router();
const UserControlController = require("../controller/userControl.controller")

router.post('/userControlStore',UserControlController.createUserControl);
router.post('/userControlAddFollow',UserControlController.addFollowClub);
router.delete('/userControlUnFollow',UserControlController.unFollowClub);
router.post('/userControlRegisOwner',UserControlController.registerOwner);

module.exports = router;