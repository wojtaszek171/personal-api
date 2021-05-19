const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const skillService = require('./skill.service');
const translationModel = require('../../strings/translationModel');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number(),
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
        user_id: Joi.number(),
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
