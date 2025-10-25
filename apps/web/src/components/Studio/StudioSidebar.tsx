"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  HomeIcon, 
  MusicalNoteIcon, 
  ChartBarIcon,
  CogIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/studio", icon: HomeIcon },
  { name: "Assets", href: "/studio/assets", icon: MusicalNoteIcon },
  { name: "Analytics", href: "/studio/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/studio/settings", icon: CogIcon },
  { name: "Profile", href: "/studio/profile", icon: UserIcon },
];

export function StudioSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('studio-sidebar-collapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('studio-sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex h-full flex-col bg-bg-elevated border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo and Toggle */}
      <div className="flex h-16 shrink-0 items-center px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center border border-cta-brand/30 hover:border-cta-brand/50 transition-colors"
              aria-label="Collapse sidebar"
            >
              <MusicalNoteIcon className="w-5 h-5 text-bg" />
            </button>
            <Link href="/studio" className="text-lg font-semibold text-fg hover:text-cta-brand transition-colors">
              Studio
            </Link>
          </div>
        )}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center border border-cta-brand/30 hover:border-cta-brand/50 transition-colors mx-auto"
            aria-label="Expand sidebar"
          >
            <MusicalNoteIcon className="w-5 h-5 text-bg" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-3 py-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    group flex gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors border
                    ${isActive 
                      ? 'bg-cta-brand/10 text-cta-brand border-cta-brand/40' 
                      : 'text-fg-muted hover:bg-bg-elevated hover:text-fg border-transparent hover:border-cta-brand/30'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon 
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? 'text-cta-brand' : 'text-fg-muted group-hover:text-fg'
                    }`} 
                    aria-hidden="true" 
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User section */}
        <div className="mt-auto border-t border-border pt-4">
          <div className={`flex items-center border border-transparent hover:border-cta-brand/30 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center px-3 py-2' : 'gap-x-3 px-3 py-2'
          }`}>
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center border border-cta-brand/30">
              <UserIcon className="w-4 h-4 text-bg" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-fg truncate">Producer</p>
                <p className="text-xs text-fg-muted truncate">Studio Access</p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
