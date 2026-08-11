import Sidebar from "@/components/ui/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="md:flex">
            <Sidebar />
            <div className="flex-1 w-full md:pl-[300px]">
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard;