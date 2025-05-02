import { User } from 'lucide-react'
import React from 'react'

function SideBarSkeleton() {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:72 border-r border-base-300 flex flex-col transition-all duration-200">
        {/* Header */}
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <User className='size'/>
            <p>Contacts</p>
          </div>
        </div>

        {/* Skeleton Contacts */}
        <div className="">
          {
            skeletonContacts.map(((_, idx) => (
              <div 
              key={idx}
              className="w-full p-3 flex items-center gap3">
                {/* Avator Skeleton */}
                <div className="relative mx-auto lg:mx-0">
                  <div className="skeleton size-12 rounded-full"></div>
                </div>

                {/* User info skeleton */}
                <div className="flex-1 hidden lg:block text-left min-w-0">
                  <div className="skeleton h-4 w-32 mb-2"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
            )))
          }
        </div>
    </aside>
  )
}

export default SideBarSkeleton
