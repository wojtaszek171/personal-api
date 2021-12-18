const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize')
const cvService = require('./cv.service');

// routes
router.get('/', getAll);
router.get('/owned', authorize(), getAllOwned);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);


module.exports = router;

function getAll(req, res, next) {
    cvService.getAll()
        .then(cvs => res.json(cvs))
        .catch(next);
}

function getAllOwned(req, res, next) {
    cvService.getAllOwned(req.user.id)
        .then(cvs => res.json(cvs))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        isPublished: Joi.boolean(),
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    cvService.set(req.body)
        .then(() => res.json({ message: 'Successfully added cv' }))
        .catch(next);
}

function getById(req, res, next) {
    cvService.getById(req.params.id)
        .then(cv => res.json(cv))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        cvId: Joi.number(),
        isPublished: Joi.boolean(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    cvService.update(req.params.id, req.body)
        .then(cv => res.json(cv))
        .catch(next);
}

function _delete(req, res, next) {
    cvService.delete(req.params.id)
        .then(() => res.json({ message: 'CV deleted successfully' }))
        .catch(next);
}
