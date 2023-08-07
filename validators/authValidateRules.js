const { body } = require("express-validator");

const registerValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("username is required."),
    body("email").notEmpty().isEmail().withMessage("email must be an email."),
    body("password")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("password much more than 3 characters."),
  ];
};

const loginValidationRules = () => {
  return [
    body("email").notEmpty().isEmail().withMessage("email must be an email."),
    body("password").notEmpty(),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
