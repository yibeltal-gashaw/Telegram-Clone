import { User, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBarSkeleton from './skeleton/SideBarSkeleton'

function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
    useEffect(() => {
        getUsers()
    },[getUsers])
    if(isUsersLoading) return <SideBarSkeleton/>
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className='border-b border-base-300 p-5 w-full'>
                <div className="flex items-center gap-3">
                    <Users className='size-6'/>
                    <span>Contants</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar