// EverRule protection for ER-INC-482, case same_request_same_key_twice.
// Rendered by vitest-renderer v1 from Test Intent ER-TI-INC-482-5 (sha256:20322c8f1118694a0e9d0660d186846e7344f10c4876dc86904e24dfbad330ca).
// Generated once and frozen by test.sha256 once approved. Do not edit: a change is an amendment by pull request.
import { beforeEach, describe, expect, test } from "vitest";
import { listPostedCharges } from "../../../src/ledger/posted-charges";
import { processPayment } from "../../../src/payments/process-payment";
import { paymentFixture } from "../../helpers/payment-fixture";
import { resetPaymentsState } from "../../helpers/reset";

describe("ER-INC-482", () => {
  beforeEach(async () => {
    await resetPaymentsState();
  });

  test("same_request_same_key_twice", async () => {
    const setup = await paymentFixture();
    const before = (await listPostedCharges(setup.input.paymentId)).length;
    expect(before, "initial_count").toBe(0);
    await processPayment(setup.input);
    const afterFirst = (await listPostedCharges(setup.input.paymentId)).length;
    expect(afterFirst, "first_count").toBe(1);
    await processPayment(setup.input); // the same request, the same identity
    const afterRepeat = (await listPostedCharges(setup.input.paymentId)).length;
    expect(afterRepeat, "repeat_count").toBe(1);
  });
});
