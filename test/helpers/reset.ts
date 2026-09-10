// Every payments test starts from an empty ledger.
import { clearLedger } from "../../src/ledger/posted-charges";

export async function resetPaymentsState(): Promise<void> {
  await clearLedger();
}
