const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const skillService = require('./skill.service');
const translationModel = require('../../strings/translationModel');

// routes
router.get('/', getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    skillService.getAll()
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
    skillService.set(req.body)
        .then(() => res.json({ message: 'Successfully added skill value' }))
        .catch(next);
}

function getById(req, res, next) {
    skillService.getById(req.params.id)
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
    skillService.update(req.params.id, req.body)
        .then(skill => res.json(skill))
        .catch(next);
}

function _delete(req, res, next) {
    skillService.delete(req.params.id)
        .then(() => res.json({ message: 'Skill deleted successfully' }))
        .catch(next);
}
