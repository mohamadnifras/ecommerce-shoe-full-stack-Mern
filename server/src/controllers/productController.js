const asyncHandler = require('../middlewares/asyncHandler')
const { getProductsService, addProductService, deletedProductService, editProductService } = require('../services/productService')


exports.getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10, name, category } = req.query;

    const { products, total, totalManProduct, totalWomenProduct, totalKidsProduct } = await getProductsService({ page: parseInt(page), limit: parseInt(limit), name, category, id })
    
   
    return res.status(200).json({
        success: true,
        count: products.length,
        total,
        page: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalManProduct,
        totalWomenProduct,
        totalKidsProduct,
        products,
    })

});

//Admin addProduct
exports.addProduct = asyncHandler(async (req, res) => {
    const productData = req.body

    if (!req.files || !req.files.image || !req.files.individualImages) {
        return res.status(400).json({
          success: false,
          message: 'Both image and individualImages are required.'
        });
      }
    
      productData.image = req.files.image.map(file => file.path);
      productData.individualImages = req.files.individualImages.map(file => file.path);

      if (typeof productData.size === 'string') {
        productData.size = productData.size.split(',').map(s => Number(s.trim()));
      }
    
      
      if (Array.isArray(productData.size)) {
        productData.size = productData.size.map(Number);
      }
    
    const product = await addProductService(productData);



    res.status(201).json({
        success: true,
        message: 'Products add successfully',
        product,
    })
})

//Deleted product
exports.deletedProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deletedProductService(id);

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
});

//EditProduct 
// exports.editProduct = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body

//     if (req.file) {
//         updateData.image = req.file.path
//     }
//     const productUpdate = await editProductService(id, updateData);

//     res.status(200).json({
//         message: "Product Update successfully",
//         productUpdate
//     })
// })

exports.editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  console.log(updateData,'editProduct')

   if (updateData.size) {
    updateData.size = updateData.size
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n)); 
  }

  // Handle uploaded files
  if (req.files?.image) {
    updateData.image = req.files.image.map(file => file.path) 
  }

  if (req.files?.individualImages) {
    updateData.individualImages = req.files.individualImages.map(file => file.path); 
  }

  const productUpdate = await editProductService(id, updateData);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: productUpdate,
  });
});

