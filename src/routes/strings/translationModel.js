const Joi = require('joi');

module.exports = translationModel = Joi.object({
    'en-us': Joi.string(),
    'pl-pl': Joi.string()
});
