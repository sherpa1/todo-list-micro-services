const { v4: uuid } = require('uuid');

const schema = require('../models/task');

const Knex = require('../knex');

const TABLE = 'tasks';

const saltRounds = 10;

async function create(data) {
    const item = {
        uuid: uuid(),
        content: data.content.trim(),
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: 0
    };

    try {
        await schema.validateAsync(item);
    } catch (error) {
        throw error;
    }

    try {
        await Knex(TABLE).insert(item);
        return item;
    } catch (error) {
        throw error.code;
    }

}

async function read(uuid) {


    try {

        if (uuid === undefined) {//read all
            const items = await Knex(TABLE).select('*').orderBy('created_at', 'desc');
            return items;
        } else {//read one
            const item = await Knex(TABLE).select('*').where('uuid', uuid).first();
            return item;
        }

    } catch (error) {
        throw error;
    }
}

async function update(uuid, data) {

    let item;

    try {
        item = await read(uuid);
        item.status = data.status ?? item.status;
        item.content = data.content ?? item.content;
    } catch (error) {
        throw error;
    }

    try {
        await schema.validateAsync(item);
    } catch (error) {
        throw error;
    }

    try {
        await Knex(TABLE).update(item).where('uuid', uuid);
    } catch (error) {
        throw error;
    }

}

async function patch(uuid, data) {

    let item;

    try {
        item = await read(uuid);
    } catch (error) {
        const err = new Error();
        err.status = 404;
        throw err;
    }

    if (!item) {
        throw new Error();
    } else {
        item.firstname = data.firstname ?? item.firstname;
        item.lastname = data.lastname ?? item.lastname;
        item.email = data.email ?? item.email;
        item.gender = data.gender ?? item.gender;
        item.role = data.role ?? item.role;
    }

    try {
        await update(uuid, item);
    } catch (error) {

    }
}


async function remove(uuid) {

    let item;

    try {
        item = await read(uuid);
    } catch (error) {
        const err = new Error();
        err.status = 404;
        throw err;
    }

    try {
        const result = await Knex(TABLE).where('uuid', uuid).del();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { create, read, update, patch, remove };