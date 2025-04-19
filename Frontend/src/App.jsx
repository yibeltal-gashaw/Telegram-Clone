import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/Navbar'
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import  {useAuthStore}  from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
    const {authUser, checkAuth,isCheckingAuth} = useAuthStore();
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
    if(isCheckingAuth && !authUser) return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin'/>
       </div>
    )
  return (
    <div>
      <Toaster  
      position="top-center"
      reverseOrder={false}/>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/login'/>} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>} />
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to='/'/>} />
        <Route path='/setting' element={authUser ? <HomePage/> : <Navigate to='/setting'/>} />
        <Route path='/profile' element={authUser ? <HomePage/> : <Navigate to='/profile'/>} />
      </Routes>
    </div>
  )
}

export default App
