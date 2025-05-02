import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
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
                {/*Header */}
                <div className="flex items-center gap-3">
                    <Users className='size-6 text-primary'/>
                    <span className="font-semibold text-lg">Contacts</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                {/* Contacts List */}
                {
                    users.map((user) => (
                        <div 
                        key={user.id}
                        className={`w-full p-3 flex items-center gap-3 mt-1 hover:bg-base-300 cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-base-100' : ''}`}
                        onClick={() => setSelectedUser(user)}>
                            {/* Avatar */}
                            <div className="relative mx-auto lg:mx-0">
                                <img className='size-10 rounded-full object-cover border-2 border-primary/20' src={user.profilePicture || '/avator.png'} alt="Profile" />
                            </div>

                            {/* User info */}
                            <div className="flex-1 hidden lg:block text-left min-w-0">
                                <div className="w-full flex justify-between px-2 h-4 mb-2">
                                    <p className='font-medium text-base-content'>{user.fullname}</p>
                                    <p className='text-sm text-base-content/60'>12:00</p>
                                </div>
                                <div className="flex justify-between px-2 h-4 text-sm text-ellipsis whitespace-nowrap">
                                    <p className='pr-3 text-base-content/70 truncate'>Someone Just Joined telegram</p>
                                    <div className="bg-primary text-primary-content rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </aside>
    )
}

export default Sidebar