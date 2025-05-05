// client/app/api/auth/route.js
import { NextResponse } from 'next/server'
import api from '../../../lib/api'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    // Forward the request to your Express backend
    const response = await api.post('/auth/login', { email, password })
    
    // Return the response from your backend
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Login failed' },
      { status: error.response?.status || 500 }
    )
  }
}