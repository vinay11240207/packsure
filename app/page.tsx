'use client'

import { useState } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Box,
  ChevronDown,
  FileText,
  HelpCircle,
  History,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'

const scans = [
  { name: 'Organic Oat Milk', type: 'Beverage carton', date: 'Today, 10:42 AM', score: 96, status: 'Passed', color: 'green', image: 'OM' },
  { name: 'PureGlow Serum', type: 'Cosmetic bottle', date: 'Yesterday, 4:18 PM', score: 82, status: 'Needs review', color: 'amber', image: 'PG' },
  { name: 'Terra Snacks', type: 'Flexible pouch', date: 'Sep 12, 2026', score: 64, status: 'Potential issue', color: 'red', image: 'TS' },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'New Scan', icon: Plus, primary: true },
  { label: 'Scan History', icon: History },
  { label: 'Reports', icon: FileText },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Regulatory Library', icon: BookOpen },
  { label: 'Ask PackSure', icon: Sparkles, ai: true },
]

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [toast, setToast] = useState('')

  const startScan = () => {
    setToast('New scan workspace ready')
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><ShieldCheck size={19} strokeWidth={2.6} /></div>
          <div><strong>PackSure</strong><span>AI COMPLIANCE</span></div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="workspace-select"><div className="workspace-avatar">AC</div><div><strong>Acme Consumer</strong><span>Compliance team</span></div><ChevronDown size={15} /></div>
        <nav className="side-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon, active, primary, ai }) => (
            <button key={label} className={`nav-item ${active ? 'active' : ''} ${primary ? 'nav-primary' : ''} ${ai ? 'nav-ai' : ''}`} onClick={primary ? startScan : undefined}>
              <Icon size={17} strokeWidth={active ? 2.3 : 1.9} /><span>{label}</span>{ai && <span className="new-pill">AI</span>}
            </button>
          ))}
          <p className="nav-label settings-label">Account</p>
          <button className="nav-item"><Settings size={17} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-footer"><div className="help-card"><div className="help-icon"><HelpCircle size={16} /></div><div><strong>Need help?</strong><span>Visit our resource center</span></div><ChevronDown size={14} /></div><div className="user-row"><div className="user-avatar">JD</div><div><strong>Jordan Davis</strong><span>Administrator</span></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-trigger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>Dashboard</strong></div><div className="top-actions"><div className="search-box"><Search size={16} /><input aria-label="Search" placeholder="Search scans..." /></div><div className="notification-wrap"><button className="icon-button notification-button" onClick={() => setShowNotifications(!showNotifications)} aria-label="Notifications"><Bell size={18} /><i /></button>{showNotifications && <div className="notification-pop"><strong>Notifications</strong><p>Your PureGlow review is ready.</p></div>}</div><div className="top-user">JD<span>Jordan Davis</span><ChevronDown size={14} /></div></div></header>

        <div className="page-body">
          <section className="welcome-row"><div><p className="eyebrow">MONDAY, SEPTEMBER 14, 2026</p><h1>Good morning, Jordan <span>—</span></h1><p className="subheading">Here&apos;s what&apos;s happening with your packaging compliance.</p></div><button className="primary-button" onClick={startScan}><Plus size={18} /> Scan a product</button></section>

          <section className="kpi-grid" aria-label="Compliance overview">
            <KpiCard label="Products scanned" value="248" delta="18.4%" note="vs. last month" icon={Box} tone="blue" />
            <KpiCard label="Passed" value="186" delta="12.8%" note="vs. last month" icon={ShieldCheck} tone="green" />
            <KpiCard label="Needs review" value="42" delta="6.2%" note="vs. last month" icon={Activity} tone="amber" />
            <KpiCard label="Potential issues" value="20" delta="2.1%" note="vs. last month" icon={Bell} tone="red" negative />
          </section>

          <section className="content-grid"><div className="card recent-card"><div className="card-header"><div><h2>Recent scans</h2><p>Your latest compliance screenings</p></div><button className="text-button">View all <span>→</span></button></div><div className="scan-list">{scans.map(scan => <ScanRow key={scan.name} scan={scan} />)}</div><div className="table-footer"><span>Showing 3 of 248 scans</span><button className="icon-button"><ChevronDown size={15} /></button></div></div><div className="right-column"><div className="card issues-card"><div className="card-header"><div><h2>Common issues</h2><p>Last 30 days</p></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="issue-chart"><div className="donut"><div><strong>62%</strong><span>Labeling</span></div></div><div className="legend"><Legend color="purple" label="Labeling" value="62%" /><Legend color="blue" label="Materials" value="24%" /><Legend color="yellow" label="Recycling" value="14%" /></div></div><div className="issue-footer"><span>Most frequent finding</span><strong>Missing recycling symbols</strong></div></div><div className="card upgrade-card"><div className="sparkle-circle"><Sparkles size={16} /></div><div><h3>Automate your reviews</h3><p>Unlock team workflows and custom reports.</p></div><button className="upgrade-button">Explore Pro <span>→</span></button></div></div></section>
          <section className="tip-banner"><div className="tip-icon"><Sparkles size={17} /></div><div><strong>Quick tip</strong><p>Upload all sides of a package for the most accurate compliance score.</p></div><button className="icon-button" aria-label="Dismiss tip"><X size={16} /></button></section>
        </div>
      </main>
      {toast && <div className="toast"><ShieldCheck size={17} /> {toast}</div>}
      <nav className="mobile-nav"><button className="mobile-nav-active"><LayoutDashboard size={18} /><span>Home</span></button><button onClick={startScan}><Plus size={20} /><span>New scan</span></button><button><History size={18} /><span>History</span></button><button><FileText size={18} /><span>Reports</span></button></nav>
    </div>
  )
}

function KpiCard({ label, value, delta, note, icon: Icon, tone, negative = false }: { label: string; value: string; delta: string; note: string; icon: typeof Box; tone: string; negative?: boolean }) {
  return <div className="kpi-card"><div className={`kpi-icon ${tone}`}><Icon size={18} /></div><div className="kpi-label">{label}<span className={`trend ${negative ? 'negative' : ''}`}>{negative ? '↓' : '↑'} {delta}</span></div><div className="kpi-value">{value}</div><div className="kpi-note">{note}</div></div>
}
function ScanRow({ scan }: { scan: typeof scans[number] }) {
  return <div className="scan-row"><div className={`scan-thumb ${scan.color}`}>{scan.image}</div><div className="scan-name"><strong>{scan.name}</strong><span>{scan.type}</span></div><div className="scan-date">{scan.date}</div><div className="scan-score"><strong>{scan.score}</strong><span>/ 100</span></div><span className={`status ${scan.color}`}>{scan.color === 'green' ? '●' : scan.color === 'amber' ? '●' : '●'} {scan.status}</span><button className="icon-button"><MoreHorizontal size={17} /></button></div>
}
function Legend({ color, label, value }: { color: string; label: string; value: string }) { return <div className="legend-row"><i className={color} /> <span>{label}</span><strong>{value}</strong></div> }
