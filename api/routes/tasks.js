const express = require('express');
const router = express.Router();

const controller = require('../controllers/tasks');

router.get('/', async (req, res, next) => {

    let items;

    try {
        items = await controller.read();
        res.json({ items });
    } catch (error) {
        next(error);
    }

});

router.get('/:uuid', async (req, res, next) => {

    let item;

    try {
        item = await controller.read(req.params.uuid);

        if (item === undefined) {
            next();//404
        } else {
            res.json({ item });
        }
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {

    let item;

    try {
        item = await controller.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        error.status = 400;
        next(error);
    }

});

router.put('/:uuid', async (req, res, next) => {

    let item;

    try {
        item = await controller.read(req.params.uuid);
        if (item === undefined) {
            next(404);
        }
    } catch (error) {
        next(error);
    }

    try {
        await controller.update(req.params.uuid, req.body);
        res.status(200).json();
    } catch (error) {
        error.status = 400;
        next(error);
    }

});

router.patch('/:uuid', async (req, res, next) => {

    let item;

    try {
        item = await controller.read(req.params.uuid);
        if (item === undefined) {
            next(404);
        }
    } catch (error) {
        next(error);
    }

    try {
        await controller.update(req.params.uuid, req.body);
        res.status(200).json();
    } catch (error) {
        error.status = 400;
        next(error);
    }

});

router.delete('/:uuid', async (req, res, next) => {

    let item;

    try {
        item = await controller.read(req.params.uuid);
        if (item === undefined) {
            next(404);
        }
    } catch (error) {
        next(error);
    }

    try {
        await controller.remove(req.params.uuid);
        res.status(200).json();
    } catch (error) {
        error.status = 400;
        next(error);
    }

});


module.exports = router;
