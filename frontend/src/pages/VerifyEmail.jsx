import axios from "axios";
import { LogIn } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("Verify...")
    const navigate = useNavigate()
    const verifyEmail = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/user/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {
                setStatus('✅ Email Verified Successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setStatus("❌ Verification failed. Please try again!")
        }
    }
    useEffect(() => {
        verifyEmail()
    }, [token])
    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center w-full max-w-md">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{status}</h2>
            </div>
        </div>
    )
}
export default VerifyEmail;