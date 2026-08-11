import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/all`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (data.success) setOrders(data.orders);
            } catch (error) {
                console.error("❌ Failed to fetch admin orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [accessToken]);

    if (loading) {
        return <div className="text-center pt-24 pb-10 text-gray-500">Loading all orders...</div>;
    }
    return (
        <div className="pt-20 md:pt-24 pb-6 md:pb-10 px-4 md:px-8 mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">Admin - All Orders</h1>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-[700px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 sm:px-4 py-2 border-b">Order ID</th>
                                <th className="px-3 sm:px-4 py-2 border-b">User</th>
                                <th className="px-3 sm:px-4 py-2 border-b">Products</th>
                                <th className="px-3 sm:px-4 py-2 border-b">Amount</th>
                                <th className="px-3 sm:px-4 py-2 border-b">Status</th>
                                <th className="px-3 sm:px-4 py-2 border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-4 py-2 border-b font-mono text-[11px] sm:text-xs" title={order._id}>
                                        #{order._id.slice(-8)}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 border-b">
                                        {order.user?.name} <br />
                                        <span className="text-xs text-gray-500">{order.user?.email}</span>
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 border-b">
                                        {order.products.map((p, idx) => (
                                            <div key={idx} className="text-xs sm:text-sm whitespace-nowrap">
                                                {p.productName} x {p.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 border-b font-semibold whitespace-nowrap">
                                        ₹{order.amount.toLocaleString("en-IN")}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 border-b">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${order.status === "Paid"
                                                ? "bg-green-100 text-green-700" : order.status === "Pending" ?
                                                "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 border-b whitespace-nowrap">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminOrders