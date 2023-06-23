const express = require('express');
const router = express.Router();
const { userRegistration, userLogin, changeUserPassword } = require('../controllers/userController');

// public routes

router.post('/register',userRegistration)
router.post('/login',userLogin)


// private routes

router.post('/changepassword',changeUserPassword)

module.exports = router;