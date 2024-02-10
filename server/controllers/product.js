import Product from "../models/Product.js";
import { responder } from "../util.js";

//get product
const getApiProducts = async (req, res) => {
    const Products = await Product.find();
 
    return responder({
     res,
     success:true,
     data: Products,
     message: "Products fetched successfully"
    });
 }

 //post product
 const postApiProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        image,
        category,
        brand,
    } = req.body;

    const product = new Product({
        name:name,
        description: description,
        price: price,
        image: image,
        category: category,
        brand: brand,
    });

    try{
        const savedProduct = await product.save();

        res.json({
            success: true,
            data: savedProduct,
            message: "Product created successfully"
        });
    }
    catch(e)
    {
       res.json({
        success: false,
        message: e.message
       });
    }
}

//get product:id
const getApiProductId = async (req, res) => {
    const {id} = req.params;
 
    const product = await Product.findById(id);
 
    res.json({
     success: true,
     data: product,
     message: "Product fetched successfully"
    });
 }

 //put product:id
 const putApiProductId =  async (req, res) => {
  const {id} = req.params;

  const { name, description, price, image, category, brand, } = req.body;

    await Product.updateOne({_id: id}, {$set : {
     name: name,
     description: description,
     price: price,
     image: image,
     category: category,
     brand: brand,
  }});

  const updatedProduct = await Product.findById(id);

   res.json({
    success: true,
    data: updatedProduct,
    message: "Product update successfully"
   }); 
}
 
 
  //get product search?query
  const getApiProductSearchquery = async (req, res) => {
    const {q} = req.query;

    const products = await Product.find({name: {$regex: q, $options: "i"}});

    res.json({
        success: true,
        data: products,
        message: "Product fetched successfully"
    });
}

//


 export {getApiProducts, postApiProduct , getApiProductId, putApiProductId, getApiProductSearchquery} ;
