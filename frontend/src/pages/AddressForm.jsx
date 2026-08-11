import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { addAddress, deleteAddress, setCart, setSelectedAddress } from "@/redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddressForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    })
    const { cart, addresses, selectedAddress } = useSelector((store) => store.product)
    const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        dispatch(addAddress(formData))
        setShowForm(false)
    }

    const subtotal = cart.totalPrice
    const shipping = subtotal > 50 ? 0 : 19;
    const tax = parseFloat((subtotal * 0.05).toFixed(2))
    const total = subtotal + shipping + tax

    console.log(cart);

    const handlePayment = async () => {
        const accessToken = localStorage.getItem("accessToken")
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/create-order`, {
                products: cart?.items?.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                tax,
                shipping,
                amount: total,
                currency: "INR"
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })

            if (!data.success) return toast.error("Somthing went rong")

            console.log("Razorpay data:", data);


            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,
                name: "Ekart",
                description: "Order Payment",
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
                            response, {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        })
                        if (verifyRes.data.success) {
                            toast.success("✅Payment Successfull!")
                            dispatch(setCart({ items: [], totalPrice: 0 }))
                            navigate("/order-success")
                        } else {
                            toast.error("❌ Payment Verification faield")
                        }
                    } catch (error) {
                        toast.error("Error Verification Payment")
                    }
                },
                modal: {
                    ondismiss: async function () {
                        // Handle user closing the popup
                        await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, {
                            razorpay_order_id: data.order.id,
                            paymentFailed: true
                        }, {
                            headers:
                            {
                                Authorization: `Bearer ${accessToken}`
                            }
                        });
                        toast.error("Payment Cancelled or Failed")
                    }
                },
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#F472B6" }
            };
            const rzp = new window.Razorpay(options)

            rzp.on("payment.failed", async function (response) {
                try {
                    await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, {
                        razorpay_order_id: data.order.id,
                        paymentFailed: true
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } catch (err) {
                    console.log("Order marked failed:", err);
                }
                toast.error("Payment Failed. Please try again")
            })
            rzp.open()
        } catch (error) {
            console.error(error)
            toast.error("Somthing went rong while processing payment")
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 pt-24 md:pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-20 mt-4 max-w-7xl mx-auto">
                <div className="space-y-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                    {
                        showForm ? (
                            <>
                                <div>
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName"
                                        name="fullName"
                                        required
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone"
                                        name="phone"
                                        required
                                        placeholder="+91 9075XXXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email"
                                        name="email"
                                        required
                                        placeholder="Jhin@45gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address"
                                        name="address"
                                        required
                                        placeholder="123 street , Area"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city"
                                            name="city"
                                            required
                                            placeholder="Kolkata"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state"
                                            name="state"
                                            required
                                            placeholder="West Bengal"
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="zip">Zip</Label>
                                        <Input id="zip"
                                            name="zip"
                                            required
                                            placeholder="122001"
                                            value={formData.zip}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Input id="country"
                                            name="country"
                                            required
                                            placeholder="India"
                                            value={formData.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleSave} className='w-full'>Save & Continue</Button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Saved Addressess</h2>
                                {
                                    addresses.map((addr, index) => {
                                        return <div onClick={() => dispatch(setSelectedAddress(index))} key={index} className={`border p-4 rounded-md cursor-pointer relative 
                                            ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}>
                                            <p className="font-medium" >{addr.fullName}</p>
                                            <p>{addr.phone}</p>
                                            <p>{addr.email}</p>
                                            <p className="text-sm break-words">{addr.address}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</p>
                                            <button onClick={(e) => dispatch(deleteAddress(index))} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    })
                                }
                                <Button variant="outline" className='w-full' onClick={() => setShowForm(true)}>+ Add New Address</Button>
                                <Button disabled={selectedAddress === null} onClick={handlePayment} className='w-full bg-pink-600'>Proceed To Checkout</Button>

                            </div>
                        )
                    }
                </div>
                {/* Right side order summery */}
                <div className="w-full">
                    <Card className='w-full lg:w-[400px] lg:ml-auto'>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className="flex justify-between">
                                <span>Subtotal ({cart.items.length}) items</span>
                                <span>₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{shipping}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{tax}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total}</span>
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
        </div>
    )
}

export default AddressForm