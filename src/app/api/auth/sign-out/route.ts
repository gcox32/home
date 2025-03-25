import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
  });
}