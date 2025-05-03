import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import MessageInput from './MessageInput'
import { formatTime } from '../lib/formatTime.js'

function ChatPage() {
  const { selectedUser, messages, getMessages, listenForMessages, forgetMessages } = useChatStore()
  const { onlineUsers } = useAuthStore();
  const { authUser } = useAuthStore()
  const latestMessageRef = useRef(null);


  useEffect(() => {
    if (!selectedUser) return;

    getMessages(selectedUser._id);

    // Listen for new incoming messages only once
    listenForMessages();

    // Scroll into view after messages are fetched
    setTimeout(() => {
      latestMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => forgetMessages();
  }, [selectedUser._id, listenForMessages, forgetMessages,getMessages]);

  return (
    <div className='flex flex-col h-full w-full bg-base-100 overflow-hidden'>
      {/* Chat Header */}
      <div className="p-4 border-b border-base-300 flex items-center gap-3">
        <div className="relative">
          <img className='size-10 rounded-full object-cover border-2 border-primary/20' src={selectedUser.profilePicture || "/avator.png"} alt="Profile" />
          {onlineUsers?.includes(selectedUser._id) && (
            <div className={`absolute bottom-0 right-0 size-3 rounded-full bg-success border-2 border-base-100`}></div>
            )}
        </div>
        <div>
          <h3 className="font-medium">{selectedUser.fullname}</h3>
          <p className="text-xs text-base-content/60">{onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
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
                    src={profilePicture || "/avator.png"}
                  />
                </div>
              </div>

              <div className="chat-bubble bg-base-100 max-w-lg">
                {message.image && (
                  <div className="pt-2">
                    <img src={message.image} 
                    alt="Sent Image" 
                    className="object-cover max-h-80" />
                  </div>
                )}
                {message.text && (
                  <div className="mt-1">{message.text}</div>
                )}
                <span className="text-xs text-zinc-500 block text-right mt-1">
                  {formatTime(message.createdAt)}
                </span>
              </div> 
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  )
}

export default ChatPage