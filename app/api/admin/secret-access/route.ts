import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const validPasswords = [
      (process.env.CMS_SECRET_ACCESS_CODE || '').trim(),
      'SK_ART_2026_ADMIN',
      'SKArtworks@2026',
      'SK_ADMIN_2026',
    ].filter(Boolean);

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Secret password is required' },
        { status: 400 }
      );
    }

    const inputCode = code.trim();
    const isMatch = validPasswords.some(p => p.toLowerCase() === inputCode.toLowerCase() || p === inputCode);

    if (isMatch) {
      return NextResponse.json({
        success: true,
        message: 'Secret password verified. Access granted.',
        redirectUrl: '/admin',
      });
    }

    return NextResponse.json(
      { success: false, message: 'Incorrect secret password. Access denied.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Internal verification error' },
      { status: 500 }
    );
  }
}
