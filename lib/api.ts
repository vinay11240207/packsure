import { AnalyticsData, Scan, ScanSummary } from './types'
import { DEMO_ANALYTICS, DEMO_HISTORY, getDemoScan } from './demo-data'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetchScan(id: string): Promise<Scan> {
  try {
    const res = await fetch(`${API_BASE}/api/scan/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Unable to load scan (${res.status})`)
    return await res.json()
  } catch {
    // Backend unavailable — return demo data
    return getDemoScan(id)
  }
}

export async function fetchHistory(): Promise<ScanSummary[]> {
  try {
    const res = await fetch(`${API_BASE}/api/scan/history`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Unable to load scan history (${res.status})`)
    return await res.json()
  } catch {
    return DEMO_HISTORY
  }
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  try {
    const res = await fetch(`${API_BASE}/api/analytics`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Unable to load analytics (${res.status})`)
    return await res.json()
  } catch {
    return DEMO_ANALYTICS
  }
}

export async function submitScan(files: File[]): Promise<{ id: string }> {
  try {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    const res = await fetch(`${API_BASE}/api/scan`, { method: 'POST', body: formData })
    if (!res.ok) throw new Error('Failed to upload package artwork')
    const data = await res.json()
    if (!data.id) throw new Error('The scan service did not return a scan id')
    return { id: data.id }
  } catch (err) {
    // Backend unavailable — simulate a successful scan with the demo ID
    if (err instanceof Error && err.message.includes('scan service')) throw err
    return { id: 'demo' }
  }
}
