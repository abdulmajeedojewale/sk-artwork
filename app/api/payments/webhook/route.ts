import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/factory';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature') || req.headers.get('verif-hash') || '';
    const providerHeader = req.headers.get('x-paystack-signature') ? 'paystack' : 'flutterwave';

    const provider = getPaymentProvider(providerHeader);

    // Verify webhook signature
    const isValidSignature = provider.verifyWebhookSignature(rawBody, signature);
    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Paystack charge.success or Flutterwave successful event handling
    if (payload.event === 'charge.success' || payload['event.type'] === 'CARD_TRANSACTION') {
      const reference = payload.data?.reference || payload.data?.tx_ref;
      
      if (reference) {
        // Trigger payment verification & order status update in database
        await provider.verifyPayment(reference);
      }
    }

    return NextResponse.json({ status: 'success', received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}
