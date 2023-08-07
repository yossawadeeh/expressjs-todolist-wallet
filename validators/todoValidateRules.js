const { body } = require("express-validator");

const todoValidationRules = () => {
  return [
    body("topic").notEmpty().withMessage("topic is required."),
  ];
};

module.exports = {
    todoValidationRules
};
     