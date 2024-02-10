import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { getApiHealth } from './controllers/health.js';
import { postApiLogin, postApiSignup } from './controllers/user.js';
import { getApiProductId, getApiProductSearchquery, getApiProducts, postApiProduct, putApiProductId } from './controllers/product.js';
import {  postApiOrder, getApiOrder, getApiOrderId, getApiOrderUserId, patchApiOrderId } from './controllers/order.js';

const app = express();
app.use(express.json());

const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log('MongoDB connected');
    }
};
connectDB();

app.get('/api/health', getApiHealth);

//post signup
app.post('/api/signup', postApiSignup);

//post login
app.post('/api/login', postApiLogin );

//post product
app.post('/api/product', postApiProduct);

//get products
app.get('/api/products', getApiProducts);

//put products:id
app.put('/api/product/:id', putApiProductId);

//get product:id
app.get('/api/product/:id', getApiProductId );

//get product searchQuery
app.get('/api/products/search', getApiProductSearchquery);



//post order
app.post('/api/order', postApiOrder);

//get order
app.get('/api/orders', getApiOrder);

//get order:id
app.get('/api/order/:id', getApiOrderId);

//get order/user:id
app.get('/api/order/user/:id', getApiOrderUserId);

//patch order:id
app.patch('/api/order/:id', patchApiOrderId);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
