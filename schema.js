const Joi = require('joi');

//have to write schema for which schema we need to validate


      //schema name  //to validate schema below joi.object
// const listingSchema =Joi.object({               this is schema
//     //object name
//     listing : Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         location:Joi.string().required(),
//         country:Joi.string().required(),
//         price:Joi.number().required().min(0),
//         image:Joi.string().allow("",null)
//     }).required()
// })

//we will export the schema

module.exports.listingSchema =Joi.object({
    //object name
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null)
    }).required()
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});
