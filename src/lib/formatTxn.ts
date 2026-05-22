import type { Txn } from "@/integrations/supabase/client";

const MODES = ["UPI", "IMPS", "NEFT", "RTGS"] as const;
export type PaymentMode = (typeof MODES)[number] | null;

export function detectMode(text: string | null | undefined): PaymentMode {
  if (!text) return null;
  const t = text.toUpperCase();
  for (const m of MODES) if (new RegExp(`\\b${m}\\b`).test(t)) return m;
  return null;
}

const UTR_RE = /(?:ref(?:erence)?\s*(?:id|no\.?|#)?|utr(?:\s*no\.?)?|txn(?:\s*id)?)\s*[:\-]?\s*([A-Z0-9]{6,})/i;
const PAREN_REF_RE = /\(\s*(?:ref(?:erence)?\s*(?:id|no\.?|#)?|utr)\s*[:\-]?\s*([A-Z0-9]{6,})\s*\)/i;

export function extractUtr(text: string | null | undefined): string | null {
  if (!text) return null;
  const m = text.match(PAREN_REF_RE) || text.match(UTR_RE);
  return m ? m[1] : null;
}

// Pull a clean party name from the SMS body, stripping titles, account masks, dates.
function extractParty(text: string, type: "credit" | "debit"): string | null {
  if (!text) return null;
  const t = text.replace(/\s+/g, " ").trim();
  // common patterns
  const patterns = type === "debit"
    ? [
        /\bto\s+(?:mr\.?|ms\.?|mrs\.?|m\/s\.?)?\s*([A-Za-z][A-Za-z .'&-]{2,60}?)(?=\s+(?:on|via|through|using|ref|utr|a\/c|account|dt|\d{1,2}[-/])|[.,(]|$)/i,
      ]
    : [
        /\bfrom\s+(?:mr\.?|ms\.?|mrs\.?|m\/s\.?)?\s*([A-Za-z][A-Za-z .'&-]{2,60}?)(?=\s+(?:on|via|through|using|ref|utr|a\/c|account|dt|\d{1,2}[-/])|[.,(]|$)/i,
        /\bby\s+(?:mr\.?|ms\.?|mrs\.?|m\/s\.?)?\s*([A-Za-z][A-Za-z .'&-]{2,60}?)(?=\s+(?:on|via|through|using|ref|utr|a\/c|account|dt|\d{1,2}[-/])|[.,(]|$)/i,
      ];
  for (const re of patterns) {
    const m = t.match(re);
    if (m) {
      const name = m[1].trim().replace(/\s+/g, " ");
      if (name.length > 1) return name;
    }
  }
  return null;
}

export function formatDescription(txn: Pick<Txn, "type" | "description" | "sender_name">): string {
  const raw = txn.description || "";
  const mode = detectMode(raw);
  const utr = extractUtr(raw);
  const party = extractParty(raw, txn.type) || txn.sender_name || null;

  const verb = txn.type === "credit" ? "credited" : "sent";
  const prep = txn.type === "credit" ? "from" : "to";

  let out: string;
  if (party) {
    out = `${verb} ${prep} ${party}`;
  } else {
    out = txn.type === "credit" ? "Amount credited" : "Amount debited";
  }
  if (mode) out += ` via ${mode}`;
  if (utr) out += ` • UTR: ${utr}`;
  return out;
}
