import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  return NextResponse.json({ isRegistered: false });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ success: true });
}