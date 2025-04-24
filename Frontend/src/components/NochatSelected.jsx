import { MessageSquare } from 'lucide-react'
import React from 'react'

function NochatSelected() {
  return (
    <div className="w-full flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
        <div className="max-w-md text-center space-y-6">
            {/* Icon Display */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="relative">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                        <MessageSquare className='size-8 text-primary'/>
                    </div>
                </div>
            </div>

             {/* Message Display */}
             <h2 className='text-2xl font-bold'>Welcome to Tellegram!</h2>
             <p className='text-base-content/60'>select a chat to start messaging </p>
        </div>
    </div>
  )
}

export default NochatSelected
