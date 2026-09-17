/**
 * Demo / seed data used when the backend API is unavailable.
 * All data is fictional and created purely for UI demonstration.
 */

import { AnalyticsData, Scan, ScanSummary } from './types'

// ---------------------------------------------------------------------------
// Scan History (list view)
// ---------------------------------------------------------------------------
export const DEMO_HISTORY: ScanSummary[] = [
  {
    id: 'demo',
    productName: 'Sunrise Oats Premium Muesli',
    category: 'Packaged Food',
    score: 72,
    status: 'NEEDS_REVIEW',
    createdAt: '15 Sep 2026',
    thumb: 'SO',
  },
  {
    id: 'scan-002',
    productName: 'AquaPure Mineral Water 1L',
    category: 'Beverage',
    score: 94,
    status: 'PASS',
    createdAt: '14 Sep 2026',
    thumb: 'AQ',
  },
  {
    id: 'scan-003',
    productName: 'GlowUp Face Cream SPF 30',
    category: 'Cosmetic',
    score: 58,
    status: 'POTENTIAL_ISSUE',
    createdAt: '13 Sep 2026',
    thumb: 'GF',
  },
  {
    id: 'scan-004',
    productName: 'CleanPro Dishwash Liquid',
    category: 'Household',
    score: 88,
    status: 'PASS',
    createdAt: '12 Sep 2026',
    thumb: 'CP',
  },
  {
    id: 'scan-005',
    productName: 'HerbalRoot Shampoo 400ml',
    category: 'Personal Care',
    score: 66,
    status: 'NEEDS_REVIEW',
    createdAt: '11 Sep 2026',
    thumb: 'HR',
  },
  {
    id: 'scan-006',
    productName: 'CrunchBite Potato Chips',
    category: 'Packaged Food',
    score: 91,
    status: 'PASS',
    createdAt: '10 Sep 2026',
    thumb: 'CB',
  },
  {
    id: 'scan-007',
    productName: 'FreshBrew Green Tea 100g',
    category: 'Packaged Food',
    score: 45,
    status: 'POTENTIAL_ISSUE',
    createdAt: '09 Sep 2026',
    thumb: 'FB',
  },
  {
    id: 'scan-008',
    productName: 'PureSkin Body Lotion',
    category: 'Personal Care',
    score: 79,
    status: 'NEEDS_REVIEW',
    createdAt: '08 Sep 2026',
    thumb: 'PS',
  },
  {
    id: 'scan-009',
    productName: 'HomeBrew Apple Juice 500ml',
    category: 'Beverage',
    score: 97,
    status: 'PASS',
    createdAt: '07 Sep 2026',
    thumb: 'HB',
  },
  {
    id: 'scan-010',
    productName: 'QuickClean Surface Spray',
    category: 'Household',
    score: 53,
    status: 'POTENTIAL_ISSUE',
    createdAt: '06 Sep 2026',
    thumb: 'QC',
  },
]

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------
export const DEMO_ANALYTICS: AnalyticsData = {
  totalScans: 248,
  passRate: 62,
  avgScore: 74,
  issueRate: 18,
  scansOverTime: [
    { month: 'Apr', scans: 28, passed: 16, issues: 4 },
    { month: 'May', scans: 35, passed: 22, issues: 6 },
    { month: 'Jun', scans: 42, passed: 27, issues: 7 },
    { month: 'Jul', scans: 50, passed: 31, issues: 9 },
    { month: 'Aug', scans: 47, passed: 29, issues: 8 },
    { month: 'Sep', scans: 46, passed: 29, issues: 8 },
  ],
  commonIssues: [
    { label: 'Missing Consumer Helpline (Rule 6(1)(h))', percentage: 42, count: 104 },
    { label: 'Faint / Low-contrast MRP Printing', percentage: 21, count: 52 },
    { label: 'Relative Date of Manufacture ("mfg. month/year")', percentage: 19, count: 47 },
    { label: 'Net Quantity Unit Non-Standard', percentage: 11, count: 27 },
    { label: 'Missing Importer / Packer Address', percentage: 7, count: 17 },
  ],
  categoryBreakdown: [
    { category: 'Packaged Food', percentage: 38 },
    { category: 'Personal Care', percentage: 24 },
    { category: 'Beverage', percentage: 19 },
    { category: 'Cosmetic', percentage: 11 },
    { category: 'Household', percentage: 8 },
  ],
}

// ---------------------------------------------------------------------------
// Full Scan — "demo" ID  (Sunrise Oats Muesli)
// ---------------------------------------------------------------------------
export const DEMO_SCAN: Scan = {
  id: 'demo',
  productName: 'Sunrise Oats Premium Muesli',
  category: 'Packaged Food',
  score: 72,
  status: 'NEEDS_REVIEW',
  imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80',
  imageWidth: 800,
  imageHeight: 800,
  createdAt: '15 Sep 2026',
  ocrResults: [
    { text: 'Sunrise Oats Premium Muesli', confidence: 0.98, bbox: [40, 30, 760, 90] },
    { text: 'Net Weight: 500g', confidence: 0.97, bbox: [40, 110, 300, 145] },
    { text: 'MRP Rs. 149 (Incl. of all taxes)', confidence: 0.95, bbox: [40, 155, 400, 190] },
    { text: 'Best Before: 12 months from date of packing', confidence: 0.91, bbox: [40, 205, 540, 240] },
    { text: 'Packed by: Sunrise Foods Pvt. Ltd., 14, Industrial Area, Pune 411 001, Maharashtra, India', confidence: 0.93, bbox: [40, 250, 760, 310] },
    { text: 'Batch No.: SR2026-0915 | Mfg. Date: Sep 2026', confidence: 0.96, bbox: [40, 320, 520, 355] },
    { text: 'FSSAI Lic. No.: 11222334455667', confidence: 0.94, bbox: [40, 365, 380, 400] },
  ],
  extractedData: {
    product_name: 'Sunrise Oats Premium Muesli',
    net_quantity: '500 g',
    mrp: 'Rs.149',
    manufacturer: 'Sunrise Foods Pvt. Ltd.',
    address: '14, Industrial Area, Pune 411 001, Maharashtra, India',
    batch_no: 'SR2026-0915',
    mfg_date: 'Sep 2026',
    best_before: '12 months from date of packing',
    fssai_license: '11222334455667',
    consumer_helpline: '',
  },
  complianceResults: [
    {
      requirementId: 'REQ-001',
      label: 'Product Identity / Name',
      status: 'PASS',
      confidence: 0.98,
      detected: 'Sunrise Oats Premium Muesli',
      reason: 'Product name is prominently printed on the front panel in clear, legible typeface.',
      evidence: 'Sunrise Oats Premium Muesli',
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(a)',
      bbox: [40, 30, 760, 90],
    },
    {
      requirementId: 'REQ-002',
      label: 'Net Quantity Declaration',
      status: 'PASS',
      confidence: 0.97,
      detected: '500 g',
      reason: 'Net weight of 500 g is declared in SI unit on the principal display panel.',
      evidence: 'Net Weight: 500g',
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(b)',
      bbox: [40, 110, 300, 145],
    },
    {
      requirementId: 'REQ-003',
      label: 'Maximum Retail Price (MRP)',
      status: 'PASS',
      confidence: 0.95,
      detected: 'Rs. 149 (Incl. of all taxes)',
      reason: 'MRP printed with Rs. symbol and inclusive tax statement. Print contrast is adequate.',
      evidence: 'MRP Rs. 149 (Incl. of all taxes)',
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(d)',
      bbox: [40, 155, 400, 190],
    },
    {
      requirementId: 'REQ-004',
      label: 'Date of Manufacture & Expiry / Best Before',
      status: 'NEEDS_REVIEW',
      confidence: 0.72,
      detected: 'Best Before: 12 months from date of packing',
      reason: 'Best-before is expressed as a relative duration ("12 months from date of packing") rather than an absolute date (MM/YYYY). This relative format may be non-compliant — Rule 6(1)(e) requires absolute dates for perishable goods. Verify with your regulatory team.',
      evidence: 'Best Before: 12 months from date of packing',
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(e)',
      bbox: [40, 205, 540, 240],
    },
    {
      requirementId: 'REQ-005',
      label: 'Name & Address of Manufacturer / Packer',
      status: 'PASS',
      confidence: 0.93,
      detected: 'Sunrise Foods Pvt. Ltd., 14, Industrial Area, Pune 411 001, Maharashtra, India',
      reason: 'Full name and postal address of packer detected on packaging with pin code.',
      evidence: 'Packed by: Sunrise Foods Pvt. Ltd., 14, Industrial Area, Pune 411 001',
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(c)',
      bbox: [40, 250, 760, 310],
    },
    {
      requirementId: 'REQ-006',
      label: 'Batch / Lot Number',
      status: 'PASS',
      confidence: 0.96,
      detected: 'SR2026-0915',
      reason: 'Batch number SR2026-0915 printed on the back panel in legible font.',
      evidence: 'Batch No.: SR2026-0915',
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(f)',
      bbox: [40, 320, 520, 355],
    },
    {
      requirementId: 'REQ-007',
      label: 'FSSAI License Number',
      status: 'PASS',
      confidence: 0.94,
      detected: '11222334455667',
      reason: 'FSSAI license number present and formatted as 14-digit code.',
      evidence: 'FSSAI Lic. No.: 11222334455667',
      source: 'Food Safety and Standards Act 2006 / FSSAI Regulations',
      sourceSection: 'FSS (Labelling & Display) Regulations 2020 Reg. 4',
      bbox: [40, 365, 380, 400],
    },
    {
      requirementId: 'REQ-008',
      label: 'Consumer Care / Helpline Number',
      status: 'POTENTIAL_ISSUE',
      confidence: 0.1,
      detected: null,
      reason: 'No consumer helpline or grievance contact (phone / email) was detected anywhere on the package. Rule 6(1)(h) mandates a consumer helpline number for all packed commodities. This is the most common cause of labeling non-compliance.',
      evidence: null,
      source: 'Legal Metrology (PC) Rules 2011',
      sourceSection: 'Rule 6(1)(h)',
      bbox: null,
    },
  ],
}

// ---------------------------------------------------------------------------
// Stub scans for other demo IDs
// ---------------------------------------------------------------------------
const STUB_SCANS: Record<string, Scan> = {
  'scan-002': {
    id: 'scan-002',
    productName: 'AquaPure Mineral Water 1L',
    category: 'Beverage',
    score: 94,
    status: 'PASS',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80',
    imageWidth: 800,
    imageHeight: 800,
    createdAt: '14 Sep 2026',
    ocrResults: [],
    extractedData: { product_name: 'AquaPure Mineral Water', net_quantity: '1000 ml', mrp: 'Rs.20' },
    complianceResults: [
      { requirementId: 'REQ-001', label: 'Product Identity / Name', status: 'PASS', confidence: 0.99, detected: 'AquaPure Mineral Water 1L', reason: 'Product name clearly printed on label.', evidence: 'AquaPure Mineral Water 1L', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(a)', bbox: [50, 40, 750, 100] },
      { requirementId: 'REQ-002', label: 'Net Quantity Declaration', status: 'PASS', confidence: 0.98, detected: '1000 ml', reason: 'Volume declared in millilitres as per SI standard.', evidence: 'Net Volume: 1000 ml', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(b)', bbox: [50, 120, 320, 155] },
      { requirementId: 'REQ-003', label: 'Maximum Retail Price (MRP)', status: 'PASS', confidence: 0.97, detected: 'Rs.20 (Incl. of all taxes)', reason: 'MRP clearly printed with inclusive tax statement.', evidence: 'MRP Rs.20 (Incl. of all taxes)', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(d)', bbox: [50, 165, 400, 200] },
      { requirementId: 'REQ-004', label: 'Consumer Care / Helpline Number', status: 'PASS', confidence: 0.95, detected: '1800-123-4567', reason: 'Consumer helpline number prominently displayed.', evidence: 'Consumer Helpline: 1800-123-4567', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(h)', bbox: [50, 210, 400, 245] },
      { requirementId: 'REQ-005', label: 'BIS / ISI Mark (Packaged Drinking Water)', status: 'NEEDS_REVIEW', confidence: 0.68, detected: 'IS 14543', reason: 'BIS mark text detected but mark graphic quality is low. Manual verification recommended.', evidence: 'IS 14543', source: 'BIS IS 14543', sourceSection: 'IS 14543 Packaged Drinking Water Standard', bbox: [600, 700, 760, 780] },
    ],
  },
  'scan-003': {
    id: 'scan-003',
    productName: 'GlowUp Face Cream SPF 30',
    category: 'Cosmetic',
    score: 58,
    status: 'POTENTIAL_ISSUE',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80',
    imageWidth: 800,
    imageHeight: 800,
    createdAt: '13 Sep 2026',
    ocrResults: [],
    extractedData: { product_name: 'GlowUp Face Cream SPF 30', net_quantity: '50 g', mrp: 'Rs.399' },
    complianceResults: [
      { requirementId: 'REQ-001', label: 'Product Identity / Name', status: 'PASS', confidence: 0.97, detected: 'GlowUp Face Cream SPF 30', reason: 'Product name clearly printed.', evidence: 'GlowUp Face Cream SPF 30', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(a)', bbox: [30, 40, 770, 100] },
      { requirementId: 'REQ-002', label: 'Net Quantity Declaration', status: 'PASS', confidence: 0.96, detected: '50 g', reason: 'Net weight declared in grams.', evidence: 'Net Wt: 50 g', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(b)', bbox: [30, 110, 280, 145] },
      { requirementId: 'REQ-003', label: 'Consumer Care / Helpline Number', status: 'POTENTIAL_ISSUE', confidence: 0.08, detected: null, reason: 'No consumer helpline number detected. Mandatory under Rule 6(1)(h).', evidence: null, source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(h)', bbox: null },
      { requirementId: 'REQ-004', label: 'Ingredients List (Cosmetics)', status: 'POTENTIAL_ISSUE', confidence: 0.12, detected: null, reason: 'No complete ingredients list was detected. Cosmetics must declare all ingredients under Cosmetics Rules 2020.', evidence: null, source: 'Drugs and Cosmetics Act 1940 / Cosmetics Rules 2020', sourceSection: 'Schedule Q Labelling of Cosmetics', bbox: null },
      { requirementId: 'REQ-005', label: 'Manufacturer Address', status: 'NEEDS_REVIEW', confidence: 0.61, detected: 'GlowUp Cosm. Pvt. Ltd., Mumbai', reason: 'Abbreviated address detected. Full postal address including pin code required.', evidence: 'GlowUp Cosm. Pvt. Ltd., Mumbai', source: 'Legal Metrology (PC) Rules 2011', sourceSection: 'Rule 6(1)(c)', bbox: [30, 680, 600, 740] },
    ],
  },
}

export function getDemoScan(id: string): Scan {
  if (id === 'demo') return DEMO_SCAN
  if (STUB_SCANS[id]) return STUB_SCANS[id]
  return { ...DEMO_SCAN, id, productName: `Demo Product (${id})` }
}
