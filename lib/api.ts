import { Scan, ScanSummary } from './types'
import { DEMO_SCAN, SCAN_HISTORY, getScanById, ANALYTICS_DATA } from './mock-data'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetchScan(id: string): Promise<Scan> {
  try {
    const res = await fetch(`${API_BASE}/api/scan/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch {
    // Fallback to local mock data
    return getScanById(id)
  }
}

export async function fetchHistory(): Promise<ScanSummary[]> {
  try {
    const res = await fetch(`${API_BASE}/api/scan/history`, { cache: 'no-store' })
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch {
    return SCAN_HISTORY
  }
}

export async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/api/analytics`, { cache: 'no-store' })
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch {
    return ANALYTICS_DATA
  }
}

export async function submitScan(files: File[]): Promise<{ id: string }> {
  try {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    const res = await fetch(`${API_BASE}/api/scan`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to upload')
    const data = await res.json()
    return { id: data.id || 'demo' }
  } catch {
    // Return demo scan on mock/offline
    return { id: 'demo' }
  }
}
