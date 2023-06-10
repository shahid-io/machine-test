const { StatusCodes } = require("http-status-codes");

function validateLoginRequest(req, res, next) {
  if (!req.body.email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while Login User : validateLoginRequest()",
      explanation:
        "email not found in the incoming request in the correct form",
    });
  }
  if (!req.body.password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while Login User : validateLoginRequest()",
      explanation:
        "password not found in the incoming request in the correct form",
    });
  }
  /**
   * if above if condition didn't get executed we can call next middleware.
   */
  next();
}

module.exports = { validateLoginRequest };
