import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, type Txn } from "@/integrations/supabase/client";

type State = {
  txns: Txn[];
  balance: number;
  loading: boolean;
  error: string | null;
  configured: boolean;
};

const ACCOUNT_REF = (import.meta.env.VITE_ACCOUNT_REFERENCE as string) || "033311501069501";

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
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("account_reference", ACCOUNT_REF)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (!mounted) return;
      if (error) {
        setState((s) => ({ ...s, loading: false, error: error.message }));
        return;
      }
      const txns = (data ?? []) as Txn[];
      setState({
        txns,
        balance: txns[0]?.balance_after_transaction ?? 0,
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
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
          filter: `account_reference=eq.${ACCOUNT_REF}`,
        },
        (payload) => {
          const t = payload.new as Txn;
          setState((s) => {
            if (s.txns.some((x) => x.id === t.id)) return s;
            const next = [t, ...s.txns].slice(0, limit);
            return { ...s, txns: next, balance: t.balance_after_transaction };
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
