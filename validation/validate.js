const { body, validationResult } = require('express-validator')

const createEventValidation = () => {
    return [
        // Event Name must be a string and must not be empty
        body('eventName').isString().withMessage("Event name must be a string").notEmpty().withMessage("Event name must not be empty.")
            .bail(),
        // Event Discription must be a string and cannot be empty
        body('eventDescription').isString().withMessage("Event description must be a string").notEmpty().withMessage("Event description must not be empty.")
            .bail(),
        // lat must be a valid latitude value
        body('lat').isDecimal().withMessage("lat must be a valid latitude value (decimal)").notEmpty().withMessage("lat must not be empty.")
            .bail(),
        // long must be a valid longitude value
        body('long').isDecimal().withMessage("long must be a valid longitude value (decimal)").notEmpty().withMessage("long must not be empty.")
            .bail(),
        // Event start date must be a valid date
        body('eventStartDate').isISO8601().toDate().withMessage("event start date must be a valid date").notEmpty().withMessage("event start date must not be empty")
            .bail(),
        // Event end date must be a valid end date
        body('eventEndDate').isISO8601().toDate().withMessage("event end date must be a valid date").notEmpty().withMessage("event end date must not be empty")
            .bail()
    ]
}

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }

  module.exports = {
    createEventValidation,
    validateError,
  }