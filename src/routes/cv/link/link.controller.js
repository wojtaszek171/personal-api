const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const linkService = require('./link.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        url: Joi.string()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    linkService.set(req.body)
        .then(() => res.json({ message: 'Successfully added link value' }))
        .catch(next);
}

function getById(req, res, next) {
    linkService.getById(req.params.id)
        .then(link => res.json(link))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        url: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    linkService.update(req.params.id, req.body)
        .then(link => res.json(link))
        .catch(next);
}
