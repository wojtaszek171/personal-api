const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const languageService = require('./language.service');
const translationModel = require('../../strings/translationModel');

// routes
router.get('/', getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    languageService.getAll()
        .then(languages => res.json(languages))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number(),
        name: translationModel,
        rating: Joi.number(),
        details: translationModel
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
        userId: Joi.number(),
        name: translationModel,
        rating: Joi.number(),
        details: translationModel
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    languageService.update(req.params.id, req.body)
        .then(language => res.json(language))
        .catch(next);
}

function _delete(req, res, next) {
    languageService.delete(req.params.id)
        .then(() => res.json({ message: 'Language deleted successfully' }))
        .catch(next);
}
