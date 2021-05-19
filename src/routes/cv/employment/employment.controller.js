const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const employmentService = require('./employment.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        company: Joi.string(),
        position: Joi.string(),
        location: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    employmentService.set(req.body)
        .then(() => res.json({ message: 'Successfully added employment value' }))
        .catch(next);
}

function getById(req, res, next) {
    employmentService.getById(req.params.id)
        .then(employment => res.json(employment))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        company: Joi.string(),
        position: Joi.string(),
        location: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    employmentService.update(req.params.id, req.body)
        .then(employment => res.json(employment))
        .catch(next);
}
