import { LayoutDashboard, PackagePlus, PackageSearch, Users, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navItems = [
    { to: '/dashboard/sales', label: 'Dashboard', icon: <LayoutDashboard /> },
    { to: '/dashboard/add-product', label: 'Add Product', icon: <PackagePlus /> },
    { to: '/dashboard/products', label: 'Products', icon: <PackageSearch /> },
    { to: '/dashboard/users', label: 'Users', icon: <Users /> },
    { to: '/dashboard/orders', label: 'Orders', icon: <FaRegEdit /> },
]

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const linkClass = ({ isActive }) =>
        `text-lg md:text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`

    return (
        <>
            {/* mobile top bar */}
            <div className="flex md:hidden items-center justify-between bg-pink-50 border-b border-pink-200 px-4 py-3 sticky top-0 z-30">
                <span className="font-bold text-lg">Admin Panel</span>
                <button onClick={() => setIsOpen(true)}>
                    <Menu size={26} />
                </button>
            </div>

            {/* mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* sidebar: drawer on mobile, static on desktop */}
            <div className={`
                border-r bg-pink-50 border-pink-200 w-[260px] md:w-[300px] p-6 md:p-10 space-y-2 h-screen
                fixed md:fixed top-0 left-0 z-50 md:z-10
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}>
                <div className="flex justify-between items-center md:hidden mb-4">
                    <span className="font-bold text-lg">Menu</span>
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="text-center md:pt-10 px-1 md:px-3 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={linkClass}
                        >
                            {item.icon}<span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Sidebar;