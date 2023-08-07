const { body } = require("express-validator");

const transactionValidationRules = () => {
  return [
    body("type").notEmpty().withMessage("type must be income or outcome only."),
    body("category").notEmpty(),
    body("total")
      .notEmpty()
      .isFloat({ min: 0.1})
      .withMessage("total much less than 0.1."),
  ];
};

module.exports = {
  transactionValidationRules
};
