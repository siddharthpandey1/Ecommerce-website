import { Menu, ShoppingCart, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
    const { user } = useSelector(store => store.user)
    const { cart } = useSelector(store => store.product)
    const accessToken = localStorage.getItem('accessToken')
    const admin = user?.role === "admin" ? true : false
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <Link to={'/'}>
                        <img src="/Ekart.png" alt="" className="w-[110px] md:w-[140px]" />
                    </Link>
                    {/* hamburger - only mobile/tablet */}
                    <button
                        className="lg:hidden text-pink-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Desktop nav */}
                <nav className="hidden lg:flex gap-10 justify-between items-center">
                    <ul className="flex gap-7 items-center text-xl font-semibold">
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/products'}><li>Products</li></Link>
                        {
                            user && <Link to={`/profile/${user._id}`}><li>Hello, {user.firstName}</li></Link>
                        }
                        {
                            admin && <Link to={`/dashboard/sales`}><li>Dashboard</li></Link>
                        }
                    </ul>
                    <Link to={'/cart'} className="relative">
                        <ShoppingCart />
                        <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
                            {cart?.items?.length || 0}
                        </span>
                    </Link>
                    {
                        user ? <Button onClick={logoutHandler} className="bg-pink-600 text-white cursor-pointer">Logout</Button> :
                            <Button onClick={() => navigate('/login')} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer">Login</Button>
                    }
                </nav>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="lg:hidden bg-pink-50 border-t border-pink-200 px-4 pb-4">
                    <ul className="flex flex-col gap-4 text-lg font-semibold pt-4">
                        <Link to={'/'} onClick={() => setMenuOpen(false)}><li>Home</li></Link>
                        <Link to={'/products'} onClick={() => setMenuOpen(false)}><li>Products</li></Link>
                        {
                            user && <Link to={`/profile/${user._id}`} onClick={() => setMenuOpen(false)}><li>Hello, {user.firstName}</li></Link>
                        }
                        {
                            admin && <Link to={`/dashboard/sales`} onClick={() => setMenuOpen(false)}><li>Dashboard</li></Link>
                        }
                        <Link to={'/cart'} onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                            <ShoppingCart size={20} /> Cart ({cart?.items?.length || 0})
                        </Link>
                        {
                            user ? <Button onClick={() => { logoutHandler(); setMenuOpen(false) }} className="bg-pink-600 text-white cursor-pointer w-full">Logout</Button> :
                                <Button onClick={() => { navigate('/login'); setMenuOpen(false) }} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer w-full">Login</Button>
                        }
                    </ul>
                </div>
            )}
        </header>
    )
}
export default Navbar;