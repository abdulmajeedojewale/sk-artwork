import crypto from 'crypto';
import { PaymentProvider, PaymentInitParams, PaymentInitResponse, PaymentVerifyResult } from './interface';

export class PaystackProvider implements PaymentProvider {
  name: 'paystack' = 'paystack';
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY || '';
  }

  async initializePayment(params: PaymentInitParams): Promise<PaymentInitResponse> {
    if (!this.secretKey) {
      // Return dev simulated transaction response
      return {
        success: true,
        authorizationUrl: `${params.callbackUrl}?reference=${params.orderNumber}_dev_ref&status=success`,
        reference: `${params.orderNumber}_dev_ref`,
      };
    }

    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: params.email,
          amount: Math.round(params.amount * 100), // Paystack accepts kobo
          currency: params.currency || 'NGN',
          reference: `${params.orderNumber}_${Date.now()}`,
          callback_url: params.callbackUrl,
          metadata: {
            order_id: params.orderId,
            order_number: params.orderNumber,
            ...params.metadata,
          },
        }),
      });

      const data = await response.json();

      if (!data.status) {
        return {
          success: false,
          reference: '',
          error: data.message || 'Paystack initialization failed',
        };
      }

      return {
        success: true,
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
      };
    } catch (error: any) {
      return {
        success: false,
        reference: '',
        error: error.message || 'Network error during Paystack initialization',
      };
    }
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResult> {
    if (!this.secretKey || reference.includes('_dev_ref')) {
      // Dev mode simulated verification
      return {
        success: true,
        paid: true,
        reference,
        amount: 14500,
        currency: 'NGN',
        gatewayResponse: 'Successful (Simulated Dev)',
      };
    }

    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      const data = await response.json();

      if (!data.status) {
        return {
          success: false,
          paid: false,
          reference,
          amount: 0,
          currency: 'NGN',
          gatewayResponse: data.message || 'Transaction verification failed',
        };
      }

      const isPaid = data.data.status === 'success';

      return {
        success: true,
        paid: isPaid,
        reference: data.data.reference,
        amount: data.data.amount / 100, // convert kobo back to NGN
        currency: data.data.currency,
        gatewayResponse: data.data.gateway_response,
        metadata: data.data.metadata,
        rawPayload: data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        paid: false,
        reference,
        amount: 0,
        currency: 'NGN',
        gatewayResponse: error.message || 'Verification exception',
      };
    }
  }

  verifyWebhookSignature(payload: string | Buffer, signature: string): boolean {
    const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET || this.secretKey;
    if (!webhookSecret) return true; // dev fallback

    const hash = crypto
      .createHmac('sha512', webhookSecret)
      .update(payload)
      .digest('hex');

    return hash === signature;
  }
}
