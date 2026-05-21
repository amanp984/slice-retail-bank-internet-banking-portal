import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type Txn } from "@/integrations/supabase/client";

type State = {
  txns: Txn[];
  balance: number;
  loading: boolean;
  error: string | null;
  configured: boolean;
};

// Optional account filter. If unset, the dashboard shows ALL transactions
// in the table (works regardless of which account_reference the webhook used).
const ACCOUNT_REF = (import.meta.env.VITE_ACCOUNT_REFERENCE as string | undefined) || "";

export function useTransactions(limit = 50) {
  const [state, setState] = useState<State>({
    txns: [],
    balance: 0,
    loading: true,
    error: null,
    configured: isSupabaseConfigured,
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    let mounted = true;

    const load = async () => {
      let q = supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (ACCOUNT_REF) q = q.eq("account_reference", ACCOUNT_REF);

      const { data, error } = await q;

      if (!mounted) return;
      if (error) {
        // eslint-disable-next-line no-console
        console.error("[useTransactions] load error:", error);
        setState((s) => ({ ...s, loading: false, error: error.message }));
        return;
      }
      const txns = (data ?? []) as Txn[];
      setState({
        txns,
        balance: Number(txns[0]?.balance_after_transaction ?? 0),
        loading: false,
        error: null,
        configured: true,
      });
    };

    load();

    const channel = supabase
      .channel("public:transactions")
      .on(
        "postgres_changes",
        ACCOUNT_REF
          ? {
              event: "INSERT",
              schema: "public",
              table: "transactions",
              filter: `account_reference=eq.${ACCOUNT_REF}`,
            }
          : { event: "INSERT", schema: "public", table: "transactions" },
        (payload) => {
          const t = payload.new as Txn;
          setState((s) => {
            if (s.txns.some((x) => x.id === t.id)) return s;
            const next = [t, ...s.txns].slice(0, limit);
            return { ...s, txns: next, balance: Number(t.balance_after_transaction ?? s.balance) };
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [limit]);

  return state;
}
