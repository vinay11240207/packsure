'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  FileText,
  HelpCircle,
  History,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  Settings,
  X,
} from 'lucide-react'

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'New Scan', href: '/scan/new', icon: Plus, primary: true },
  { label: 'Scan History', href: '/history', icon: History },
  { label: 'Reports', href: '/reports/demo', icon: FileText },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Regulatory Library', href: '#', icon: BookOpen },
  { label: 'Ask PackSure', href: '#', icon: Sparkles, ai: true },
]

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-row">
        <div className="brand-mark">
          <ShieldCheck size={19} strokeWidth={2.6} />
        </div>
        <div>
          <strong>PackSure</strong>
          <span>AI COMPLIANCE</span>
        </div>
        <button
          className="icon-button mobile-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="workspace-select">
        <div className="workspace-avatar">AC</div>
        <div>
          <strong>Acme Consumer</strong>
          <span>Compliance team</span>
        </div>
        <ChevronDown size={15} />
      </div>

      <nav className="side-nav" aria-label="Main navigation">
        <p className="nav-label">Workspace</p>
        {navItems.map(({ label, href, icon: Icon, primary, ai }) => {
          const active = pathname === href || (href !== '/dashboard' && href !== '#' && pathname?.startsWith(href))
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`nav-item ${active ? 'active' : ''} ${primary ? 'nav-primary' : ''} ${ai ? 'nav-ai' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <Icon size={17} strokeWidth={active ? 2.3 : 1.9} />
              <span>{label}</span>
              {ai && <span className="new-pill">AI</span>}
            </Link>
          )
        })}

        <p className="nav-label settings-label">Account</p>
        <button className="nav-item">
          <Settings size={17} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="help-card">
          <div className="help-icon">
            <HelpCircle size={16} />
          </div>
          <div>
            <strong>Legal Metrology</strong>
            <span>Rules 2011 active</span>
          </div>
        </div>

        <div className="user-row">
          <div className="user-avatar">JD</div>
          <div>
            <strong>Jordan Davis</strong>
            <span>Administrator</span>
          </div>
          <MoreHorizontal size={17} />
        </div>
      </div>
    </aside>
  )
}
