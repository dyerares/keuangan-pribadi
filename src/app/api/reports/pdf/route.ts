export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Transaction from '@/models/Transaction'
import puppeteer from 'puppeteer'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') // format: '2025-08'

  await dbConnect()

  // Ambil data transaksi bulan tersebut
  const start = new Date(`${month}-01`)
  const end = new Date(start)
  end.setMonth(end.getMonth() + 1)

  const transactions = await Transaction.find({
    userId: 'demo-user',
    date: { $gte: start, $lt: end }
  }).lean()

  // Hitung total pemasukan, pengeluaran, tabungan
  let income = 0, expense = 0, savings = 0
  transactions.forEach(tx => {
    if (tx.type === 'income') income += tx.amount
    if (tx.type === 'expense') expense += tx.amount
    if (tx.type === 'savings') savings += tx.amount
  })

  // Buat HTML laporan
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Laporan Keuangan Bulan ${month}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>Laporan Keuangan Bulan ${month}</h1>
        <p><strong>Pemasukan:</strong> Rp ${income.toLocaleString('id-ID')}</p>
        <p><strong>Pengeluaran:</strong> Rp ${expense.toLocaleString('id-ID')}</p>
        <p><strong>Tabungan:</strong> Rp ${savings.toLocaleString('id-ID')}</p>
        <h2>Detail Transaksi</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tipe</th>
              <th>Deskripsi</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.map((tx, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${tx.type}</td>
                <td>${tx.description}</td>
                <td>Rp ${tx.amount.toLocaleString('id-ID')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `

  // Generate PDF dari HTML dengan Puppeteer
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="laporan-${month}.pdf"`
    }
  })
}

// Pastikan untuk menginstal puppeteer dengan perintah berikut:
// npm install puppeteer