'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('jordan@acmeconsumer.com')
  const [password, setPassword] = useState('••••••••••••')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login demo session
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-100">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2.5 mb-4" style={{ textDecoration: 'none' }}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-white">PackSure AI</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Welcome back</h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your packaging compliance workspace
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-4 shadow-xl"
        >
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-[11px] text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-2.5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 transition"
          >
            Sign In to Dashboard <ArrowRight size={14} />
          </button>

          <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Demo credentials pre-filled. Click Sign In to proceed.
          </div>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-400 font-bold hover:underline">
            Register your team
          </Link>
        </p>
      </div>
    </div>
  )
}
