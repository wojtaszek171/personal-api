const express = require('express');
const router = express.Router({mergeParams: true}); // child of CV
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const educationService = require('./education.service');
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
    educationService.getAll(user?.id, cvId)
        .then(education => res.json(education))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
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
    const { params: { cvId }, body, user } = req;

    educationService.set(user?.id, cvId, body)
        .then(() => res.json({ message: 'Successfully added education value' }))
        .catch(next);
}

function getById(req, res, next) {
    const { params: { id, cvId }, user } = req;
    educationService.getById(user?.id, id, cvId)
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
    const { params: { id, cvId }, body, user } = req;
    educationService.update(user?.id, id, cvId, body)
        .then(education => res.json(education))
        .catch(next);
}

function _delete(req, res, next) {
    const { params: { id, cvId }, user } = req;
    educationService.delete(user?.id, id, cvId)
        .then(() => res.json({ message: 'Education deleted successfully' }))
        .catch(next);
}
