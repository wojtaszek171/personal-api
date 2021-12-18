const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize')
const weatherService = require('./weather.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/', getAll);
router.get('/:name', getByName);
router.delete('/:name', authorize(), _delete);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        value: Joi.object().required(),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    weatherService.set(req.body)
        .then(() => res.json({ message: 'Successfully added weather value' }))
        .catch(next);
}

function getAll(req, res, next) {
    weatherService.getAll()
        .then(weather => res.json(weather))
        .catch(next);
}

function getByName(req, res, next) {
    weatherService.getByName(req.params.name)
        .then(weather => res.json(weather))
        .catch(next);
}

function _delete(req, res, next) {
    weatherService.delete(req.params.name)
        .then(() => res.json({ message: 'Weather deleted successfully' }))
        .catch(next);
}
