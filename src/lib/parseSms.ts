export type ParsedSms = {
  amount: number;
  type: "credit" | "debit";
  sender_name: string | null;
  description: string;
};

const AMOUNT_RE = /(?:rs\.?|inr|₹)\s*([0-9,]+(?:\.[0-9]{1,2})?)/i;
const CREDIT_RE = /\b(credited|credit|received|deposited|cr)\b/i;
const DEBIT_RE = /\b(debited|debit|withdrawn|paid|spent|sent|dr)\b/i;
const SENDER_RE = /(?:from|by|to)\s+([A-Z][A-Za-z0-9 ._-]{1,40})/;

export function parseSms(raw: string): ParsedSms | null {
  if (!raw || typeof raw !== "string") return null;
  const text = raw.replace(/\s+/g, " ").trim();

  const m = text.match(AMOUNT_RE);
  if (!m) return null;
  const amount = Number(m[1].replace(/,/g, ""));
  if (!isFinite(amount) || amount <= 0) return null;

  const isCredit = CREDIT_RE.test(text);
  const isDebit = DEBIT_RE.test(text);
  if (!isCredit && !isDebit) return null;
  const type: "credit" | "debit" = isCredit && !isDebit ? "credit" : "debit";

  const s = text.match(SENDER_RE);
  const sender_name = s?.[1]?.trim() ?? null;

  return { amount, type, sender_name, description: text.slice(0, 240) };
}
