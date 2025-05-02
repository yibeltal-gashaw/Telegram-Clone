import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import MessageInput from './MessageInput'

function ChatPage() {
  const { selectedUser,messages,getMessages } = useChatStore()
  const {authUser} = useAuthStore()
  const latestMessageRef = useRef(null);

  
  useEffect(() => {
    getMessages(selectedUser._id)
    latestMessageRef.current?.scrollIntoView({behavior: "smooth"})
  },[getMessages, messages]);

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
            <div 
              key={index} 
              ref={index === messages.length - 1 ? latestMessageRef : null}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={profilePicture || "/avatar.png"}
                  />
                </div>
              </div>

              <div className="chat-bubble bg-base-100 max-w-lg">{message.text}</div>
              {
                message.image && (
                  <div>
                  <img src={message.image} alt="Images" className='rounded-lg pt-3' />
                </div>
                )
              }
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <MessageInput/>
    </div>
  )
}

export default ChatPage