const { query } = require("express-validator");
const { TypeTransaction } = require("../enum/enums");

const searchValidateRule = () => {
  return [
    query("startDate").optional().isDate().withMessage("invalid date."),
    query("endDate").optional().isDate().withMessage("invalid date."),
    query("type")
      .optional()
      .isIn(Object.values(TypeTransaction)),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
  ];
};

module.exports = {
  searchValidateRule,
};
