const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const EmailScheme = new Schema({
    username: {type:String, required: true, min:25},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true}
})
const EmailModel = new model('Email',EmailScheme)

module.exports = EmailModel; 