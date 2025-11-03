'use client'

import React, { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface SidebarProps {
  items: SidebarItem[]
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth >= 1024) {
        const width = isExpanded ? '16rem' : '4rem'
        document.documentElement.style.setProperty('--sidebar-width', width)
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '0')
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
      document.documentElement.style.removeProperty('--sidebar-width')
    }
  }, [isExpanded])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }

    if (isMobileOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-all lg:hidden"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <XMarkIcon className="w-6 h-6 text-foreground" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-foreground" />
        )}
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 flex flex-col lg:w-16 lg:hover:w-64 ${
          isMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="h-16 border-b border-border flex items-center justify-center px-4 overflow-hidden">
          <div className="relative w-full flex items-center justify-center">
            <div className={`absolute w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 transition-opacity duration-300 ${
              (isExpanded || isMobileOpen) ? 'opacity-0' : 'opacity-100'
            }`}>
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <h1 className={`text-xl font-bold text-primary whitespace-nowrap transition-opacity duration-300 ${
              (isExpanded || isMobileOpen) ? 'opacity-100' : 'opacity-0'
            }`}>
              Habilita Aí
            </h1>
          </div>
        </div>

        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul className="space-y-2">
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                    title={!isExpanded && !isMobileOpen ? item.label : undefined}
                  >
                    <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
                    {(isExpanded || isMobileOpen) && (
                      <span className="font-medium whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex h-12 border-t border-border items-center justify-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
              isExpanded
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <ChevronLeftIcon
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </aside>
    </>
  )
}

