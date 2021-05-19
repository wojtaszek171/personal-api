const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        address: Joi.string(),
        phone: Joi.string(),
        email: Joi.string(),
        position: Joi.string(),
        presentation: Joi.string(),
        photo: Joi.string()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    userService.set(req.body)
        .then(() => res.json({ message: 'Successfully added user value' }))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        address: Joi.string(),
        phone: Joi.string(),
        email: Joi.string(),
        position: Joi.string(),
        presentation: Joi.string(),
        photo: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}
