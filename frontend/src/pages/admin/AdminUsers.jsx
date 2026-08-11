import axios from "axios";
import React, { useEffect, useState } from "react";
import UserLogo from "../../assets/user.png"
import { Edit, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const getAllUsers = async () => {
        const accessToken = localStorage.getItem("accessToken")
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/all-user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.users)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className="pt-20 md:pt-24 pb-6 md:pb-10 px-4 md:px-8 mx-auto">
            <h1 className="font-bold text-xl sm:text-2xl">User Management</h1>
            <p className="text-sm sm:text-base">View and manage registered users</p>
            <div className="relative w-full sm:w-[300px] mt-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Users..."
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mt-7">
                {
                    filteredUsers.map((user, index) => {
                        return <div key={index} className="bg-pink-100 p-5 rounded-lg">
                            <div className="flex items-center gap-2">
                                <img src={user?.profilePic || UserLogo} alt="" className="rounded-full w-16 aspect-square shrink-0
                                object-cover border border-pink-600" />
                                <div className="min-w-0">
                                    <h1 className="font-semibold truncate">{user?.firstName} {user?.lastName}</h1>
                                    <h3 className="text-sm truncate">{user?.email}</h3>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-3">
                                <Button onClick={() => navigate(`/dashboard/users/${user?._id}`)} variant="outline" ><Edit />Edit</Button>
                                <Button onClick={() => navigate(`/dashboard/users/orders/${user?._id}`)}><Eye />Show Order</Button>
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
    )
}
export default AdminUsers;