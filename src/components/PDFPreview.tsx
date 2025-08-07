'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PDFPreviewProps {
  month: string
  onClose: () => void
}

export default function PDFPreview({ month, onClose }: PDFPreviewProps) {
  const pdfUrl = `/api/reports/pdf?month=${month}`
  const [numPages, setNumPages] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-600">Preview Laporan PDF</h2>
        <div className="border rounded bg-gray-50 p-2 flex justify-center min-h-[300px]">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages)
              setError(null)
            }}
            onLoadError={err => setError('Gagal memuat PDF')}
            loading={<div className="text-center py-8 text-gray-400">Memuat PDF...</div>}
            error={<div className="text-center py-8 text-red-500">Gagal memuat PDF</div>}
          >
            {!error && <Page pageNumber={1} width={500} />}
          </Document>
          {error && <div className="text-center py-8 text-red-500">{error}</div>}
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          Preview halaman pertama laporan bulan {month}
        </div>
      </div>
    </div>
  )
}