const Joi = require('joi');

module.exports = translationModel = Joi.object({
    en_us: Joi.string(),
    pl_pl: Joi.string()
});
