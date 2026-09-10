import { beforeEach, describe, expect, test } from "vitest";
import { listPostedCharges } from "../../src/ledger/posted-charges";
import { processPayment } from "../../src/payments/process-payment";
import { paymentFixture } from "../helpers/payment-fixture";
import { resetPaymentsState } from "../helpers/reset";

describe("processPayment", () => {
  beforeEach(async () => {
    await resetPaymentsState();
  });

  test("posts one charge for a new payment", async () => {
    const setup = await paymentFixture();
    await processPayment(setup.input);
    const charges = await listPostedCharges(setup.input.paymentId);
    expect(charges.length).toBe(1);
  });
});
