const { AuthUser } = require('../models/authUser');
const bcrypt = require('bcrypt');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const messages = require('../utils/message');
const { StatusCodes } = require('http-status-codes');
const enumMessage = require('../utils/enum');
const { generateToken } = require('../middleware/auth');

async function registerUser(body, next) {
  const { email, password } = body;
  try {
    
    const findUser = await AuthUser.findOne({ email });
    
    if (!findUser) {
     
      const salt = await bcrypt.genSalt(10);
     
      const hashedPassword = await bcrypt.hash(password, salt);
      body.password = hashedPassword;
      await AuthUser.create(body);
      next(new GeneralResponse(enumMessage.SUCCESS, StatusCodes.OK, messages.REGISTER_SUCCESS, null));
    } else {
      next(new GeneralError(enumMessage.ERROR, StatusCodes.BAD_REQUEST, messages.ALREADY_EXIST, null));
    }
  } catch (err) {
    next(new GeneralError(enumMessage.ERROR, StatusCodes.INTERNAL_SERVER_ERROR, `${messages.REQUEST_FAILURE} registration`, null));
  }
}


async function getAllUsers() {
  return await AuthUser.find();
}

async function login(body, next) {
  try {
    const { email, password } = body;
    const findUser = await AuthUser.findOne({ email }).catch(
      (err) => {
        next(
          new GeneralError(
            enumMessage.ERROR,
            StatusCodes.INTERNAL_SERVER_ERROR,
            `${messages.REQUEST_FAILURE} find`,
            null,
          ),
        );
      },
    );

    if (!findUser) {
      next(
        new GeneralResponse(
          enumMessage.ERROR,
          StatusCodes.NOT_FOUND,
          messages.INCORRECT_EMAIL,
          null,
        ),
      );
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        findUser.password,
      );

      if (comparePassword) {
        const token = generateToken({
          id: findUser.id,
          role: findUser.role,
        });
        next(
          new GeneralResponse(
            enumMessage.SUCCESS,
            StatusCodes.OK,
            findUser.role + messages.LOGIN_SUCCESS,
            token,
          ),
        );
      } else {
        next(
          new GeneralResponse(
            enumMessage.ERROR,
            StatusCodes.BAD_REQUEST,
            `Your ${messages.INCORRECT_PASSWORD}`,
            null,
          ),
        );
      }
    }
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
  getAllUsers,
  login,
};
