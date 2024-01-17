const authUserService = require('../services/authUserService');
const { GeneralError } = require('../utils/error');
const enumMessage = require('../utils/enum');
const { StatusCodes } = require('http-status-codes');
const messages = require('../utils/message');

async function registerUser(req, res, next) {
  try {
   return await authUserService.registerUser(req.body, next);
  } catch (error) {
      next(
        new GeneralError(
          enumMessage.ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          `${messages.REQUEST_FAILURE} registration`,
          null,
        ),
      );
  }
}

async function loginUser(req, res, next) {


  try {
    return await authUserService.login(req.body, next);
  } catch (err) {
    next(
      new GeneralError(
        enumMessage.ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        `${messages.REQUEST_FAILURE} login`,
        null,
      ),
    );
  }
}
module.exports = {
  registerUser,
  loginUser,
};
