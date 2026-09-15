'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchHistory } from '@/lib/api'
import { ScanSummary } from '@/lib/types'
import { ScanStatus } from '@/lib/types'
import { ChevronRight, Filter, Plus, Search } from 'lucide-react'

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | ScanStatus>('ALL')
  const [history, setHistory] = useState<ScanSummary[]>([])

  useEffect(() => {
    fetchHistory().then(setHistory).catch(() => setHistory([]))
  }, [])

  const filtered = history.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Scan History</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access previous preliminary packaging screenings and compliance audits.
          </p>
        </div>
        <Link href="/scan/new" className="primary-button" style={{ textDecoration: 'none' }}>
          <Plus size={16} /> New Screening
        </Link>
      </div>

      {/* Filter and search controls */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {(['ALL', 'PASS', 'NEEDS_REVIEW', 'POTENTIAL_ISSUE'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'All Scans' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table list */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Screen Date</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((scan) => (
                <tr
                  key={scan.id}
                  className="hover:bg-slate-50/80 transition group"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-md text-[10px] font-bold text-white flex items-center justify-center shrink-0 ${
                          scan.status === 'PASS'
                            ? 'bg-emerald-600'
                            : scan.status === 'NEEDS_REVIEW'
                            ? 'bg-amber-500'
                            : 'bg-rose-600'
                        }`}
                      >
                        {scan.thumb}
                      </div>
                      <span>{scan.productName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{scan.category}</td>
                  <td className="py-3.5 px-4 text-slate-500">{scan.createdAt}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900">{scan.score}</span>
                    <span className="text-slate-400 text-[10px]"> /100</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`status-badge ${scan.status}`}>
                      {scan.status === 'PASS' ? '● Pass' : scan.status === 'NEEDS_REVIEW' ? '● Review' : '● Issue'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/scan/${scan.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                      style={{ textDecoration: 'none' }}
                    >
                      View Heatmap <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                    No packaging scans found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
