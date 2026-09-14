'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getScanById } from '@/lib/mock-data'
import { Scan } from '@/lib/types'
import ComplianceHeatmap from '@/components/scan/ComplianceHeatmap'
import FindingsList from '@/components/scan/FindingsList'
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  HelpCircle,
  Share2,
} from 'lucide-react'

export default function ScanResultsPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : 'demo'

  const [scan, setScan] = useState<Scan>(getScanById(id))
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null)

  useEffect(() => {
    setScan(getScanById(id))
  }, [id])

  const passedCount = scan.complianceResults.filter((r) => r.status === 'PASS').length
  const reviewCount = scan.complianceResults.filter((r) => r.status === 'NEEDS_REVIEW').length
  const issueCount = scan.complianceResults.filter((r) => r.status === 'POTENTIAL_ISSUE').length

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
            title="Back to dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{scan.productName}</h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                {scan.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Screened {scan.createdAt} • Legal Metrology (PC) Rules 2011 scope
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/reports/${scan.id}`}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow flex items-center gap-2 transition"
            style={{ textDecoration: 'none' }}
          >
            <FileText size={15} /> Generate PDF Report
          </Link>
        </div>
      </div>

      {/* Score and summary banners */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 flex items-center gap-4 bg-gradient-to-br from-white to-slate-50">
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center font-black text-xl border-4 border-amber-400 bg-white shadow-sm text-slate-900">
            {scan.score}
            <span className="text-[9px] text-slate-400 font-bold block absolute bottom-1">/100</span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Compliance Score
            </div>
            <div className="text-sm font-black text-slate-900 mt-0.5">
              {scan.score >= 90
                ? 'High Compliance'
                : scan.score >= 70
                ? 'Review Required'
                : 'Action Needed'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Preliminary automated score</div>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{passedCount} Passed</div>
            <div className="text-xs text-slate-500">Satisfies verified rules</div>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{reviewCount} Needs Review</div>
            <div className="text-xs text-slate-500">Low confidence or vague date</div>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle size={20} />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{issueCount} Potential Issue</div>
            <div className="text-xs text-slate-500">Mandatory rule not detected</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Heatmap on Left, Findings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Heatmap Viewer */}
        <div className="lg:col-span-6 card p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Compliance Heatmap</h2>
              <p className="text-xs text-slate-500">
                Visual overlay mapping detected text bounding boxes to rule results
              </p>
            </div>
          </div>

          <ComplianceHeatmap
            imageUrl={scan.imageUrl}
            imageWidth={scan.imageWidth}
            imageHeight={scan.imageHeight}
            results={scan.complianceResults}
            selectedId={selectedFindingId}
            onSelectFinding={(reqId) => setSelectedFindingId(reqId)}
          />
        </div>

        {/* Right Column: Findings Breakdown List */}
        <div className="lg:col-span-6 card p-5">
          <FindingsList
            results={scan.complianceResults}
            selectedId={selectedFindingId}
            onSelect={(reqId) => setSelectedFindingId(reqId)}
          />

          {/* Responsible AI Callout */}
          <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <HelpCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-slate-800">Responsible AI Disclosure: </strong>
              PackSure AI highlights potential labeling gaps against configured Legal Metrology
              guidelines. It does not replace official statutory inspection by legal metrology
              officers or accredited certification bodies.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
