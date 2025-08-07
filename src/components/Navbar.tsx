'use client'

import Link from 'next/link'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Import PDFPreview secara dinamis agar tidak error SSR
const PDFPreview = dynamic(() => import('./PDFPreview'), { ssr: false })

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPDF, setShowPDF] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth())

  // Dropdown bulan (dummy, bisa diganti dari API)
  const months = [
    { value: '2025-07', label: 'Juli 2025' },
    { value: '2025-08', label: 'Agustus 2025' },
    { value: '2025-09', label: 'September 2025' },
  ]
  function getCurrentMonth() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            💰 Keuangan Pribadi
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Dashboard
            </Link>
            <Link 
              href="/transactions" 
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Transaksi
            </Link>
            {/* Tombol Laporan PDF */}
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
              onClick={() => setShowPDF(true)}
            >
              Laporan PDF
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-blue-600 hover:border-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/transactions" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Transaksi
              </Link>
              {/* Tombol Laporan PDF Mobile */}
              <button
                type="button"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
                onClick={() => {
                  setIsMenuOpen(false)
                  setShowPDF(true)
                }}
              >
                Laporan PDF
              </button>
            </div>
          </div>
        )}

        {/* Modal PDF Preview */}
        {showPDF && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setShowPDF(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-blue-600">Preview Laporan PDF</h2>
              <div className="mb-4">
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                  Pilih Bulan
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                >
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <PDFPreview month={selectedMonth} onClose={() => setShowPDF(false)} />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
