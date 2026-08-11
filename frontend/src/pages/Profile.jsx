import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.png"
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";




const Profile = () => {
    const { user } = useSelector(store => store.user)
    const params = useParams()
    const userId = params.userId

    const [updateUser, setUpdateUser] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNo: user?.phoneNo,
        address: user?.address,
        city: user?.city,
        zipCode: user?.zipCode,
        profilePic: user?.profilePic,
        role: user?.role
    })
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) }) //preview only
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const accessToken = localStorage.getItem("accessToken")

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("firstName", updateUser.firstName)
            formData.append("lastName", updateUser.lastName)
            formData.append("email", updateUser.email)
            formData.append("phoneNo", updateUser.phoneNo)
            formData.append("address", updateUser.address)
            formData.append("city", updateUser.city)
            formData.append("zipCode", updateUser.zipCode)
            formData.append("role", updateUser.role)

            if (file) {
                formData.append("file", file)
            }
            const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile")
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <div className="pt-24 md:pt-32 pb-10 px-4 min-h-screen bg-gray-100">
            <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="w-full">
                    <div>
                        <div className="flex flex-col justify-center items-center bg-gray-100">
                            <h1 className="font-bold mb-7 text-xl sm:text-2xl text-gray-800">Update Profile</h1>
                            <div className="w-full flex flex-col md:flex-row gap-8 md:gap-10 justify-between items-center md:items-start px-0 sm:px-7 max-w-2xl">
                                {/* profile pecture */}
                                <div className="flex flex-col items-center shrink-0">
                                    <img src={updateUser?.profilePic || userLogo} alt="profile" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-800" />
                                    <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg
                                    hover:bg-pink-700">ChangePicture
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </Label>
                                </div>
                                {/* profile form */}
                                <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-4 sm:p-5 rounded-lg bg-white w-full">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label className='block text-sm font-medium'>Frist Name</Label>
                                            <Input type='text' name="firstName" placeholder="Enter your FristName" value={updateUser.firstName} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1' />
                                        </div>
                                        <div>
                                            <Label className='block text-sm font-medium'>Last Name</Label>
                                            <Input type='text' name="lastName" placeholder="Enter your LastName" value={updateUser.lastName} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1' />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className='block text-sm font-medium'>Email</Label>
                                        <Input type='email' name="email" disabled placeholder="Enter your Email" value={updateUser.email} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed' />
                                    </div>
                                    <div>
                                        <Label className='block text-sm font-medium'>Phone Number</Label>
                                        <Input type='text' name="phoneNo" placeholder="Enter your Contect No" value={updateUser.phoneNo} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1' />
                                    </div>
                                    <div>
                                        <Label className='block text-sm font-medium'>Address</Label>
                                        <Input type='text' name="address" placeholder="Enter your Address" value={updateUser.address} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1' />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label className='block text-sm font-medium'>City</Label>
                                            <Input type='text' name="city" placeholder="Enter your city" value={updateUser.city} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1' />
                                        </div>
                                        <div>
                                            <Label className='block text-sm font-medium'>Zip Code</Label>
                                            <Input type='text' name="zipCode" placeholder="Enter your ZipCode" value={updateUser.zipCode} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1' />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg"
                                    >
                                        {loading ? "Updating..." : "Update Profile"}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="orders" className="w-full">
                    <MyOrder/>
                </TabsContent>
            </Tabs>

        </div>
    )
}
export default Profile