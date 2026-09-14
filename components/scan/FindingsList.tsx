'use client'

import { useState } from 'react'
import { ComplianceResult } from '@/lib/types'
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react'

interface FindingsListProps {
  results: ComplianceResult[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

export default function FindingsList({
  results,
  selectedId,
  onSelect,
}: FindingsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    selectedId || results.find((r) => r.status === 'POTENTIAL_ISSUE')?.requirementId || results[0]?.requirementId || null
  )

  const toggle = (id: string) => {
    const next = expandedId === id ? null : id
    setExpandedId(next)
    if (next && onSelect) onSelect(next)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-sm font-bold text-slate-800">Compliance Findings</h3>
        <span className="text-xs text-slate-500 font-medium">{results.length} checks performed</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {results.map((item) => {
          const isExpanded = expandedId === item.requirementId
          const statusIcon =
            item.status === 'PASS' ? (
              <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
            ) : item.status === 'NEEDS_REVIEW' ? (
              <AlertTriangle className="text-amber-500 shrink-0" size={18} />
            ) : (
              <AlertCircle className="text-rose-600 shrink-0" size={18} />
            )

          const statusColor =
            item.status === 'PASS'
              ? 'border-emerald-200 bg-emerald-50/40'
              : item.status === 'NEEDS_REVIEW'
              ? 'border-amber-200 bg-amber-50/40'
              : 'border-rose-200 bg-rose-50/40'

          return (
            <div
              key={item.requirementId}
              className={`rounded-xl border transition-all duration-200 bg-white shadow-sm overflow-hidden ${
                isExpanded ? `${statusColor} ring-1 ring-blue-400` : 'hover:border-slate-300'
              }`}
            >
              {/* Header item */}
              <button
                type="button"
                onClick={() => toggle(item.requirementId)}
                className="w-full text-left p-3.5 flex items-center gap-3 cursor-pointer"
              >
                {statusIcon}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {item.label}
                    </span>
                    <span
                      className={`status-badge ${item.status}`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {item.detected ? `Detected: ${item.detected}` : 'Not detected on packaging'}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400 shrink-0" />
                )}
              </button>

              {/* Collapsible Details Panel */}
              {isExpanded && (
                <div className="p-3.5 pt-0 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-700 bg-white/60">
                  {/* AI Explanation Box */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-indigo-700 font-semibold mb-1 text-[11px]">
                      <Sparkles size={14} /> AI Analysis &amp; Rationale
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {item.reason}
                    </p>
                  </div>

                  {/* Evidence snippet */}
                  {item.evidence && (
                    <div className="text-[11px]">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                        Detected Evidence:
                      </span>
                      <p className="mt-0.5 font-mono text-[11px] bg-slate-100 p-2 rounded text-slate-800">
                        {item.evidence}
                      </p>
                    </div>
                  )}

                  {/* Regulatory Citation */}
                  <div className="flex items-start gap-1.5 text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <BookOpen size={13} className="shrink-0 mt-0.5 text-slate-400" />
                    <div>
                      <span className="font-semibold text-slate-600">{item.source}</span>
                      <div className="text-slate-400">{item.sourceSection}</div>
                    </div>
                    <span className="ml-auto font-semibold text-slate-600">
                      Conf: {Math.round(item.confidence * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
