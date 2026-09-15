'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import {
  Activity,
  Bell,
  Box,
  ChevronDown,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { fetchAnalytics, fetchHistory } from '@/lib/api'
import { ScanSummary } from '@/lib/types'

export default function DashboardPage() {
  const [history, setHistory] = useState<ScanSummary[]>([])
  const [analytics, setAnalytics] = useState({ totalScans: 0, passRate: 0, issueRate: 0 })

  useEffect(() => {
    Promise.all([fetchHistory(), fetchAnalytics()]).then(([scans, metrics]) => {
      setHistory(scans)
      setAnalytics(metrics)
    }).catch(() => undefined)
  }, [])

  const passed = history.filter((scan) => scan.status === 'PASS').length
  const review = history.filter((scan) => scan.status === 'NEEDS_REVIEW').length
  const issues = history.filter((scan) => scan.status === 'POTENTIAL_ISSUE').length
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">TUESDAY, SEPTEMBER 15, 2026</p>
          <h1>
            Good morning, Jordan <span>—</span>
          </h1>
          <p className="subheading">
            Here&apos;s your preliminary packaging compliance overview under Legal Metrology Rules.
          </p>
        </div>
        <Link href="/scan/new" className="primary-button" style={{ textDecoration: 'none' }}>
          <Plus size={18} /> Scan a product
        </Link>
      </section>

      <section className="kpi-grid" aria-label="Compliance overview">
        <KpiCard
          label="Products scanned"
          value={String(analytics.totalScans)}
          delta="18.4%"
          note="vs. last month"
          icon={Box}
          tone="blue"
        />
        <KpiCard
          label="Passed"
          value={String(passed)}
          delta="12.8%"
          note="vs. last month"
          icon={ShieldCheck}
          tone="green"
        />
        <KpiCard
          label="Needs review"
          value={String(review)}
          delta="6.2%"
          note="vs. last month"
          icon={Activity}
          tone="amber"
        />
        <KpiCard
          label="Potential issues"
          value={String(issues)}
          delta="2.1%"
          note="vs. last month"
          icon={Bell}
          tone="red"
          negative
        />
      </section>

      <section className="content-grid">
        <div className="card recent-card">
          <div className="card-header">
            <div>
              <h2>Recent scans</h2>
              <p>Your latest compliance screenings</p>
            </div>
            <Link href="/history" className="text-button" style={{ textDecoration: 'none' }}>
              View all <span>→</span>
            </Link>
          </div>
          <div className="scan-list">
            {history.slice(0, 4).map((scan) => (
              <Link
                key={scan.id}
                href={`/scan/${scan.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="scan-row hover:bg-slate-50 transition cursor-pointer">
                  <div
                    className={`scan-thumb ${
                      scan.status === 'PASS'
                        ? 'green'
                        : scan.status === 'NEEDS_REVIEW'
                        ? 'amber'
                        : 'red'
                    }`}
                  >
                    {scan.thumb}
                  </div>
                  <div className="scan-name">
                    <strong>{scan.productName}</strong>
                    <span>{scan.category}</span>
                  </div>
                  <div className="scan-date">{scan.createdAt}</div>
                  <div className="scan-score">
                    <strong>{scan.score}</strong>
                    <span>/ 100</span>
                  </div>
                  <span
                    className={`status ${
                      scan.status === 'PASS'
                        ? 'green'
                        : scan.status === 'NEEDS_REVIEW'
                        ? 'amber'
                        : 'red'
                    }`}
                  >
                    ● {scan.status.replace('_', ' ')}
                  </span>
                  <button className="icon-button" onClick={(e) => e.preventDefault()}>
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
          <div className="table-footer">
            <span>Showing {Math.min(history.length, 4)} of {analytics.totalScans} scans</span>
            <Link href="/history" className="text-blue-600 font-bold text-xs" style={{ textDecoration: 'none' }}>
              Open full history →
            </Link>
          </div>
        </div>

        <div className="right-column">
          <div className="card issues-card">
            <div className="card-header">
              <div>
                <h2>Common issues</h2>
                <p>Legal Metrology compliance breakdown</p>
              </div>
              <button className="icon-button">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="issue-chart">
              <div className="donut">
                <div>
                  <strong>42%</strong>
                  <span>Helpline</span>
                </div>
              </div>
              <div className="legend">
                <Legend color="purple" label="Helpline Missing" value="42%" />
                <Legend color="blue" label="Faint/Low MRP" value="21%" />
                <Legend color="yellow" label="Relative Dates" value="19%" />
              </div>
            </div>
            <div className="issue-footer">
              <span>Most frequent finding</span>
              <strong>Missing Rule 6(1)(h) Consumer Helpline</strong>
            </div>
          </div>

          <div className="card upgrade-card">
            <div className="sparkle-circle">
              <Sparkles size={16} />
            </div>
            <div>
              <h3>AI-Assisted Legal Screening</h3>
              <p>Preliminary automated checks against Legal Metrology Rules 2011.</p>
            </div>
            <Link href="/reports/demo" className="upgrade-button" style={{ textDecoration: 'none' }}>
              Demo Report <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="tip-banner">
        <div className="tip-icon">
          <Sparkles size={17} />
        </div>
        <div>
          <strong>Responsible AI Notice</strong>
          <p>
            PackSure AI provides automated preliminary screening. Final legal interpretation remains
            with your qualified regulatory or compliance authority.
          </p>
        </div>
      </section>
    </>
  )
}

function KpiCard({
  label,
  value,
  delta,
  note,
  icon: Icon,
  tone,
  negative = false,
}: {
  label: string
  value: string
  delta: string
  note: string
  icon: typeof Box
  tone: string
  negative?: boolean
}) {
  return (
    <div className="kpi-card">
      <div className={`kpi-icon ${tone}`}>
        <Icon size={18} />
      </div>
      <div className="kpi-label">
        {label}
        <span className={`trend ${negative ? 'negative' : ''}`}>
          {negative ? '↓' : '↑'} {delta}
        </span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-note">{note}</div>
    </div>
  )
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="legend-row">
      <i className={color} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
