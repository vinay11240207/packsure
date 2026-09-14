'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Derive breadcrumb label from route
  const getBreadcrumb = () => {
    if (pathname.includes('/dashboard')) return 'Dashboard'
    if (pathname.includes('/scan/new')) return 'New Scan'
    if (pathname.includes('/scan/')) return 'Compliance Results'
    if (pathname.includes('/history')) return 'Scan History'
    if (pathname.includes('/analytics')) return 'Analytics'
    if (pathname.includes('/reports')) return 'Compliance Report'
    return 'Dashboard'
  }

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="main-content flex-1 min-w-0">
        <Topbar breadcrumb={getBreadcrumb()} onOpenMobile={() => setMobileOpen(true)} />
        <div className="page-body">{children}</div>
      </main>
    </div>
  )
}
