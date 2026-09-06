import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/factory';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, orderNumber, email, amount, provider, callbackUrl } = body;

    if (!orderNumber || !email || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required checkout transaction details' },
        { status: 400 }
      );
    }

    const paymentProvider = getPaymentProvider(provider);
    const result = await paymentProvider.initializePayment({
      orderId: orderId || 'ord_demo',
      orderNumber,
      email,
      amount,
      callbackUrl: callbackUrl || `${req.nextUrl.origin}/checkout/confirmation/${orderNumber}`,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      authorizationUrl: result.authorizationUrl,
      reference: result.reference,
      provider: paymentProvider.name,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Payment initialization error' },
      { status: 500 }
    );
  }
}
