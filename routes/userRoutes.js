const express = require('express');
const router = express.Router();
const { userRegistration, userLogin, changeUserPassword, loggedUser } = require('../controllers/userController');
const {checkUserAuth} = require("../middlewares/auth-middleware")

// route level middleware to PRotect route
router.use('/changepassword',checkUserAuth)
router.use('/changepassword',loggedUser)


// public routes

router.post('/register',userRegistration)
router.post('/login',userLogin)


// private routes

router.post('/changepassword',changeUserPassword)
router.get('/changepassword',loggedUser)

module.exports = router;