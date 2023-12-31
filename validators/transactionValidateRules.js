const { body } = require("express-validator");
const { TypeTransaction } = require("../enum/enums")

const transactionValidationRules = () => {
  return [
    body("transactionDate")
      .notEmpty()
      .isDate()
      .withMessage("transactionDate should be valid date"),
    body("type")
      .notEmpty()
      .isIn(Object.values(TypeTransaction)),
    body("category").notEmpty(),
    body("total")
      .notEmpty()
      .isFloat({ min: 0.1 })
      .withMessage("total much less than 0.1."),
    body("note").optional(),
  ];
};

module.exports = {
  transactionValidationRules,
};
 