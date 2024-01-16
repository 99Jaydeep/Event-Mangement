const { GeneralError } = require('../utils/error');

const handleErrors = (err, res) => {
  if (err instanceof GeneralError) {
    return res
      .status(err.statusCode !== '' ? err.statusCode : err.getCode())
      .json({
        status: err.status,
        statusCode: err.statusCode !== '' ? err.statusCode : err.getCode(),
        message: err.message,
        result: err.result !== '' ? err.result : undefined,
      });
  }
};

const handleJoiErrors = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const customErrorResponse = {};
    if (err.error.details.length !== 0) {
      err.error.details.forEach((item) => {
        customErrorResponse[`${item.context.key}`] = {
          message: item.message,
          context: item.context.label,
          type: item.type,
        };
      });
    }
    res.status(404).send(customErrorResponse);
  } else {
    next(err);
  }
};

module.exports = { handleErrors, handleJoiErrors };
