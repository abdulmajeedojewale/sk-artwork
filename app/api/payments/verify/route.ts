import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/factory';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference') || searchParams.get('trxref') || searchParams.get('transaction_id');
  const provider = searchParams.get('provider') || 'paystack';

  if (!reference) {
    return NextResponse.json({ success: false, error: 'Payment reference missing' }, { status: 400 });
  }

  try {
    const paymentProvider = getPaymentProvider(provider);
    const verification = await paymentProvider.verifyPayment(reference);

    if (!verification.success || !verification.paid) {
      return NextResponse.json({
        success: false,
        paid: false,
        error: verification.gatewayResponse || 'Payment verification failed',
      });
    }

    return NextResponse.json({
      success: true,
      paid: true,
      reference: verification.reference,
      amount: verification.amount,
      currency: verification.currency,
      metadata: verification.metadata,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, paid: false, error: error.message || 'Server verification exception' },
      { status: 500 }
    );
  }
}
