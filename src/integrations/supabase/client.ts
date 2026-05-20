import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in your Vercel env vars."
  );
}

export const supabase = createClient(url ?? "http://localhost", anon ?? "public-anon-key", {
  auth: { persistSession: false },
  realtime: { params: { eventsPerSecond: 10 } },
});

export type Txn = {
  id: string;
  created_at: string;
  amount: number;
  type: "credit" | "debit";
  sender_name: string | null;
  description: string | null;
  balance_after_transaction: number;
  account_reference: string | null;
};

export const isSupabaseConfigured = Boolean(url && anon);
