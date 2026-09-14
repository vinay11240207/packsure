'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Menu, Search } from 'lucide-react'

interface TopbarProps {
  breadcrumb: string
  onOpenMobile: () => void
}

export default function Topbar({ breadcrumb, onOpenMobile }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="topbar">
      <button
        className="icon-button menu-trigger"
        onClick={onOpenMobile}
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>

      <div className="breadcrumbs">
        <span>Workspace</span>
        <span>/</span>
        <strong>{breadcrumb}</strong>
      </div>

      <div className="top-actions">
        <div className="search-box">
          <Search size={16} />
          <input aria-label="Search" placeholder="Search scans..." />
        </div>

        <div className="notification-wrap">
          <button
            className="icon-button notification-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <i />
          </button>
          {showNotifications && (
            <div className="notification-pop">
              <strong>Notifications</strong>
              <p>Terra Snacks scan flagged: Missing consumer helpline declaration.</p>
            </div>
          )}
        </div>

        <div className="top-user">
          JD
          <span>Jordan Davis</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  )
}
