// Synthetic payment processing.
import { postCharge, type PostedCharge } from "../ledger/posted-charges";

export interface PaymentRequest { paymentId: string; idempotencyKey: string; amount: number }

export async function processPayment(input: PaymentRequest): Promise<PostedCharge> {
  return postCharge({ paymentId: input.paymentId, idempotencyKey: input.idempotencyKey, amount: input.amount });
}
