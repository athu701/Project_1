const { types, required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    } ,
    favourites: [{ type: Schema.Types.ObjectId, ref: "Listing" }]
});

userSchema.plugin(passportLocalMongoose); //username and password, hashing, salting will be automatically implemented by mongoose in this plugin

module.exports = mongoose.model('User',userSchema);
