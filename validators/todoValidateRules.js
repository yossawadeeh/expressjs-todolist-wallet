const { body } = require("express-validator");

const todoValidationRules = () => {
  return [
    body("topic").notEmpty().withMessage("topic is required."),
    body("description").optional(),
    body("isDone").isBoolean().withMessage("isDone should be boolean."),
    body("todoDate")
      .optional()
      .isDate()
      .withMessage("todoDate should be valid date"),
  ];
};

module.exports = {
  todoValidationRules,
};
