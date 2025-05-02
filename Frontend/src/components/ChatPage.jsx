import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import {Image, Plus} from 'lucide-react'

function ChatPage() {
  const { selectedUser,messages,sendMessages,getMessages } = useChatStore()
  const {authUser} = useAuthStore()
  const [text, setText] = useState("");
  const [image,setImage] = useState(null);
  const fileInputRef = useRef(null)
  
  useEffect(() => {
    getMessages(selectedUser._id)
  },[getMessages]);

  const handleImageChange = (e) => {
    const file = e.target.file[0];
    if(!file.type.startsWith('image/')){
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    }

    reader.readAsDataURL(file);
  }
  const removeImage = () => {
    setImage(null);
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!text.trim() && !image) return;
    try {
      await sendMessages({
        text:text.trim(),
      });

      //  clear form 
      setText("");
      setImage("");

    } catch (error) {
      toast.error("Failed to send messages")
    }
  }
  return (
    <div className='flex flex-col h-full w-full bg-base-100 overflow-hidden'>
      {/* Chat Header */}
      <div className="p-4 border-b border-base-300 flex items-center gap-3">
        <div className="relative">
          <img className='size-10 rounded-full object-cover border-2 border-primary/20' src={selectedUser.profilePicture || "/avator.png"} alt="Profile" />
          <div className="absolute bottom-0 right-0 size-3 rounded-full bg-success border-2 border-base-100"></div>
        </div>
        <div>
          <h3 className="font-medium">{selectedUser.fullname}</h3>
          <p className="text-xs text-base-content/60">Online</p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-300">
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          const profilePicture = isSender
            ? authUser.profilePicture
            : selectedUser.profilePicture;

          return (
            <div key={index} className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={profilePicture || "/avatar.png"}
                  />
                </div>
              </div>
              <div className="chat-bubble bg-base-100">{message.text}</div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-2 bg-base-200 rounded-full px-4 py-2">
        {
          image && (
            <div className="mb-3 items-center gap-2">
              <div className="relative">
                <img src={image} alt="Preview"
                className='size-20 object-cover rounded-lg border border-zinc-700' />
              </div>
            </div>
          )
        }
        <input
            type='file'
            accept='images/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type='button'
            className={`hidden sm:flex btn btn-circle ${
              image ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={20} />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e)=>{setText(e.target.value)}}
            className="flex-1 bg-transparent outline-none text-base-content"
          />
          
          
          <button
            className="btn btn-circle btn-sm btn-primary"
            onClick={handleSendMessage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage