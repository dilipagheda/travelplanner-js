class BadRequest extends Error {
  constructor(statusCode, message) {
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequest);
    }

    this.name = "BadRequest";
    // Custom debugging information
    this.statusCode = statusCode;
    this.date = new Date();
  }
}

module.exports = BadRequest;
