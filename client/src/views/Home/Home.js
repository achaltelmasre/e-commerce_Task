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
                loadProducts(); // Changed from loadProduct() to loadProducts()
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
    }, [search]); // Added search as a dependency to trigger searchProducts when search state changes

    const loadProducts = async () => { // Renamed loadProduct to loadProducts for consistency
        try {
            const response = await axios.get('/api/products');
            setProducts(response?.data?.data);
        } catch (error) {
            console.error('Error loading products:', error);
            alert("Error loading products");
        }
    };

    useEffect(() => {
        loadProducts();
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
                        products?.map((product, index) => { // Changed variable name from products to product
                            const { _id, name, description, price, image } = product; // Changed from products to product
                            return (
                                <ProductCard
                                    key={_id} // Used _id as the key
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
