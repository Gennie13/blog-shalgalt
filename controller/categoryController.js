
const { query } = require("express");
const mongoose = require("mongoose");
const CategoryModel = require("../models/categoryModel");
const BlogModel = require("../models/blockModel");
//aldaa tsatsah system-msj, code -
const MyError = require("../utils/myError")
const asyncHandler = require("../middleware/asyncHandler")


exports.createCategory = asyncHandler(async (req, res, next) => {
    const category = await CategoryModel.create(req.body);
    if (!category) {
        throw new MyError(req.body.category + " шалгаж үзнэ үү? ", 400)
    }
    req.body.createUser = req.userId;
    res.status(200).json({
        success: true,
        data: category,
    })
});
// 64c095d3af16f3c52060cb76
exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await CategoryModel.find(req.query);
    res.status(200).json({
        success: true,
        data: categories,
    })
});
exports.getCategory = asyncHandler ( async ( req, res, next ) => {
    const category = await CategoryModel.findById(req.params.id)
    if(!category){
        throw new MyError(req.params.id + " - categoriig shalgana uu? ", 400)
    }
    category.save()
    res.status(200).json({
        success: true,
        data: category
    })
})
exports.updateCategory = asyncHandler(async(req, res, next) => {
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if(!category) {
        throw new MyError( req.params.id + " - categoriig shalgana uu? ", 400)
    };
    res.status(200).json({
        success: true,
        data: category,
    })
})
exports.deleteCategory = asyncHandler(async(req, res, next) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: category
    })
})
