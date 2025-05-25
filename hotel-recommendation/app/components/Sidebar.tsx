'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  Search,
  LogIn,
  UserPlus,
  BookOpen,
  Film,
  Map,
  Mail,
  Info,
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: User },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Reels', href: '/reels', icon: Film },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Login', href: '/login', icon: LogIn },
  { name: 'Register', href: '/register', icon: UserPlus },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out h-screen ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 bg-gray-700 text-sm font-bold"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="mt-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 hover:bg-gray-800 transition-colors duration-200 ${
              pathname === item.href ? 'border-r-4 border-yellow-500 bg-gray-800' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3 text-yellow-400" />
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
