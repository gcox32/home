import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const validUsername = process.env.AUTH_USERNAME;
    const validPassword = process.env.AUTH_PASSWORD;

    if (!validUsername || !validPassword) {
      return new NextResponse(JSON.stringify({ error: 'Auth credentials not configured' }), {
        status: 500,
      });
    }

    if (username === validUsername && password === validPassword) {
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Invalid request: ' + error }), {
      status: 400,
    });
  }
}