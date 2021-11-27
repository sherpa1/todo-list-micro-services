const Joi = require('joi')
    .extend(require('@joi/date'));


const schema = Joi.object({
    uuid: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }).required(),
    status: Joi.number().min(0).max(1).default(0).required(),
    content: Joi.string().min(6).max(512).required(),
    created_at: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required()
});

module.exports = schema;