const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const educationService = require('./education.service');
const translationModel = require('../../strings/translationModel');

// routes
router.get('/', getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    educationService.getAll()
        .then(skills => res.json(skills))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        school: translationModel,
        degree: translationModel,
        location: translationModel,
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: translationModel
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
        school: translationModel,
        degree: translationModel,
        location: translationModel,
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: translationModel
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    educationService.update(req.params.id, req.body)
        .then(education => res.json(education))
        .catch(next);
}

function _delete(req, res, next) {
    educationService.delete(req.params.id)
        .then(() => res.json({ message: 'Education deleted successfully' }))
        .catch(next);
}
