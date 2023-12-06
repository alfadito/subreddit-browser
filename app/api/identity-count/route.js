/* Core */
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  const body = await req.json()
  const { amount = 1 } = body

  return NextResponse.json({ data: amount })
}
