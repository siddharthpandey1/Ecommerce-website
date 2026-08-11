import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { Skeleton } from "./skeleton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product, loading }) => {
    const { productImg, productPrice, productName } = product
    const accessToken = localStorage.getItem('accessToken')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addToCard = async (productId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/cart/add`, { productId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success('Product added to Cart')

                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error.response.data);

        }
    }
    return (
        <div className="shadow-lg rounded-lg overflow-hidden h-max">
            <div className="w-full h-full aspect-square overflow-hidden">
                {
                    loading ? <Skeleton className='w-full h-full rounded-lg' /> : <img
                        onClick={() => navigate(`/products/${product._id}`)}
                        src={product?.productImg?.[0]?.url || "/siddharthaphoto3.jpg"} alt=""
                        className="w-full h-full transition-transform duration-300
                hover:scale-105 cursor-pointer" />
                }

            </div>
            {
                loading ? <div className="px-2 space-y-2 my-2">
                    <Skeleton className='w-[70%] h-4' />
                    <Skeleton className='w-[40%] h-4' />
                    <Skeleton className='w-full h-8' />
                </div> : <div className="px-2 py-2 space-y-1">
                    <h1 className="font-semibold text-sm sm:text-base h-10 sm:h-12 line-clamp-2">{productName}</h1>
                    <h2 className="font-bold text-sm sm:text-base">₹{productPrice}</h2>
                    <Button
                        onClick={() => addToCard(product._id)}
                        className="bg-pink-600 mb-3 w-full text-xs sm:text-sm px-2 py-1 sm:py-2 h-auto"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="hidden xs:inline sm:inline">Add to Cart</span>
                        <span className="inline xs:hidden sm:hidden">Add</span>
                    </Button>
                </div>
            }

        </div>
    )
}
export default ProductCard