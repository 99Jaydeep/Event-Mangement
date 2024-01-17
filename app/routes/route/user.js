const express = require('express');
const router = express.Router();
const authUserController = require('../../controller/authUserController');
const { validator } = require('../../middleware/validator');
const validate = require('../../validations/authUserValidation');
const {handleErrors}= require('../../middleware/error')

router.post('/register', authUserController.registerUser, validator.body(validate.validateUserSchema));
router.post('/login', authUserController.loginUser, validator.body(validate.loginValidation));

router.use(handleErrors);
module.exports = router;