const Joi = require("joi");
const  getShowTimesMiddleware = (req, res, next) => {
  try { 
    if (req.headers["content-type"] !== "application/json") {
      return res.status(415).json({
        message: `only application/json is acceptable as content-type , ${req.headers["content-type"]} is not the correct content type  `,
      });
    }
    const bodySchema = Joi.object({
      mapperId: Joi.string().required().trim(),
    });

    function getReadableErrorMessage(formattedError) {
      const errorFields = formattedError.split(".");
      const fieldNames = errorFields.map((field) => {
        const fieldName = field
          .split(/[\[\]"']/)
          .filter((item) => item !== "")
          .join(".");
        return fieldName.charAt(0) + fieldName.slice(1);
      });
      const readableErrorMessage = fieldNames.join(".") + " ";
      return readableErrorMessage;
    }

    const bodyValidationResult = bodySchema.validate(req.body); 

    if (bodyValidationResult.error) {
      const formattedError =
        bodyValidationResult.error.details[0].message.replace(/"/g, "");
      return res
        .status(400)
        .json({ message: getReadableErrorMessage(formattedError) });
    }

    next();
    
  } catch (error) {
    console.log(error);
    return res 
      .status(400)
      .json({ error: "Invalid data format. Please check your data." });
  }
};

module.exports = { getShowTimesMiddleware };
