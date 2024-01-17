
class GeneralResponse {
  constructor(status, statusCode, message, result) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
}

module.exports = {
  GeneralResponse,
};
