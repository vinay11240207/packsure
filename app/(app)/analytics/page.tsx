'use client'

import { ANALYTICS_DATA } from '@/lib/mock-data'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

export default function AnalyticsPage() {
  const { totalScans, passRate, avgScore, issueRate, scansOverTime, commonIssues, categoryBreakdown } =
    ANALYTICS_DATA

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Compliance Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">
          Historical screening metrics, common labeling failure modes, and category trends.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Scans</div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalScans}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight size={14} /> +24% this month
          </div>
        </div>

        <div className="card p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pass Rate</div>
          <div className="text-2xl font-black text-emerald-600 mt-2">{passRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">186 compliant packages</div>
        </div>

        <div className="card p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Score</div>
          <div className="text-2xl font-black text-blue-600 mt-2">{avgScore}/100</div>
          <div className="text-[11px] text-slate-400 mt-1">Across all product lines</div>
        </div>

        <div className="card p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Potential Issue Rate</div>
          <div className="text-2xl font-black text-rose-600 mt-2">{issueRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">20 packages requiring revisions</div>
        </div>
      </div>

      {/* 2-Column Grid for Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Common Issues Bar Breakdown */}
        <div className="card p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Most Common Packaging Gaps</h2>
              <p className="text-xs text-slate-500">Legal Metrology Rules 2011 violation frequencies</p>
            </div>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>

          <div className="flex flex-col gap-4">
            {commonIssues.map((issue) => (
              <div key={issue.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate pr-2">{issue.label}</span>
                  <span className="text-slate-900 font-bold shrink-0">{issue.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${issue.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screening Volume Trend (Last 6 Months) */}
        <div className="card p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Screening Volume Trend</h2>
              <p className="text-xs text-slate-500">Monthly upload throughput and pass ratio</p>
            </div>
            <TrendingUp size={18} className="text-blue-600" />
          </div>

          <div className="flex items-end justify-between h-48 pt-6 px-4">
            {scansOverTime.map((mo) => {
              const heightPct = Math.round((mo.scans / 80) * 100)
              return (
                <div key={mo.month} className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-600">{mo.scans}</div>
                  <div className="w-8 bg-blue-100 rounded-t-md overflow-hidden flex flex-col justify-end" style={{ height: `${heightPct}%` }}>
                    <div
                      className="w-full bg-blue-600 rounded-t-md transition-all"
                      style={{ height: `${(mo.passed / mo.scans) * 100}%` }}
                      title={`${mo.passed} passed out of ${mo.scans}`}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-slate-500">{mo.month}</div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2 border-t">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Passed Scans
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-blue-100 inline-block" /> Total Volume
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-3">Product Category Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categoryBreakdown.map((cat) => (
            <div key={cat.category} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold">{cat.category}</div>
              <div className="text-xl font-black text-slate-900 mt-1">{cat.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
