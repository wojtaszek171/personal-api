const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const educationService = require('./education.service');

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
    educationService.set(req.body)
        .then(() => res.json({ message: 'Successfully added education value' }))
        .catch(next);
}

function getById(req, res, next) {
    educationService.getById(req.params.id)
        .then(education => res.json(education))
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
    educationService.update(req.params.id, req.body)
        .then(education => res.json(education))
        .catch(next);
}
