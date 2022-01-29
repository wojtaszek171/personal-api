const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('src/_middleware/validate-request');
const authorize = require('src/_middleware/authorize');
const listService = require('./list.service');

// routes
router.get('/', authorize(), getAllOwned);
router.post('/set', authorize(), setSchema, set);
router.get('/:id', getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);


module.exports = router;

function getAllOwned(req, res, next) {
    listService.getAllOwned(req.user?.id)
        .then(lists => res.json(lists))
        .catch(next);
}

function setSchema(req, res, next) {
    const schema = Joi.object({
        items: Joi.array().items({
            title: Joi.string(),
            order: Joi.number().required(),
            styles: Joi.object(),
            checked: Joi.bool()
        }),
    });
    validateRequest(req, next, schema);
}

function set(req, res, next) {
    listService.set({
        userId: req.user?.id,
        ...req.body
    })
        .then(() => res.json({ message: 'Successfully added list' }))
        .catch(next);
}

function getById(req, res, next) {
    listService.getById(req.params.id)
        .then(list => res.json(list))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema =  Joi.object({
        userId: Joi.string(),
        items: Joi.array().items({
            title: Joi.string(),
            order: Joi.number().required(),
            styles: Joi.object(),
            checked: Joi.bool()
        }),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    listService.update(req.params.id, req.body)
        .then(list => res.json(list))
        .catch(next);
}

function _delete(req, res, next) {
    listService.delete(req.params.id)
        .then(() => res.json({ message: 'List deleted successfully' }))
        .catch(next);
}
