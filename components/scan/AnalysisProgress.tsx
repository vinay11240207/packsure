'use client'

import { useEffect, useState } from 'react'
import { Check, Loader2, Sparkles } from 'lucide-react'

interface AnalysisProgressProps {
  onComplete: () => void
}

const steps = [
  { id: 1, label: 'Image received & quality validated' },
  { id: 2, label: 'Detecting product packaging boundaries' },
  { id: 3, label: 'Reading packaging text with OCR' },
  { id: 4, label: 'Extracting mandatory declarations' },
  { id: 5, label: 'Identifying product category (Packaged Food)' },
  { id: 6, label: 'Retrieving Legal Metrology Rules (RAG)' },
  { id: 7, label: 'Evaluating compliance & calculating score' },
  { id: 8, label: 'Generating compliance heatmap & report' },
]

export default function AnalysisProgress({ onComplete }: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(onComplete, 600)
          return prev
        }
      })
    }, 450)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
          <Sparkles className="animate-spin" size={24} style={{ animationDuration: '3s' }} />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          Screening Packaging Compliance...
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          PackSure AI is processing label declarations and regulatory requirements.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          const isDone = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 text-xs transition-all duration-200 ${
                isDone
                  ? 'text-emerald-700 font-semibold'
                  : isCurrent
                  ? 'text-blue-700 font-bold'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : isCurrent
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? (
                  <Check size={12} strokeWidth={3} />
                ) : isCurrent ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  step.id
                )}
              </div>
              <span className="truncate">{step.label}</span>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
