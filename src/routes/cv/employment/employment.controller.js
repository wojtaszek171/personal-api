const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize')
const employmentService = require('./employment.service');
const translationModel = require('../../strings/translationModel');

// routes
router.get('/', getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    employmentService.getAll()
        .then(employments => res.json(employments))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
        company: Joi.string(),
        position: translationModel,
        location: translationModel,
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: translationModel
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
        position: translationModel,
        location: translationModel,
        startDate: Joi.date(),
        endDate: Joi.date(),
        details: translationModel
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    employmentService.update(req.params.id, req.body)
        .then(employment => res.json(employment))
        .catch(next);
}

function _delete(req, res, next) {
    employmentService.delete(req.params.id)
        .then(() => res.json({ message: 'Employment deleted successfully' }))
        .catch(next);
}
