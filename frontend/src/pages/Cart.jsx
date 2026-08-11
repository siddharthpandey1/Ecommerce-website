import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.png"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";

const Cart = () => {
    const { cart } = useSelector(store => store.product)

    const subtotal = cart?.totalPrice
    const shipping = subtotal > 299 ? 0 : 49;
    const tax = subtotal * 0.05 //5%
    const total = subtotal + shipping + tax
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const API = "http://localhost:8000/api/v1/cart"
    const accessToken = localStorage.getItem("accessToken")


    const loadCart = async () => {
        try {
            const res = await axios.get(API, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleUpdateQuantity = async (productId, type) => {
        try {
            const res = await axios.put(`${API}/update`, { productId, type }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleRemove = async (productId) => {
        try {
            const res = await axios.delete(`${API}/remove`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`

                },
                data: { productId }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
                toast.success('Product removed from cart!')
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        loadCart()
    }, [dispatch])

    return (
        <div className="pt-24 md:pt-32 pb-10 px-4 bg-gray-50 min-h-screen">
            {
                cart?.items?.length > 0 ?
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-7">Shopping Cart</h1>
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-7">
                            <div className="flex flex-col gap-5 flex-1 min-w-0">
                                {cart?.items?.map((product, index) => {
                                    return <Card className="p-4 sm:p-5" key={index}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                                <img src={product?.productId?.productImg?.[0]?.url || userLogo} alt="" className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-lg object-cover border p-1 " />
                                                <div className="min-w-0 flex-1">
                                                    <h1 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 truncate">{product?.productId?.productName}</h1>
                                                    <p className="text-pink-600 font-bold text-sm sm:text-base">₹{product?.productId?.productPrice}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between sm:flex-col sm:items-end gap-3 sm:gap-2">
                                                <div className="flex gap-2 sm:gap-3 items-center">
                                                    <Button onClick={() => handleUpdateQuantity(product.productId._id, 'decrease')} variant="outline" size="sm">-</Button>
                                                    <span className="font-bold text-base sm:text-lg">{product.quantity}</span>
                                                    <Button onClick={() => handleUpdateQuantity(product.productId._id, 'increase')} variant="outline" size="sm">+</Button>
                                                </div>
                                                <p className="text-pink-500 font-bold text-sm sm:text-base">₹{(product?.productId?.productPrice) * (product?.quantity)}</p>
                                            </div>

                                            <p onClick={() => handleRemove(product?.productId?._id)} className="flex text-red-500 items-center gap-1 cursor-pointer text-sm shrink-0"><Trash2 className="w-4 h-4" />
                                                Remove</p>
                                        </div>
                                    </Card>
                                })}
                            </div>
                            <div className="w-full lg:w-[400px] shrink-0">
                                <Card className='w-full'>
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className="flex justify-between">
                                            <span>SubTotle ({cart?.items?.length} items)</span>
                                            <span>₹{cart?.totalPrice?.toLocaleString('en-IN')} </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shopping</span>
                                            <span>₹{shipping}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax(5%)</span>
                                            <span>₹{tax}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>₹{total}</span>
                                        </div>
                                        <div className="space-y-3 pt-4">
                                            <div className="flex space-x-2">
                                                <Input placeholder="Promo Code" />
                                                <Button variant="outline">Apply</Button>
                                            </div>
                                            <Button onClick={() => navigate('/address')} className='w-full bg-pink-600'>PLACE ORDER</Button>
                                            <Button variant="outline" className='w-full bg-transparent'>
                                                <Link to='/products'>Countinue Shopping</Link>
                                            </Button>
                                        </div>
                                        <div className="text-sm text-muted-foreground pt-4">
                                            <p>* Free shipping on order over ₹299</p>
                                            <p>* 30-days return policy</p>
                                            <p>* Secure checkout with SSL encryption</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div> : <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
                        <div className="bg-pink-100 p-6 rounded-full">
                            <ShoppingCart className="w-16 h-16 text-pink-600" />
                        </div>
                        <h2 className="mt-6 text-xl sm:text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
                        <p className="mt-2 text-gray-600 text-sm sm:text-base">Looks like you haven't added anything to your cart yet</p>
                        <Button onClick={() => navigate('/products')} className='mt-6 cursor-pointer bg-pink-600 text-white py-3 px-6 hover:bg-pink-700'>Start Shopping</Button>

                    </div>
            }
        </div>
    )
}
export default Cart