'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Search, Hotel, LogIn, UserPlus, BookOpen, Film, Map, Mail } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: User },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Reels', href: '/reels', icon: Film },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Login', href: '/login', icon: LogIn },
  { name: 'Register', href: '/register', icon: UserPlus },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`bg-gray-900 text-gray-200 h-screen transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && <h1 className="text-xl font-bold">LuxeStay</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center p-4 hover:bg-gray-800 transition-colors duration-200 ${
              pathname === item.href ? 'border-r-4 border-yellow-500 glow-effect' : ''
            }`}
          >
            <item.icon className="w-6 h-6 mr-4" />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

