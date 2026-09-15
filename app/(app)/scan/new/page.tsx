'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UploadZone from '@/components/scan/UploadZone'
import AnalysisProgress from '@/components/scan/AnalysisProgress'
import { submitScan } from '@/lib/api'
import { Check, Edit3, ShieldAlert, Sparkles } from 'lucide-react'

export default function NewScanPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'upload' | 'analyzing' | 'category_confirm'>('upload')
  const [detectedCategory, setDetectedCategory] = useState('Packaged Food')
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [scanId, setScanId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleStartAnalysis = async (files: File[]) => {
    if (files.length === 0) {
      setErrorMsg('Upload at least one package image or PDF to start screening.')
      return
    }

    setPhase('analyzing')
    setErrorMsg(null)

    try {
      const data = await submitScan(files)
      setScanId(data.id)
    } catch (err) {
      setPhase('upload')
      setErrorMsg(err instanceof Error ? err.message : 'Screening failed. Please try again.')
    }
  }

  const handleAnalysisComplete = () => {
    setPhase('category_confirm')
  }

  const handleProceedToResults = () => {
    if (scanId) router.push(`/scan/${scanId}`)
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Upload Packaging for Compliance Screening
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload crisp images of your package sides to evaluate against Legal Metrology Rules.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {errorMsg}
        </div>
      )}

      {phase === 'upload' && (
        <UploadZone onStartAnalysis={handleStartAnalysis} />
      )}

      {phase === 'analyzing' && (
        <div className="py-8">
          <AnalysisProgress onComplete={handleAnalysisComplete} />
        </div>
      )}

      {phase === 'category_confirm' && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Category Detection Verified
              </h3>
              <p className="text-xs text-slate-500">
                Confirm your product category to apply relevant regulatory rules.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Detected Category
              </span>
              {isEditingCategory ? (
                <select
                  value={detectedCategory}
                  onChange={(e) => {
                    setDetectedCategory(e.target.value)
                    setIsEditingCategory(false)
                  }}
                  className="block mt-1 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded p-1"
                >
                  <option value="Packaged Food">Packaged Food</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Cosmetic">Cosmetic</option>
                  <option value="Household">Household Commodity</option>
                  <option value="Personal Care">Personal Care</option>
                </select>
              ) : (
                <div className="text-sm font-bold text-blue-700 mt-0.5">
                  {detectedCategory}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsEditingCategory(!isEditingCategory)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1"
            >
              <Edit3 size={12} /> {isEditingCategory ? 'Done' : 'Change'}
            </button>
          </div>

          <div className="text-xs text-slate-500 bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-start gap-2">
            <ShieldAlert size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <span>
              Category determines applicable rule sets (Legal Metrology Packaged Commodities Rules 2011, Schedule II standard units, and FSSAI cross-references).
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t">
            <button
              type="button"
              onClick={() => setPhase('upload')}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Back to Upload
            </button>
            <button
              type="button"
              onClick={handleProceedToResults}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <Check size={15} /> Confirm &amp; View Heatmap →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
