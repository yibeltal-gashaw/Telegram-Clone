import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES, THEME_COLORS } from '../constants'

const PREVIEW_MESSAGES = [
  {id:1,content:'Hey! How are you?', isSent:false},
  {id:2,content:'I am doing great, thank you!', isSent:true},
]


function SettingPage() {
  const {theme, setTheme} = useThemeStore()
  return (
      <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70"> Choose a theme for your chat interface</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {
              THEMES.map((t) => (
                <button 
                key={t}
                className={` 
                  group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
                onClick={() => setTheme(t)}
                >
                  <div className="relative h-8 w-full rounded-md overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded" style={{ backgroundColor: THEME_COLORS[t]?.primary || '#570df8' }}></div>
                      <div className="rounded" style={{ backgroundColor: THEME_COLORS[t]?.secondary || '#f000b8' }}></div>
                      <div className="rounded" style={{ backgroundColor: THEME_COLORS[t]?.accent || '#37cdbe' }}></div>
                      <div className="rounded" style={{ backgroundColor: THEME_COLORS[t]?.neutral || '#3d4451' }}></div>
                    </div>
                  </div>
                  <span className='text-[11px] font-medium truncate w-full text-center'>
                    {t.charAt(0).toUpperCase() + t.slice(1)}</span>
                </button>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default SettingPage
