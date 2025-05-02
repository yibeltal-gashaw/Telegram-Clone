import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Settings } from 'lucide-react';

const NavBar = () => {
  const {authUser, isLoggedIn, logout} =useAuthStore()
  var profilePicture = "";
  if(authUser !==null){
    profilePicture = authUser.profilePicture
  }
  const handleLogout = () => {
    logout()
    
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
        <a href='/' className="btn btn-ghost text-xl">Telegram Clone</a>
    </div>
    {
      !isLoggedIn ? 
        
        <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <Settings className="w-12 rounded-full" />
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
            <a className="justify-between" href='/profile'>
                Profile
                <span className="badge">New</span>
            </a>
            </li>
            <li><a href='/setting'>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
        </div>
    : null
    }
    </div>
  )
}

export default NavBar
