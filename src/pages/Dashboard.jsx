import React, { useState } from 'react'
import Sidebar from "../components/core/Dashboard/Sidebar"
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Dashboard() {
    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);
    if(profileLoading || authLoading) {
        return (
            <div>
                <p className='mt-12'>
                    Loading.....
                </p>
            </div>
        )
    }


  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard