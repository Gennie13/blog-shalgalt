const { query } = require("express");
const UserModel = require("../models/userModel");
const CategoryModel = require("../models/categoryModel");
const BlogModel = require("../models/blockModel");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const crypto = require("crypto");

exports.createRegisterUser = asyncHandler(async(req, res, next) => {
    const user = await UserModel.create(req.body);
    if(!user){
        throw new MyError(`"aldaa user -> ${error}"`, 400)
    }
    const jwt = user.getJsonWebToken();

    res.status(200).json({
        success: true,
        // token: jwt,
        data: user
    })
});
exports.getUser = asyncHandler ( async ( req, res, next ) => {
    const user = await UserModel.findById(req.params.id);
    if(!user){
        throw new MyError(req.params.id + " - shalgaj uzne uu ", 400)
    }
    res.status(200).json({
        success: true,
        data: user
    })
});
exports.updateUser = asyncHandler(async(req, res, next) => {
    const user = await UserModel.findById(req.params.id);
    if(!user) {
        throw new MyError( req.params.id + "- shalgaj uzne uu ", 400)
    };
    for(let att in req.body){
        user[att] = req.body[att]
    };
    user.save();
    res.status(200).json({
        success: true,
        data: user
    })
});
exports.deleteUser = asyncHandler(async(req, res, next) => {
    if(!req.params.id) {
        throw new MyError( req.params.id + " - shalgaj uzne uu ", 400)
    };
    const user = await UserModel.findById(req.params.id).deleteOne();

    res.status(200).json({
        success: true,
        data: user
    })
})