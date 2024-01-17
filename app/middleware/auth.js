const jwt = require('jsonwebtoken');
const { GeneralResponse } = require('../utils/response');
const messages = require('../utils/message');
const enumMessage = require('../utils/enum');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

module.exports = {
  generateToken: (req) => {
    const { id, role } = req;
    return jwt.sign({ id, role }, process.env.PRIVATE_KEY, {
      expiresIn: '24h',
    });
  },

  authorization: (req, res, next) => {
    try {
      const token_value = req.header('x-auth-token');
      if (token_value == undefined) {
        next(
          new GeneralResponse(
            enumMessage.ERROR,
            StatusCodes.UNAUTHORIZED,
            messages.TOKEN_MISSING,
            null,
          ),
        );
      }
      const verify = jwt.verify(token_value, process.env.PRIVATE_KEY);
      req.user = verify;
      next();
    } catch (err) {
      next(
        new GeneralResponse(
          enumMessage.ERROR,
          StatusCodes.FORBIDDEN,
          messages.INVALID_TOKEN,
          null,
        ),
      );
    }
  },
};
