export interface PaymentInitParams {
  orderId: string;
  orderNumber: string;
  email: string;
  amount: number; // in NGN
  currency?: string;
  callbackUrl: string;
  metadata?: Record<string, any>;
}

export interface PaymentInitResponse {
  success: boolean;
  authorizationUrl?: string;
  reference: string;
  error?: string;
}

export interface PaymentVerifyResult {
  success: boolean;
  paid: boolean;
  reference: string;
  amount: number;
  currency: string;
  gatewayResponse?: string;
  metadata?: Record<string, any>;
  rawPayload?: any;
}

export interface PaymentProvider {
  name: 'paystack' | 'flutterwave';
  initializePayment(params: PaymentInitParams): Promise<PaymentInitResponse>;
  verifyPayment(reference: string): Promise<PaymentVerifyResult>;
  verifyWebhookSignature(payload: string | Buffer, signature: string): boolean;
}
