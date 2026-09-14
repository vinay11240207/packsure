'use client'

import { useState, useRef } from 'react'
import { Camera, Image as ImageIcon, Trash2, Upload, AlertCircle } from 'lucide-react'

interface UploadZoneProps {
  onStartAnalysis: (files: File[]) => void
}

type PackageSide = 'Front' | 'Back' | 'Side' | 'Bottom'

export default function UploadZone({ onStartAnalysis }: UploadZoneProps) {
  const [activeSide, setActiveSide] = useState<PackageSide>('Front')
  const [filesBySide, setFilesBySide] = useState<Record<PackageSide, File | null>>({
    Front: null,
    Back: null,
    Side: null,
    Bottom: null,
  })
  const [previews, setPreviews] = useState<Record<PackageSide, string | null>>({
    Front: null,
    Back: null,
    Side: null,
    Bottom: null,
  })
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, or WebP).')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image exceeds 10MB limit.')
      return
    }
    setError(null)
    const url = URL.createObjectURL(file)
    setFilesBySide((prev) => ({ ...prev, [activeSide]: file }))
    setPreviews((prev) => ({ ...prev, [activeSide]: url }))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const removeFile = (side: PackageSide) => {
    setFilesBySide((prev) => ({ ...prev, [side]: null }))
    setPreviews((prev) => ({ ...prev, [side]: null }))
  }

  const handleDemoPreset = () => {
    // Fast track demo preset
    onStartAnalysis([])
  }

  const totalUploaded = Object.values(filesBySide).filter(Boolean).length

  const handleProceed = () => {
    const uploaded = Object.values(filesBySide).filter((f): f is File => f !== null)
    onStartAnalysis(uploaded)
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Side Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200">
        {(['Front', 'Back', 'Side', 'Bottom'] as PackageSide[]).map((side) => {
          const hasFile = !!filesBySide[side]
          const isSelected = activeSide === side
          return (
            <button
              key={side}
              type="button"
              onClick={() => setActiveSide(side)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                isSelected
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{side} side</span>
              {hasFile && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              )}
            </button>
          )
        })}
      </div>

      {/* Main Upload Drop Box */}
      <div
        className={`dropzone p-8 flex flex-col items-center justify-center text-center relative ${
          dragActive ? 'active' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !previews[activeSide] && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {previews[activeSide] ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 max-h-72 w-full max-w-sm bg-slate-900 shadow">
              <img
                src={previews[activeSide]!}
                alt={`${activeSide} preview`}
                className="w-full h-full object-contain max-h-72"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(activeSide)
                }}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow"
                title="Remove image"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {filesBySide[activeSide]?.name} ({((filesBySide[activeSide]?.size || 0) / 1024).toFixed(0)} KB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <Upload size={26} strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Drop your <span className="text-blue-600">{activeSide}</span> package image here
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm flex items-center gap-2"
              >
                <ImageIcon size={14} /> Browse Files
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  cameraInputRef.current?.click()
                }}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm flex items-center gap-2"
              >
                <Camera size={14} /> Take Photo
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-rose-600 text-xs p-3 rounded-lg bg-rose-50 border border-rose-200">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Action CTA & Quick Demo Loader */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t">
        <div className="text-xs text-slate-500">
          {totalUploaded > 0
            ? `${totalUploaded} side${totalUploaded > 1 ? 's' : ''} ready for compliance screening`
            : 'No image uploaded yet. You can also load our sample packaging:'}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDemoPreset}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            ⚡ Load Sample Package
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow transition"
          >
            Analyze Package →
          </button>
        </div>
      </div>
    </div>
  )
}
