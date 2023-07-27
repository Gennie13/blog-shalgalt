const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const CategoryModel = require("./categoryModel");


const BlogShema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Блог оруулна уу?"],
        maxlength: [1000, "Блог хамгийн уртдаа 1000 байна"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        //holboootoi document
        ref: 'Category',
        required : true
    },
    createUser: {
        type: mongoose.Schema.Types.ObjectId,
        //holboootoi document
        ref: 'User'
    },
    updateUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    deleteUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
},{
    toJSON: {virtuals: true}, toObject:{virtuals: true}
});



module.exports = mongoose.model("Blog", BlogShema);
