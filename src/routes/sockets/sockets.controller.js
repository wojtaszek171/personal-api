const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const socketService = require('./socket.service');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/', getAll);
router.get('/:key', getByKey);
router.delete('/:key', authorize(), _delete);

module.exports = router;

function setSchema(req, res, next) {
    const schema = Joi.object({
        key: Joi.string(),
        enabled: Joi.bool(),
        start: Joi.string().allow(''),
        stop: Joi.string().allow(''),
        lightModes: Joi.string().allow(''),
        dateUpdated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    socketService.set(req.body)
        .then(() => res.json({ message: 'Successfully added socket value' }))
        .catch(next);
}

function getAll(req, res, next) {
    socketService.getAll()
        .then(sockets => res.json(sockets))
        .catch(next);
}

function getByKey(req, res, next) {
    socketService.getByKey(req.params.key)
        .then(socket => res.json(socket))
        .catch(next);
}

function _delete(req, res, next) {
    socketService.delete(req.params.key)
        .then(() => res.json({ message: 'Socket deleted successfully' }))
        .catch(next);
}