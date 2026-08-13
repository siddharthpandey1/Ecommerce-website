import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import ProductCard from "@/components/ui/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/getallproducts`)
                if (res.data.success) {
                    setProducts(res.data.products.slice(0, 10))
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [])

    return (
        <div>
            <Hero />
            <Features />
            

            <section className="bg-pink-200 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Products</h2>
                        <Link to="/products">
                            <Button variant="outline" className="flex items-center gap-1 bg-white">
                                View All <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-7">
                        {
                            loading
                                ? Array.from({ length: 10 }).map((_, i) => (
                                    <ProductCard key={i} product={{}} loading={true} />
                                ))
                                : products.map((product) => (
                                    <ProductCard key={product._id} product={product} loading={false} />
                                ))
                        }
                    </div>

                    {
                        !loading && products.length === 0 && (
                            <p className="text-center text-gray-500 py-10">No products available right now.</p>
                        )
                    }
                </div>
            </section>
        </div>
    )
}
export default Home;