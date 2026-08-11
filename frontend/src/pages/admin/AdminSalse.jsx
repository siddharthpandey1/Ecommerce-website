import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminSalse = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalSales: 0,
        salesByDate: []
    })

    const fetchStats = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/sales`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setStats(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])
    return (
        <div className="bg-gray-100 pt-20 md:pt-24 pb-6 md:pb-10 px-4 md:px-8 mx-auto min-h-screen">
            <div className='grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 pt-4'>
                {/* stats card */}
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-sm sm:text-base">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xl sm:text-2xl font-bold p-4 sm:p-6 pt-0">{stats.totalUsers}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-sm sm:text-base">Total Products</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xl sm:text-2xl font-bold p-4 sm:p-6 pt-0">{stats.totalProducts}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-sm sm:text-base">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xl sm:text-2xl font-bold p-4 sm:p-6 pt-0">{stats.totalOrders}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-sm sm:text-base">Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xl sm:text-2xl font-bold p-4 sm:p-6 pt-0">{stats.totalSales}</CardContent>
                </Card>

                {/* sales Chart */}
                <Card className="col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Sales (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent style={{ height: 250 }} className="sm:!h-[300px] px-2 sm:px-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.sales} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                                <YAxis tick={{ fontSize: 10 }} width={45} />
                                <Tooltip />
                                <Area type="monotone" dataKey="amount" stroke="#F472B6" fill='#F472B6' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default AdminSalse;