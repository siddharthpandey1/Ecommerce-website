import { CheckCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 max-w-md w-full text-center">
                <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-500" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold mt-6 text-gray-800">
                    Payment SuccessFul 🎉
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Thank you for your purchase! Your Order has been placed successfully.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/products")}
                        className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => navigate("/orders")}
                        className="w-full border border-pink-600 text-pink-600 py-3 rounded-xl hover:bg-pink-50 transition"
                    >
                        View My Order
                    </button>
                </div>
            </div>
        </div>
    )
}
export default OrderSuccess;