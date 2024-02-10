import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const searchProducts = async () => {
        try {
            if (search === '') {
                loadProduct();
                return;
            }

            const response = await axios.get(`/api/products/search?q=${search}`);
            setProducts(response?.data?.data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    }

    useEffect(() => {
        searchProducts();
    }, [search]);

    const loadProduct = async () => {
        try {
           const response = await axios.get('/api/products')
            setProducts(response?.data?.data);
        } catch (error) {
            console.error('Error loading products:', error);
            alert("Error loading products");
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    return (
        <>
            <div>
                <Navbar />
                <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="product-container">
                    {
                        products?.map((product, index) => {
                            const { _id, name, description, price, image } = product;
                            return (
                                <ProductCard
                                    key={index}
                                    name={name}
                                    description={description}
                                    price={price}
                                    image={image}
                                    id={_id}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Home;
