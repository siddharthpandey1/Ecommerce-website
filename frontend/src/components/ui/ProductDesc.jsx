import React from "react";
import { Input } from "./input";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const addToCart = async (productId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/cart/add`, { productId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success('Product added to cart')
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl sm:text-4xl text-gray-800">{product.productName}</h1>
            <p className="text-gray-800 text-sm sm:text-base">{product.category} | {product.brand}</p>
            <h2 className="text-pink-500 font-bold text-xl sm:text-2xl">₹{product.productPrice}</h2>
            <p className="line-clamp-12 text-muted-foreground text-sm sm:text-base">{product.productDesc}</p>
            <div className="flex gap-2 items-center w-full max-w-[300px]">
                <p className="text-gray-800 font-semibold">Quantity :</p>
                <Input type='number' className='w-14' defaultValue={1} />
            </div>
            <Button onClick={() => addToCart(product._id)} className='bg-pink-600 w-full sm:w-max hover:bg-pink-400 '>Add to Cart</Button>
        </div>
    )
}
export default ProductDesc;