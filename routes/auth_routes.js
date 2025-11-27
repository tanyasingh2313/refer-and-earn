const express=require('express');
const router=express.Router();

const {register_user, login_user, logout_user, profile_user} = require('../controllers/auth_controller');
const {protect} = require('../middlewares/protect');
router.post('/register',register_user);
router.post('/login',login_user);
router.get('/logout',logout_user);
router.get('/profile',protect,profile_user);

module.exports=router;