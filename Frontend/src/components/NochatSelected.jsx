import { MessageSquare } from 'lucide-react'
import React from 'react'

function NochatSelected() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-16 bg-base-100/50">
        <div className="text-center space-y-6 max-w-md">
            {/* Icon Display */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="relative">
                    <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce shadow-lg">
                        <MessageSquare className='size-10 text-primary'/>
                    </div>
                    <div className="absolute -bottom-2 -right-2 size-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="size-3 rounded-full bg-primary animate-pulse"></div>
                    </div>
                </div>
            </div>

             {/* Message Display */}
             <h2 className='text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Welcome to Telegram!</h2>
             <p className='text-base-content/70 text-lg'>Select a chat to start messaging</p>
             
             {/* Decorative Elements */}
             <div className="flex justify-center gap-2 mt-8">
                <div className="size-2 rounded-full bg-primary/30 animate-pulse"></div>
                <div className="size-2 rounded-full bg-primary/30 animate-pulse delay-100"></div>
                <div className="size-2 rounded-full bg-primary/30 animate-pulse delay-200"></div>
             </div>
        </div>
    </div>
  )
}

export default NochatSelected
