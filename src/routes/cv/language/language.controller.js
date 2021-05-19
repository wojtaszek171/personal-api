const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const languageService = require('./language.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        school: Joi.string(),
        degree: Joi.string(),
        location: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: Joi.string()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    languageService.set(req.body)
        .then(() => res.json({ message: 'Successfully added language value' }))
        .catch(next);
}

function getById(req, res, next) {
    languageService.getById(req.params.id)
        .then(language => res.json(language))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        school: Joi.string(),
        degree: Joi.string(),
        location: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    languageService.update(req.params.id, req.body)
        .then(language => res.json(language))
        .catch(next);
}
