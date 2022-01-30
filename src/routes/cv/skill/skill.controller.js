const express = require('express');
const router = express.Router({mergeParams: true});
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const skillService = require('./skill.service');
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
    skillService.getAll(user?.id, cvId)
        .then(skills => res.json(skills))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
        name: translationModel,
        rating: Joi.number(),
        details: translationModel
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    const { params: { cvId }, body, user } = req;

    skillService.set(user?.id, cvId, body)
        .then(() => res.json({ message: 'Successfully added skill value' }))
        .catch(next);
}

function getById(req, res, next) {
    const { params: { id, cvId }, user } = req;
    skillService.getById(user?.id, id, cvId)
        .then(skill => res.json(skill))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
        name: translationModel,
        rating: Joi.number(),
        details: translationModel
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    const { params: { id, cvId }, body, user } = req;
    skillService.update(user?.id, id, cvId, body)
        .then(skill => res.json(skill))
        .catch(next);
}

function _delete(req, res, next) {
    const { params: { id, cvId }, user } = req;
    skillService.delete(user?.id, id, cvId)
        .then(() => res.json({ message: 'Skill deleted successfully' }))
        .catch(next);
}
