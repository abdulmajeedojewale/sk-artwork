import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tokenId: string }> }
) {
  const { tokenId } = await params;

  if (!tokenId) {
    return NextResponse.json({ error: 'Unauthorized asset request token' }, { status: 401 });
  }

  // Simulated secure digital asset payload output (e.g. streaming asset package)
  const dummyAssetContent = `SK ARTWORK DIGITAL ASSET BUNDLE
Token Reference: ${tokenId}
Commercial License: Included for client and personal projects.
Asset Package: Cyberpunk 3D Icons & PSD Mockups Suite.
Thank you for supporting SK Artwork!`;

  return new NextResponse(dummyAssetContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="SK_Artwork_Digital_Asset_${tokenId}.zip"`,
    },
  });
}
