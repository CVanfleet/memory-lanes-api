const { body, validationResult, param } = require('express-validator')

const createEventValidation = () => {
    return [
        // Event Name must be a string and must not be empty
        body('eventName').isString().withMessage("Event name must be a string").notEmpty().withMessage("Event name must not be empty."),
        // Event Discription must be a string and cannot be empty
        body('eventDescription').isString().withMessage("Event description must be a string").notEmpty().withMessage("Event description must not be empty."),
        // lat must be a valid latitude value
        body('lat').isDecimal().withMessage("lat must be a valid latitude value (decimal)").notEmpty().withMessage("lat must not be empty."),
        // long must be a valid longitude value
        body('long').isDecimal().withMessage("long must be a valid longitude value (decimal)").notEmpty().withMessage("long must not be empty."),
        // Event start date must be a valid date
        body('eventStartDate').isISO8601().toDate().withMessage("event start date must be a valid date").notEmpty().withMessage("event start date must not be empty"),
        // Event end date must be a valid end date
        body('eventEndDate').isISO8601().toDate().withMessage("event end date must be a valid date").notEmpty().withMessage("event end date must not be empty")
            
    ]
}

const updateEventValidation = () => {
    return [
        // Event Name must be a string 
        body('eventName').isString().withMessage("Event name must be a string"),
        // Event Discription must be a string 
        body('eventDescription').isString().withMessage("Event description must be a string"),
        // lat must be a valid latitude value
        body('lat').isDecimal().withMessage("lat must be a valid latitude value (decimal)"),
        // long must be a valid longitude value
        body('long').isDecimal().withMessage("long must be a valid longitude value (decimal)"),
        // Event start date must be a valid date
        body('eventStartDate').isISO8601().toDate().withMessage("event start date must be a valid date"),
        // Event end date must be a valid end date
        body('eventEndDate').isISO8601().toDate().withMessage("event end date must be a valid date")
    ]
}

const eventIdValidation = () => {
    return [
        param('id').isLength({min: 24, max: 24}).withMessage("The id should be 24 characters long.")
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
    updateEventValidation,
    eventIdValidation,
    validateError,
  }