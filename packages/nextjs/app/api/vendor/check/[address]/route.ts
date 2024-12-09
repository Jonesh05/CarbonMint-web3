// app/api/vendor/check/[address]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  
  try {
    // Aquí iría la lógica para verificar si el vendor existe
    // Por ahora retornamos un mock
    return NextResponse.json({ 
      isRegistered: false 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error checking vendor status" },
      { status: 500 }
    );
  }
}