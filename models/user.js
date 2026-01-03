const { required } = require("joi");
//install this npm install passport-local-mongoose@7.1.2
const  mongoose = require("mongoose");    //“Hey Node.js, I want to use the Mongoose tools in this file.”
const Schema=mongoose.Schema; 
const passportLocalMongoose = require("passport-local-mongoose");
 

const userSchema =new Schema({
    email:{
    type:String,
    required:true,
},

});

//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

//API Documentation
//Instance methods
// authenticate() Generates a function that is used in Passport's LocalStrategy
//When plugging in Passport-Local Mongoose plugin, additional options can be provided to configure the hashing algorithm.