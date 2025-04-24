import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const NavBar = () => {
  const {authUser} = useAuthStore()
  var isLoggedIn = false;
  if(authUser !==null ){
    isLoggedIn = true
  }
  console.log(isLoggedIn)
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
        <a href='/' className="btn btn-ghost text-xl">Telegram Clone</a>
    </div>
    <div className="flex gap-2">      
       {isLoggedIn? <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                src="/avator.png"/>
            </div>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>Login
            <a className="justify-between" href='/profile'>
                Profile
                <span className="badge">New</span>
            </a>
            </li>
            <li><a href='/setting'>Settings</a></li>
            <li><a href='/logout'>Logout</a></li>
        </ul>
        </div>: null}
    </div>
    </div>
  )
}

export default NavBar
