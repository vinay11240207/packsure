'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getScanById } from '@/lib/mock-data'
import { ArrowLeft, Download, Printer, ShieldCheck } from 'lucide-react'

export default function ReportPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : 'demo'
  const scan = getScanById(id)

  const passedCount = scan.complianceResults.filter((r) => r.status === 'PASS').length
  const reviewCount = scan.complianceResults.filter((r) => r.status === 'NEEDS_REVIEW').length
  const issueCount = scan.complianceResults.filter((r) => r.status === 'POTENTIAL_ISSUE').length

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Top action bar (hidden on print) */}
      <div className="no-print flex items-center justify-between">
        <Link
          href={`/scan/${scan.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft size={16} /> Back to Scan Results
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow flex items-center gap-2 transition"
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="print-report p-8 sm:p-12 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-8">
        {/* Report Header */}
        <div className="flex items-start justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">PACKSURE AI</h1>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Preliminary Packaging Compliance Report
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500">
            <div>
              Report Ref: <span className="font-mono font-bold text-slate-800">PKR-{scan.id.toUpperCase()}</span>
            </div>
            <div>Date: {scan.createdAt}</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">Status: Generated &amp; Verified</div>
          </div>
        </div>

        {/* Product Meta & Overall Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="md:col-span-2 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Product Information
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">{scan.productName}</h2>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div>
                <span className="text-slate-400">Category:</span>{' '}
                <strong className="text-slate-800">{scan.category}</strong>
              </div>
              <div>
                <span className="text-slate-400">Standard:</span>{' '}
                <strong className="text-slate-800">Legal Metrology (PC) Rules 2011</strong>
              </div>
              <div>
                <span className="text-slate-400">Input Image:</span>{' '}
                <strong className="text-slate-800">Product Packaging Artwork</strong>
              </div>
              <div>
                <span className="text-slate-400">Screening Engine:</span>{' '}
                <strong className="text-slate-800">PackSure AI v1.0</strong>
              </div>
            </div>
          </div>

          {/* Score Badge */}
          <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 pl-0 md:pl-6">
            <div className="text-3xl font-black text-slate-900">{scan.score} / 100</div>
            <div className="text-xs font-bold text-slate-500 mt-1">Compliance Score</div>
            <div className="flex items-center gap-2 mt-3 text-[11px] font-bold">
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                🟢 {passedCount} Pass
              </span>
              <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                🟡 {reviewCount} Review
              </span>
              <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                🔴 {issueCount} Issue
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Findings Table */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
            Mandatory Declarations Evaluation
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3">Requirement</th>
                  <th className="p-3">Result</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Detected Value</th>
                  <th className="p-3">Regulatory Section</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {scan.complianceResults.map((item) => (
                  <tr key={item.requirementId}>
                    <td className="p-3 font-bold text-slate-900">{item.label}</td>
                    <td className="p-3">
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'PASS'
                          ? 'Pass'
                          : item.status === 'NEEDS_REVIEW'
                          ? 'Needs Review'
                          : 'Potential Issue'}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-600">
                      {Math.round(item.confidence * 100)}%
                    </td>
                    <td className="p-3 text-slate-700 font-mono text-[11px]">
                      {item.detected || '— [Not Detected] —'}
                    </td>
                    <td className="p-3 text-slate-500">{item.sourceSection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Rationale & Actionable Recommendations */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
            AI Explanation &amp; Recommendations
          </h3>
          <div className="flex flex-col gap-3">
            {scan.complianceResults
              .filter((r) => r.status !== 'PASS')
              .map((item) => (
                <div
                  key={item.requirementId}
                  className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col gap-1.5 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-rose-800">
                    <span>{item.label}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-rose-200/80 px-2 py-0.5 rounded">
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.reason}</p>
                  <div className="text-[11px] text-rose-900 font-semibold mt-1">
                    👉 Action Recommended: Verify artwork with pre-press and Legal Metrology team prior to commercial print run.
                  </div>
                </div>
              ))}

            {issueCount === 0 && reviewCount === 0 && (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium">
                No potential issues or review alerts detected against the configured scope.
              </div>
            )}
          </div>
        </div>

        {/* Responsible AI Disclaimer */}
        <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
          <strong>Notice &amp; Disclaimer: </strong>
          This document represents an AI-assisted preliminary compliance screening generated by PackSure AI.
          It evaluates detectable printed declarations against selected provisions of the Legal Metrology
          (Packaged Commodities) Rules, 2011. This report does NOT constitute a formal legal opinion,
          statutory certification, or guarantee of regulatory compliance.
        </div>
      </div>
    </div>
  )
}
