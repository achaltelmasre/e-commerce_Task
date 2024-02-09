import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { getApiHealth } from './controllers/health.js';
import { postApiLogin, postApiSignup } from './controllers/user.js';
import { getApiProductId, getApiProductSearchquery, getApiProducts, postApiProduct } from './controllers/product.js';

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
app.put('/api/products', putApiProductId);

//get productUser:id
app.get('/api/products/id', getApiProductId );

//get product searchQuery
app.get('/api/productsearchquery/id', getApiProductSearchquery);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
