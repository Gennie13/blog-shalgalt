const mongoose = require("mongoose");
const BlogModel = require("./blockModel");


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Зарын категорийн нэрийг заавал оруулна уу?"],
        maxlength: [50, "Категорийн нэрийн урт 50-аас ихгүй байна!"],
        unique: true,
        trim: true
    },
    uploadPhoto: {
        type: String,
        default: "no-photo.jpg"
    },
    averagePrice: Number,
    watchCount: {
        type: Number,
        default: 0,
    },

},
{toJSON:{virtuals:true}, toObject:{virtuals: true}}
);


// CategorySchema.virtual("blogs",{
//     ref: "Blog",
//     //category derh dotood tulhuur
//     localField: "_id", //categoriin id
//     foreignField: "category", //Zaruud model deerh talbarin ner
//     justOne:  false
// });
module.exports = mongoose.model("Category", CategorySchema);