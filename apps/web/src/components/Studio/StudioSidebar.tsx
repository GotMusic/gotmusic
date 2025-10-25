"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  MusicalNoteIcon, 
  PhotoIcon, 
  ChartBarIcon,
  CogIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/studio", icon: HomeIcon },
  { name: "Assets", href: "/studio/assets", icon: MusicalNoteIcon },
  { name: "Upload Audio", href: "/studio/upload/audio", icon: MusicalNoteIcon },
  { name: "Upload Images", href: "/studio/upload/images", icon: PhotoIcon },
  { name: "Analytics", href: "/studio/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/studio/settings", icon: CogIcon },
  { name: "Profile", href: "/studio/profile", icon: UserIcon },
];

export function StudioSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-bg-elevated border-r border-border-subtle">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border-subtle">
        <Link href="/studio" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <MusicalNoteIcon className="w-5 h-5 text-bg" />
          </div>
          <span className="text-lg font-semibold text-fg">Studio</span>
        </Link>
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
                    group flex gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-cta-brand/10 text-cta-brand border border-cta-brand/20' 
                      : 'text-fg-muted hover:bg-bg-elevated hover:text-fg'
                    }
                  `}
                >
                  <item.icon 
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? 'text-cta-brand' : 'text-fg-muted group-hover:text-fg'
                    }`} 
                    aria-hidden="true" 
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User section */}
        <div className="mt-auto border-t border-border-subtle pt-4">
          <div className="flex items-center gap-x-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-bg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg truncate">Producer</p>
              <p className="text-xs text-fg-muted truncate">Studio Access</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
