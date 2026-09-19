// Synthetic payment processing.
import { findByIdempotencyKey, postCharge, type PostedCharge } from "../ledger/posted-charges";

export interface PaymentRequest { paymentId: string; idempotencyKey: string; amount: number }

export async function processPayment(input: PaymentRequest): Promise<PostedCharge> {
  // INC-482: a retry with the same idempotency key returns the charge already posted.
  const existing = await findByIdempotencyKey(input.idempotencyKey);
  if (existing) return existing;
  return postCharge({ paymentId: input.paymentId, idempotencyKey: input.idempotencyKey, amount: input.amount });
}
