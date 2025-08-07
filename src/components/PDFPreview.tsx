'use client'

interface PDFPreviewProps {
  month: string
  onClose: () => void
}

export default function PDFPreview({ month, onClose }: PDFPreviewProps) {
  const pdfUrl = `/api/reports/pdf?month=${month}`

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
          <iframe
            src={pdfUrl}
            title="Laporan PDF"
            width="100%"
            height="500px"
            className="rounded"
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          Preview halaman pertama laporan bulan {month}
        </div>
      </div>
    </div>
  )
}