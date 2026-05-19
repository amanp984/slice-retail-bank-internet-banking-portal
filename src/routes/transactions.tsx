import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ChevronLeft, ChevronRight, Search, Download } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/transactions")({
  head: () => ({ meta: [{ title: "Transaction History — Slice Bank" }] }),
  component: TransactionsPage,
});

type Txn = { date: string; desc: string; type: string; amount: number; balance: number; status: "Success" | "Pending" | "Failed" };

const data: Txn[] = [
  { date: "25 Dec 2025, 09:12 AM", desc: "UPI to Amazon Pay", type: "UPI Payment", amount: -1299, balance: 125680.5, status: "Success" },
  { date: "24 Dec 2025, 06:40 PM", desc: "Swiggy Order", type: "UPI Payment", amount: -589, balance: 126979.5, status: "Success" },
  { date: "23 Dec 2025, 11:20 AM", desc: "Salary Credit", type: "Credit", amount: 85000, balance: 127568.5, status: "Success" },
  { date: "22 Dec 2025, 02:08 PM", desc: "Electricity Bill", type: "Bill Payment", amount: -2150, balance: 42568.5, status: "Success" },
  { date: "21 Dec 2025, 10:15 AM", desc: "IMPS Transfer to Rahul", type: "IMPS", amount: -7500, balance: 44718.5, status: "Success" },
  { date: "20 Dec 2025, 07:45 PM", desc: "ATM Withdrawal", type: "ATM", amount: -5000, balance: 52218.5, status: "Success" },
  { date: "19 Dec 2025, 08:30 AM", desc: "POS - Reliance Fresh", type: "POS", amount: -2840, balance: 57218.5, status: "Success" },
  { date: "18 Dec 2025, 03:25 PM", desc: "GST Payment", type: "Tax", amount: -12500, balance: 60058.5, status: "Success" },
  { date: "17 Dec 2025, 12:10 PM", desc: "NEFT to Vijay Builders", type: "NEFT", amount: -45000, balance: 72558.5, status: "Success" },
  { date: "16 Dec 2025, 09:05 AM", desc: "Interest Credit", type: "Credit", amount: 312.5, balance: 117558.5, status: "Success" },

  { date: "15 Dec 2025, 06:30 PM", desc: "Zomato Order", type: "UPI Payment", amount: -460, balance: 117246, status: "Success" },
  { date: "14 Dec 2025, 11:45 AM", desc: "Mobile Recharge - Jio", type: "Bill Payment", amount: -399, balance: 117706, status: "Success" },
  { date: "13 Dec 2025, 04:20 PM", desc: "RTGS to Supplier", type: "RTGS", amount: -250000, balance: 118105, status: "Success" },
  { date: "12 Dec 2025, 02:00 PM", desc: "Cheque Deposit", type: "Credit", amount: 180000, balance: 368105, status: "Success" },
  { date: "11 Dec 2025, 09:18 AM", desc: "Insurance Premium", type: "Bill Payment", amount: -8400, balance: 188105, status: "Success" },
  { date: "10 Dec 2025, 07:55 PM", desc: "BookMyShow", type: "UPI Payment", amount: -640, balance: 196505, status: "Success" },
  { date: "09 Dec 2025, 03:10 PM", desc: "IMPS from Neha", type: "IMPS", amount: 5000, balance: 197145, status: "Success" },
  { date: "08 Dec 2025, 10:40 AM", desc: "POS - HP Petrol Pump", type: "POS", amount: -2000, balance: 192145, status: "Success" },
  { date: "07 Dec 2025, 08:20 AM", desc: "DTH Recharge - Tata Sky", type: "Bill Payment", amount: -499, balance: 194145, status: "Success" },
  { date: "06 Dec 2025, 06:15 PM", desc: "Amazon Refund", type: "Credit", amount: 1299, balance: 194644, status: "Success" },

  { date: "05 Dec 2025, 12:30 PM", desc: "UPI to Sunita Agarwal", type: "UPI Payment", amount: -3500, balance: 193345, status: "Success" },
  { date: "04 Dec 2025, 09:50 AM", desc: "Water Bill - BMC", type: "Bill Payment", amount: -780, balance: 196845, status: "Success" },
  { date: "03 Dec 2025, 04:45 PM", desc: "POS - Croma", type: "POS", amount: -18999, balance: 197625, status: "Success" },
  { date: "02 Dec 2025, 11:25 AM", desc: "NEFT Credit - Client", type: "NEFT", amount: 75000, balance: 216624, status: "Success" },
  { date: "01 Dec 2025, 08:10 AM", desc: "EMI - Auto Debit", type: "Auto Debit", amount: -15750, balance: 141624, status: "Success" },
  { date: "30 Nov 2025, 07:30 PM", desc: "Big Bazaar", type: "POS", amount: -3240, balance: 157374, status: "Success" },
  { date: "29 Nov 2025, 02:50 PM", desc: "UPI to Maid", type: "UPI Payment", amount: -4500, balance: 160614, status: "Success" },
  { date: "28 Nov 2025, 11:00 AM", desc: "Gas Bill - MGL", type: "Bill Payment", amount: -1140, balance: 165114, status: "Success" },
  { date: "27 Nov 2025, 10:20 AM", desc: "ATM Withdrawal", type: "ATM", amount: -10000, balance: 166254, status: "Success" },
  { date: "26 Nov 2025, 06:00 PM", desc: "UPI to Auto Driver", type: "UPI Payment", amount: -180, balance: 176254, status: "Success" },
];

const fmt = (n: number) => new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(Math.abs(n));

function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const pageSize = 10;

  const filtered = useMemo(() =>
    data.filter((t) => t.desc.toLowerCase().includes(q.toLowerCase()) || t.type.toLowerCase().includes(q.toLowerCase())),
    [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DashboardLayout showGreeting={false}>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-sm text-muted-foreground mt-1">View all your past transactions</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm border border-border rounded-lg hover:bg-secondary font-medium">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-5 mt-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search transactions"
              className="pl-9 pr-3 py-2 text-sm border border-border rounded-lg w-64 focus:outline-none focus:border-primary"
            />
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-3">Date</th>
                <th className="text-left font-medium py-3">Description</th>
                <th className="text-left font-medium py-3">Type</th>
                <th className="text-right font-medium py-3">Amount (₹)</th>
                <th className="text-right font-medium py-3">Balance (₹)</th>
                <th className="text-right font-medium py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((t, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                  <td className="py-3 text-foreground whitespace-nowrap">{t.date}</td>
                  <td className="py-3 text-foreground">{t.desc}</td>
                  <td className="py-3 text-muted-foreground">{t.type}</td>
                  <td className="py-3 text-right font-medium" style={{ color: t.amount < 0 ? "var(--destructive)" : "var(--success)" }}>
                    {t.amount < 0 ? "-" : "+"}{fmt(t.amount)}
                  </td>
                  <td className="py-3 text-right text-foreground">{fmt(t.balance)}</td>
                  <td className="py-3 text-right">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-green-100 text-green-700">{t.status}</span>
                  </td>
                </tr>
              ))}
              {slice.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">No transactions found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-md border border-border grid place-items-center hover:bg-secondary disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-md text-sm font-semibold ${
                  page === n ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-md border border-border grid place-items-center hover:bg-secondary disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
