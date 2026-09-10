// A fresh, valid payment request for a test.
import type { PaymentRequest } from "../../src/payments/process-payment";

let next = 0;

export async function paymentFixture(): Promise<{ input: PaymentRequest }> {
  next += 1;
  return { input: { paymentId: `pay_${next}`, idempotencyKey: `key_${next}`, amount: 7800 } };
}
