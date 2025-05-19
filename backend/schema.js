const Joi = require('joi')

module.exports.createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().allow(''),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('draft', 'published').default('draft')
});


module.exports.updateBlogSchema = Joi.object({
    _id: Joi.string().length(24).hex().required(),
    title: Joi.string().min(3).max(200),
    content: Joi.string().allow(''),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published')
}).min(2);


module.exports.createUser = Joi.object({
    username: Joi.string().min(6).max(10).required(),
    password: Joi.string().min(6).max(8).required()
})