import React, {useContext, useState} from 'react'
import {Outlet} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";
import Sidebar from "./dashboard/Sidebar.jsx";
import Header from "./dashboard/Header.jsx";
import {CircularProgress} from "@mui/material";

export default function Layout() {
    const {user, userLoader} = useContext(UserContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            {userLoader ? (
                <div className={'flex justify-center items-center w-full h-screen'}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {user?.role?.includes('ROLE_ADMIN') ? (
                        <div className="dark:bg-boxdark-2 dark:text-bodydark">
                            {/* <!-- ===== Page Wrapper Start ===== --> */}
                            <div className="flex h-screen overflow-hidden">
                                {/* <!-- ===== Sidebar Start ===== --> */}
                                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                                {/* <!-- ===== Sidebar End ===== --> */}

                                {/* <!-- ===== Content Area Start ===== --> */}
                                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                                    {/* <!-- ===== Header Start ===== --> */}
                                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                                    {/* <!-- ===== Header End ===== --> */}

                                    {/* <!-- ===== Main Content Start ===== --> */}
                                    <main>
                                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                            <Outlet />
                                        </div>
                                    </main>
                                    {/* <!-- ===== Main Content End ===== --> */}
                                </div>
                                {/* <!-- ===== Content Area End ===== --> */}
                            </div>
                            {/* <!-- ===== Page Wrapper End ===== --> */}
                        </div>
                    ) : (
                        <div>
                            <Outlet />
                        </div>
                    )}
                </>
            )}

        </>


    )
}
