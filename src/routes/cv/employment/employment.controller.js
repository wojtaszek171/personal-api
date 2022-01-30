const express = require('express');
const router = express.Router({mergeParams: true});
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const employmentService = require('./employment.service');
const translationModel = require('../../strings/translationModel');

// routes
router.get('/', authorize(true), getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', authorize(true), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    const { params: { cvId }, user } = req;
    employmentService.getAll(user?.id, cvId)
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
    const { params: { cvId }, body, user } = req;

    employmentService.set(user?.id, cvId, body)
        .then(() => res.json({ message: 'Successfully added employment value' }))
        .catch(next);
}

function getById(req, res, next) {
    const { params: { id, cvId }, user } = req;
    employmentService.getById(user?.id, id, cvId)
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
    const { params: { id, cvId }, body, user } = req;
    employmentService.update(user?.id, id, cvId, body)
        .then(employment => res.json(employment))
        .catch(next);
}

function _delete(req, res, next) {
    const { params: { id, cvId }, user } = req;
    employmentService.delete(user?.id, id, cvId)
        .then(() => res.json({ message: 'Employment deleted successfully' }))
        .catch(next);
}
