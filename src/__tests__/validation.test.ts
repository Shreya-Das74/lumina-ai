import { validatePayload } from "../lib/validation";

describe("Input Validation (Zod Schema)", () => {
  it("accepts valid payload", () => {
    const payload = {
      prospectName: "David",
      company: "Stripe",
      context: "David recently tweeted about cloud infrastructure costs.",
    };
    const result = validatePayload(payload);
    expect(result.success).toBe(true);
  });

  it("rejects missing fields", () => {
    const payload = {
      prospectName: "David",
    };
    const result = validatePayload(payload);
    expect(result.success).toBe(false);
  });

  it("rejects short strings to prevent bad inputs", () => {
    const payload = {
      prospectName: "D",
      company: "S",
      context: "Short",
    };
    const result = validatePayload(payload);
    expect(result.success).toBe(false);
  });

  it("rejects extra long context to prevent abuse", () => {
    const payload = {
      prospectName: "David",
      company: "Stripe",
      context: "a".repeat(5001),
    };
    const result = validatePayload(payload);
    expect(result.success).toBe(false);
  });
});
