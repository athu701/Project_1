const joi=require("joi");

module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image: joi.string().allow("").optional(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        title:joi.string().allow("",null),
        tag: joi.string().valid("Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic","None").optional()
    }).required(),
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required(),
});

