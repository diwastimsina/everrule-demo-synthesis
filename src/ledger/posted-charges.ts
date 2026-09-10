// Synthetic in-memory ledger of posted charges.
export interface PostedCharge { id: string; paymentId: string; idempotencyKey: string; amount: number }

const posted: PostedCharge[] = [];

export async function postCharge(charge: Omit<PostedCharge, "id">): Promise<PostedCharge> {
  const row = { ...charge, id: `ch_${posted.length + 1}` };
  posted.push(row);
  return row;
}

export async function listPostedCharges(paymentId: string): Promise<PostedCharge[]> {
  return posted.filter((c) => c.paymentId === paymentId);
}

export async function findByIdempotencyKey(key: string): Promise<PostedCharge | undefined> {
  return posted.find((c) => c.idempotencyKey === key);
}

export async function clearLedger(): Promise<void> {
  posted.length = 0;
}
