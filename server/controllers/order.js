import Order from "../models/order.js";
import { responder } from "../util.js";

// //post order
const postApiOrder =   async (req, res) => {
    const {
        user,
        product,
        quantity,
        shippingAddress,
        deliveryCharges
    } = req.body;

    const order = new Order({
        user: user ,
        product: product,
        quantity: quantity,
        shippingAddress: shippingAddress,
        deliveryCharges: deliveryCharges
    });

   try{
        const savedOrder = await order.save();

        return responder({
            res,
            success: true,
            data: savedOrder,
            message: "Order created successfully"
        });
    }
    catch(e){
        return responder({
            res,
            success: false,
            message: e.message
        });
    }
}

// //get orders 
const getApiOrder =  async(req, res) => {
    const orders = await Order.find();
  
    return responder({
      res,
      success: true,
      data:orders,
      message: "Orders fetched successfully"
    });
}

// // get order:id
const getApiOrderId = async(req, res) =>{
    const {id} = req.params;

    const orders = await Order.find({user: id}).populate('product user');
    
    return responder({
        res,
        success: true,
        data: orders,
        message: "Order fetched successfully"
    });
}

// //get order/user/:id
const getApiOrderUserId =  async(req, res) =>{
    const {id} = req.params;

    const orders = await Order.find({user: id}).populate('product user');
    
    return responder({
        res,
        success: true,
        data: orders,
        message: "Order fetched successfully"
    });
}

// //patch/order/status/:id
const patchApiOrderId = async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
   
    const STATUS_PRIORITY_MAP = {
      pending:0,
      shipped:1,
      delivered:2,
      returned:3,
      cancelled:4,
      rejected:5
    }
   
    const order = await Order.findById(id);
    const currentStatus = order.status;
   
    const currentPriority = STATUS_PRIORITY_MAP [currentStatus];
    const newPriority = STATUS_PRIORITY_MAP [status];
   
    if(currentPriority > newPriority) {
       
       return responder({
           res,
           success: false,
           message: `${status} cannot be set once order is ${currentStatus}`
       });
    }
   
    await Order.updateOne({_id: id}, {$set: {status: status}});
   
   
   
    await Order.updateOne ({_id: id},
       {$set: {status:status}});
   
       const updatedProduct = await Order.findOne({_id: id})
   
       res.json({
           success: true,
           data: updatedProduct,
           message:" Order status updated successfully"
       });
       
 }

export {postApiOrder, getApiOrder, getApiOrderId, getApiOrderUserId , patchApiOrderId }