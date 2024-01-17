const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message')
const handleResponse = (response, req, res, next) => {
  if (response instanceof GeneralResponse || response instanceof GeneralError) {
    return res.status(response.statusCode || StatusCodes.OK).json({
      status: response.status || message.SUCCESS,
      statusCode: response.statusCode || StatusCodes.OK,
      message: response.message || message.REQUEST_SUCCESFUL,
      data: response.result || response.data,
    });
  }
  next(response);
};

module.exports = handleResponse;
