import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Productimg from "@/components/ui/Productimg";
import Breadcrums from "@/components/ui/Breadcrums";
import ProductDesc from "@/components/ui/ProductDesc";
import axios from "axios";

const SingleProduct = () => {
    const params = useParams()
    const productId = params.id
    const { products } = useSelector(store => store.product)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const existing = products.find((item) => item._id === productId)
        if (existing) {
            setProduct(existing)
            setLoading(false)
        } else {
            // fallback: agar Redux me nahi mila (page refresh case), to API se fetch karo
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/${productId}`)
                    if (res.data.success) {
                        setProduct(res.data.product)
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                }
            }
            fetchProduct()
        }
    }, [productId, products])

    if (loading) {
        return <div className="pt-24 text-center">Loading...</div>
    }

    if (!product) {
        return <div className="pt-24 text-center text-gray-600">Product not found.</div>
    }

    return (
        <div className='pt-20 py-10 px-4 max-w-7xl mx-auto'>
            <Breadcrums product={product} />
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                <Productimg images={product.productImg} />
                <ProductDesc product={product} />
            </div>
        </div>
    )
}
export default SingleProduct