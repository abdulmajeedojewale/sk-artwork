import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const expectedCode = process.env.CMS_SECRET_ACCESS_CODE || 'SK_ART_2026_ADMIN';

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Access code is required' },
        { status: 400 }
      );
    }

    if (code.trim() === expectedCode.trim()) {
      return NextResponse.json({
        success: true,
        message: 'Secret access granted',
        redirectUrl: '/admin/login',
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid access code' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Internal verification error' },
      { status: 500 }
    );
  }
}
