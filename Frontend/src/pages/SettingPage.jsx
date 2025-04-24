import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES, THEME_COLORS } from '../constants'
import { Palette } from 'lucide-react'

const PREVIEW_MESSAGES = [
  {id:1,content:'Hey! How are you?', isSent:false},
  {id:2,content:'I am doing great, thank you!', isSent:true},
]


function SettingPage() {
  const {theme, setTheme} = useThemeStore()
  return (
      <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Theme</h2>
              <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-primary gap-2">
                <Palette className="size-4" />
                <span className="capitalize">{theme}</span>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {THEMES.map((t) => (
                    <button 
                      key={t}
                      className={` 
                        group flex flex-col items-center gap-2 p-3 rounded-lg transition-all
                        ${theme === t ? "bg-secondary/10 ring-2 ring-primary" : "hover:bg-base-200"}
                      `}
                      onClick={() => setTheme(t)}
                    >
                      <div className="relative h-10 w-full rounded-md overflow-hidden">
                        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                          <div className="rounded bg-primary"></div>
                          <div className="rounded bg-secondary"></div>
                          <div className="rounded bg-accent"></div>
                          <div className="rounded bg-neutral"></div>
                        </div>
                      </div>
                      <span className='text-sm font-medium capitalize'>
                        {t}
                      </span>
                    </button>
                  ))}
                </div>
              </ul>
            </div>
          </div>
     

          {/* Preview Section */}
          <h3 className='text-lg font-semibold mb-3'>Preview</h3>
          <div className="">
            <div className="">
              <div className="">
                {/* Chat UI Mokup*/}
                <div className="">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary flex items-center justify-center font-medium">
                        J
                      </div>
                      <div>
                        <h3 className='font-medium text-sm'>Abel Demo</h3>
                        <p className='text-xs text-base-content/70'>online</p>
                      </div>
                    </div>
                  </div>
                  {/* Chat Body */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`
                          flex ${msg.isSent ? 'justify-end':'justify-start'}
                          `}> 
                          
                        <div className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${msg.isSent ? 'bg-primary text-primary-content':'bg-base-200'}
                          `}>

                          <p className='text-sm'>{msg.content}</p>
                          <p className={`
                          text-[10px] mt-1.5
                          ${msg.isSent ? 'text-accent':'text-primary'}
                            `}>
                              12:00 pm
                              </p>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SettingPage
