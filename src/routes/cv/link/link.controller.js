const express = require('express');
const router = express.Router({mergeParams: true});
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const linkService = require('./link.service');

// routes
router.get('/', authorize(true), getAll);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', authorize(true), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    const { params: { cvId }, user } = req;

    linkService.getAll(user?.id, cvId)
        .then(links => res.json(links))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
        name: Joi.string(),
        url: Joi.string()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    const { params: { cvId }, body, user } = req;

    linkService.set(user?.id, cvId, body)
        .then(() => res.json({ message: 'Successfully added link value' }))
        .catch(next);
}

function getById(req, res, next) {
    const { params: { id, cvId }, user } = req;

    linkService.getById(user?.id, id, cvId)
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
    const { params: { id, cvId }, body, user } = req;
    linkService.update(user?.id, id, cvId, body)
        .then(link => res.json(link))
        .catch(next);
}

function _delete(req, res, next) {
    const { params: { id, cvId }, user } = req;
    linkService.delete(user?.id, id, cvId)
        .then(() => res.json({ message: 'Link deleted successfully' }))
        .catch(next);
}
