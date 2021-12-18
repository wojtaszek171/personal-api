const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize')
const userService = require('./user.service');
const translationModel = require('../../strings/translationModel');

// routes
router.get('/', getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);


module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
        name: Joi.string(),
        address: translationModel,
        phone: Joi.string(),
        email: Joi.string(),
        position: translationModel,
        presentation: translationModel,
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
        cvId: Joi.number(),
        name: Joi.string(),
        address: translationModel,
        phone: Joi.string(),
        email: Joi.string(),
        position: translationModel,
        presentation: translationModel,
        photo: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}
