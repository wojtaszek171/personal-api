const express = require('express');
const router = express.Router();
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const stringsService = require('./strings.service');
const translationModel = require('./translationModel');

// routes
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function setSchema(req, res, next) {
    const schema = translationModel;
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    stringsService.set(req.body)
        .then(() => res.json({ message: 'Successfully added strings value' }))
        .catch(next);
}

function getById(req, res, next) {
    stringsService.getById(req.params.id)
        .then(strings => res.json(strings))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = translationModel;
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    stringsService.update(req.params.id, req.body)
        .then(strings => res.json(strings))
        .catch(next);
}
