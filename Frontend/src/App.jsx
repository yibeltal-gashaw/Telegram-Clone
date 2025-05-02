
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
import { useThemeStore } from './store/useThemeStore'

function App() {
    const {authUser, checkAuth,isCheckingAuth} = useAuthStore();
    const {theme} = useThemeStore();
    
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if(isCheckingAuth && !authUser) return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin'/>
       </div>
    )
  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/login'/>} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>} />
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to='/'/>} />
        <Route path='/setting' element={authUser ? <SettingPage/> : <Navigate to='/login'/>} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>} />
      </Routes>
      <Toaster  
      position="top-center"
      reverseOrder={false}/>
    </div>
  )
}

export default App
