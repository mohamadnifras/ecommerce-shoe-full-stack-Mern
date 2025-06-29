const Product = require('../models/productModel');
const CustomError = require('../utils/customError')
const mongoose = require('mongoose');


exports.getProductsService = async ({ page, limit, name, category, id }) => {
    const skip = (page - 1) * limit

    let match = { isDeleted: false };

    //search name
    if (name) {
        match.name = { $regex: name, $options: 'i' };
    }

    if (category) {
        match.category = { $regex: category, $options: 'i' }
    }

    if (id) {
        match._id = new mongoose.Types.ObjectId(id)
    }

    const pipeline = [
        { $match: match },
        { $skip: skip },
        { $limit: limit },
    ];

    const products = await Product.aggregate(pipeline)


    if (id && products.length === 0) {
        throw new CustomError('Product not found or is deleted', 404);
    }

    const total = await Product.countDocuments({ isDeleted: false, ...match });
    const totalManProduct = await Product.countDocuments({ isDeleted: false, category: 'man' });
    console.log(totalManProduct,'totalManProduct')
    const totalWomenProduct = await Product.countDocuments({ isDeleted: false, category:'women' });
    const totalKidsProduct = await Product.countDocuments({ isDeleted: false, category:'kids' });
    return { products, total, totalManProduct, totalWomenProduct, totalKidsProduct};

};

//addProduct
exports.addProductService = async (productData) => {

    const existingProduct = await Product.findOne({ name: productData.name })
    if (existingProduct) {
        throw new CustomError('already Product exists', 400)
    }

    const product = await Product.create(productData);
    return product
}

//Admin deletedProduct
exports.deletedProductService = async (id) => {
    const productDeleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    if (!productDeleted) {
        throw new CustomError('Product Not found', 404)
    }
    return productDeleted
}

//Admin EditProduct
// exports.editProductService = async (id, updateData) => {

//     const productUpdate = await Product.findByIdAndUpdate(
//         { _id: id, isDeleted: false },
//         { $set: { ...updateData } },
//         { new: true }
//     )

//     if(!productUpdate){
//         throw new CustomError('Product not found', 404)
//     }

//     return productUpdate
// }

exports.editProductService = async (id, updateData) => {
  const productUpdate = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: updateData },
    { new: true }
  );

  if (!productUpdate) {
    throw new CustomError("Product not found", 404);
  }

  return productUpdate;
};
