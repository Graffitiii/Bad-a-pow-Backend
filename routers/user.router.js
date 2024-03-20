const router = require('express').Router();
const UserController = require("../controller/user.controller")

router.post('/registration',UserController.register);
router.post('/login',UserController.login);
router.get('/getUser',UserController.getUser);
router.put('/editProfile',UserController.editProfile);

module.exports = router;