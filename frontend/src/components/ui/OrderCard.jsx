import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const OrderCard = ({ userOrder }) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col gap-3 px-4 sm:px-6">
            <div className="w-full py-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button onClick={() => navigate(-1)}><ArrowLeft /></Button>
                    <h1 className="text-xl sm:text-2xl font-bold">Orders</h1>
                </div>
                {
                    userOrder?.length === 0 ? (
                        <p className="text-gray-800 space-y-6 text-lg sm:text-2xl">No Orders found for this user</p>
                    ) : (
                        <div className="space-y-6 w-full">
                            {
                                userOrder?.map((order) => (
                                    <div key={order._id} className="shadow-lg rounded-2xl p-4 sm:p-5 border border-gray-200">
                                        {/* order header */}

                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-4">
                                            <h2 className="text-base sm:text-lg font-semibold break-all">
                                                Order ID:{" "}
                                                <span className="text-gray-600">{order._id}</span>
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Amount:{" "}
                                                <span className="font-bold">{order.currency} {order.amount.toFixed(2)}</span>
                                            </p>
                                        </div>

                                        {/* user Info */}
                                        <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
                                            <div className='mb-4'>
                                                <p className='text-sm text-gray-700'>
                                                    <span className='font-medium'>User:</span>{" "}
                                                    {order.user?.firstName || "Unknown"} {order.user?.lastName}
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    Email: {order.user?.email || "N/A"}
                                                </p>
                                            </div>

                                            <span className={`${order.status === "Paid" ? "bg-green-500" : order.status === "Failed" ? "bg-red-500" : "bg-orange-300"
                                                } text-white px-2 py-1 rounded-lg w-max`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        {/* products */}
                                        <div>
                                            <h3 className='font-medium mb-2'>Products:</h3>
                                            <ul className='space-y-2'>
                                                {
                                                    order.products.map((product, index) => (
                                                        <li key={index} className='flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-gray-50 p-3 rounded-lg'>
                                                            <div className="flex items-center gap-3">
                                                                <img onClick={() => navigate(`/products/${product?.productId?._id}`)} className='w-14 h-14 sm:w-16 sm:h-16 shrink-0 object-cover cursor-pointer' src={product.productId?.productImg?.[0].url} alt="" />
                                                                <span className='line-clamp-2 text-sm sm:text-base'>{product.productId?.productName}</span>
                                                            </div>
                                                            <span className='font-medium text-sm sm:text-base'>
                                                                ₹{product.productId?.productPrice} x {product.quantity}
                                                            </span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default OrderCard