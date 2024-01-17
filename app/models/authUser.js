const mongoose = require('mongoose');
const enumMessage = require('../utils/enum');

const authUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
    maxlength: 150
  },
  phone_number: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  profile_image: {
    type: String
  },
  status: {
    type: String,
    enum: [enumMessage.ACTIVE, enumMessage.DEACTIVE],
    required: true,
    maxlength: 10
  },
  role: {
    type: String,
    enum: [enumMessage.USER, enumMessage.ADMIN, enumMessage.ORGANIZATION],
    required: true,
    maxlength: 10
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

const AuthUser = mongoose.model('AuthUser', authUserSchema);

module.exports = {
  AuthUser
};
