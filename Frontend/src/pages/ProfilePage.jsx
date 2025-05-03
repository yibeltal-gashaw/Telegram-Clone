import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react';

function ProfilePage() {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleImageUpload = async (e) => {
    const pickedFile = e.target.files[0];
    if (!pickedFile) return;
  
    const reader = new FileReader();
  
    // Read and preview the image
    reader.readAsDataURL(pickedFile);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image); // for preview
  
      try {
        // Correct: send actual File object
        await updateProfile({ profilePicture: pickedFile });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
  };
  
  
  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className="mt-2">Your Profile information</p>

            {/* Profile Picture */}
            <div className='flex flex-col items-center gap-4'>
              <div className="relative">
                <img 
                  src={selectedImage || authUser?.profilePicture || "/avator.png"} 
                  alt="profile"
                  className='size-32 rounded-full object-cover border-4' />
                <label 
                  htmlFor="avator-upload"
                  className={`
                    absolute bottom-0 right-0
                    bg-base-content hover:scale-105
                    p-2 rounded-full cursor-pointer
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : null}
                    `}
                  >
                  <Camera className='size-5 text-base-200'/>
                  <input 
                    type="file"
                    id='avator-upload'
                    className='hidden'
                    onChange={handleImageUpload}
                    accept='image/*'
                    disabled={isUpdatingProfile}
                    />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile?"Uploading....": "Click the camera icon to update your photo"}</p>

            </div>

            {/* Profile Details */}
            <div className="space-y-8">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className='size-4'/>
                  Full Name
                </div>
                <p className="flex px-4 py-2.5 rounded-lg border">{authUser?.fullname || 'Not set'}</p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className='size-4'/>
                  Email Address
                </div>
                <p className="flex px-4 py-2.5 rounded-lg border">{authUser?.email || 'Not set'}</p>
              </div>
            </div>

            {/* Account information */}
            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="flex text-lg font-medium mb-4">Account Information</h2>
              <div className=" flex items-center justify-between py-2 border-zinc-700 border-b">
                <span>Member Since</span>
                <span>{authUser?.createdAt ? authUser.createdAt.split("T")[0] : 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
