export type ScanStatus = 'PASS' | 'NEEDS_REVIEW' | 'POTENTIAL_ISSUE'
export type ProductCategory = 'Packaged Food' | 'Cosmetic' | 'Household' | 'Personal Care' | 'Beverage' | 'Other'

export interface AnalyticsData {
  totalScans: number
  passRate: number
  avgScore: number
  issueRate: number
  scansOverTime: { month: string; scans: number; passed: number; issues: number }[]
  commonIssues: { label: string; percentage: number; count: number }[]
  categoryBreakdown: { category: string; percentage: number }[]
}

export interface OcrResult {
  text: string
  confidence: number
  bbox: [number, number, number, number]
}

export interface ComplianceResult {
  requirementId: string
  label: string
  status: ScanStatus
  confidence: number
  detected: string | null
  reason: string
  evidence: string | null
  source: string
  sourceSection: string
  bbox: [number, number, number, number] | null
}

export interface Scan {
  id: string
  productName: string
  category: ProductCategory
  score: number
  status: ScanStatus
  imageUrl: string
  imageWidth: number
  imageHeight: number
  createdAt: string
  ocrResults: OcrResult[]
  extractedData: Record<string, string>
  complianceResults: ComplianceResult[]
}

export interface ScanSummary {
  id: string
  productName: string
  category: string
  score: number
  status: ScanStatus
  createdAt: string
  thumb: string
}
