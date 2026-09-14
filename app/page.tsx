'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Layers,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <ShieldCheck size={18} strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-black tracking-tight text-base text-white">PackSure</span>
              <span className="text-[10px] text-blue-400 font-bold ml-1.5 px-1.5 py-0.5 rounded bg-blue-950 border border-blue-800">
                AI COMPLIANCE
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#regulations" className="hover:text-white transition">
              Legal Metrology Scope
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition"
              style={{ textDecoration: 'none' }}
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
              style={{ textDecoration: 'none' }}
            >
              Launch Platform <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles size={14} /> AI-Assisted Preliminary Packaging Compliance
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Scan. Verify. <span className="text-blue-500">Comply.</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Turn product packaging artwork into an explainable preliminary compliance report in
            seconds. Automatically detect mandatory declarations, cross-reference Legal Metrology
            Rules, and inspect visual Heatmaps.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/scan/new"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition"
              style={{ textDecoration: 'none' }}
            >
              <ScanLine size={17} /> Scan Product Now
            </Link>
            <Link
              href="/scan/demo"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition"
              style={{ textDecoration: 'none' }}
            >
              <Layers size={17} /> View Live Heatmap Demo
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" /> Legal Metrology (PC) Rules 2011
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" /> Bounding Box Compliance Heatmap
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" /> Exportable Audit Reports
            </span>
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Pipeline */}
      <section id="how-it-works" className="py-20 bg-slate-900/40 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Automated Screening Pipeline
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              From Raw Packaging to Verified Findings
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              PackSure AI integrates OCR, structured extraction, and regulatory intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Upload Packaging</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload one or multiple package sides (front, back, side, bottom) in high resolution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-900/40 text-purple-400 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-white">OCR &amp; Extraction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                PaddleOCR detects text elements and localized bounding box coordinates across panels.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-900/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Regulatory RAG</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies relevant Legal Metrology rules (MRP, Net Qty, Helpline, Batch, Address).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-900/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h4 className="text-sm font-bold text-white">Heatmap &amp; Report</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Highlights issues directly on the package mockup and generates an audit PDF report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Core Capabilities</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Built for Modern Packaging Compliance Teams
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <Layers className="text-blue-400" size={24} />
            <h4 className="text-base font-bold text-white">Compliance Heatmap</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No guesswork. Interactive bounding box overlays show exactly where mandatory
              declarations pass (🟢), need review (🟡), or are missing (🔴).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <BookOpen className="text-emerald-400" size={24} />
            <h4 className="text-base font-bold text-white">Verified Regulatory RAG</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Grounds evaluations directly in the Legal Metrology (Packaged Commodities) Rules 2011,
              citing exact Rule numbers and requirements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <FileCheck2 className="text-purple-400" size={24} />
            <h4 className="text-base font-bold text-white">Explainable Audit Reports</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates executive summary PDF reports complete with confidence scores, OCR
              transcriptions, and actionable pre-press guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Responsible AI Disclaimer Banner */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-900 flex items-start gap-4 text-xs text-slate-300">
          <ShieldAlert className="text-blue-400 shrink-0 mt-0.5" size={20} />
          <div>
            <strong className="text-white block mb-1">
              Responsible AI Statement — Preliminary Screening Scope
            </strong>
            PackSure AI provides preliminary automated screening assistance for manufacturers,
            packagers, and retailers. It is designed to catch oversights before costly print runs. It
            does not constitute a legally binding statutory certificate or legal warranty.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 PackSure AI • Scan. Verify. Comply.</p>
      </footer>
    </div>
  )
}
