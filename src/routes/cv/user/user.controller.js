const express = require('express');
const router = express.Router({mergeParams: true});
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const userService = require('./user.service');
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
    userService.getAll(user?.id, cvId)
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
    const { params: { cvId }, body, user } = req;

    userService.set(user?.id, cvId, body)
        .then(() => res.json({ message: 'Successfully added user value' }))
        .catch(next);
}

function getById(req, res, next) {
    const { params: { id, cvId }, user } = req;
    userService.getById(user?.id, id, cvId)
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
    const { params: { id, cvId }, body, user } = req;
    userService.update(user?.id, id, cvId, body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    const { params: { id, cvId }, user } = req;
    userService.delete(user?.id, id, cvId)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}
