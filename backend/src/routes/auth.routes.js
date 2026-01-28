const express = require('express');
const authController = require("../controllers/auth.controller.js")


const router = express.Router();

// verify token
router.get('/verify', authController.verifyToken)

// user auth APIs
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.post('/user/logout',authController.logoutUser)

// FoodPartner APIs
router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login',authController.loginFoodPartner)
router.get('/food-partner/logout',authController.logoutFoodPartner)


module.exports = router;

