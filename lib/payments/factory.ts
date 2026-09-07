import { PaymentProvider } from './interface';
import { PaystackProvider } from './paystack';
import { FlutterwaveProvider } from './flutterwave';

export function getPaymentProvider(providerName?: string): PaymentProvider {
  const selected = providerName || process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'paystack';

  if (selected.toLowerCase() === 'flutterwave') {
    return new FlutterwaveProvider();
  }

  return new PaystackProvider();
}
