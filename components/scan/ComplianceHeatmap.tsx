'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ComplianceResult } from '@/lib/types'
import { Eye, Layers, ZoomIn } from 'lucide-react'

interface ComplianceHeatmapProps {
  imageUrl: string
  imageWidth: number
  imageHeight: number
  results: ComplianceResult[]
  selectedId?: string | null
  onSelectFinding?: (id: string) => void
}

export default function ComplianceHeatmap({
  imageUrl,
  imageWidth = 400,
  imageHeight = 600,
  results,
  selectedId,
  onSelectFinding,
}: ComplianceHeatmapProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [hoveredBox, setHoveredBox] = useState<ComplianceResult | null>(null)

  // Filter results that have valid bounding boxes
  const boxes = results.filter((r) => r.bbox && r.bbox.length === 4)

  return (
    <div className="flex flex-col gap-3">
      {/* Heatmap Controls Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showOverlay
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            {showOverlay ? <Layers size={14} /> : <Eye size={14} />}
            {showOverlay ? 'Heatmap Overlay Active' : 'Show Heatmap'}
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 font-semibold text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Pass
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Review
          </span>
          <span className="flex items-center gap-1 font-semibold text-rose-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Issue
          </span>
        </div>
      </div>

      {/* Heatmap Visual Canvas */}
      <div className="heatmap-container relative mx-auto shadow-lg" style={{ maxWidth: '100%', width: imageWidth, height: 'auto', aspectRatio: `${imageWidth} / ${imageHeight}` }}>
        <img
          src={imageUrl}
          alt="Product packaging analysis"
          className="w-full h-full object-contain block"
        />

        {/* Bounding Box Overlays */}
        {showOverlay &&
          boxes.map((res) => {
            if (!res.bbox) return null
            const [x1, y1, x2, y2] = res.bbox
            const left = `${(x1 / imageWidth) * 100}%`
            const top = `${(y1 / imageHeight) * 100}%`
            const width = `${((x2 - x1) / imageWidth) * 100}%`
            const height = `${((y2 - y1) / imageHeight) * 100}%`
            const isSelected = selectedId === res.requirementId
            const isHovered = hoveredBox?.requirementId === res.requirementId

            return (
              <div
                key={res.requirementId}
                className={`heatmap-box ${res.status} ${
                  isSelected || isHovered ? 'ring-2 ring-white scale-105 z-20' : ''
                }`}
                style={{ left, top, width, height }}
                onClick={() => onSelectFinding?.(res.requirementId)}
                onMouseEnter={() => setHoveredBox(res)}
                onMouseLeave={() => setHoveredBox(null)}
              >
                <div
                  className={`absolute -top-6 left-0 text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap z-30 pointer-events-none transition ${
                    res.status === 'PASS'
                      ? 'bg-emerald-600 text-white'
                      : res.status === 'NEEDS_REVIEW'
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {res.label.split(' ')[0]}
                </div>
              </div>
            )
          })}

        {/* Hovered Box Quick Info Tooltip */}
        {hoveredBox && (
          <div
            className="absolute bottom-3 left-3 right-3 bg-slate-900/95 text-white p-3 rounded-xl shadow-2xl backdrop-blur border border-slate-700 text-xs z-30 animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            <div className="flex items-center justify-between mb-1">
              <strong className="text-white text-sm">{hoveredBox.label}</strong>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  hoveredBox.status === 'PASS'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : hoveredBox.status === 'NEEDS_REVIEW'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {hoveredBox.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-1.5">{hoveredBox.reason}</p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
              <span>Ref: {hoveredBox.sourceSection}</span>
              <span>Confidence: {Math.round(hoveredBox.confidence * 100)}%</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-500 italic mt-1">
        Hover over or click any colored region to inspect its compliance rule and evidence.
      </p>
    </div>
  )
}
