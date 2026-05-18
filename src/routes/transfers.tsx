import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Landmark, Zap, Clock, Building2, Users, BarChart3, History, Download, ShieldCheck, Info } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/transfers")({
  head: () => ({
    meta: [
      { title: "Transfers — Slice Bank" },
      { name: "description", content: "Send money securely via NEFT, IMPS, RTGS or FAME with Slice Bank." },
    ],
  }),
  component: Transfers,
});

const methods = [
  { key: "NEFT", icon: Landmark, desc: "Transfer funds to any bank account using NEFT service. Ideal for non-urgent transactions." },
  { key: "IMPS", icon: Zap, desc: "Instant 24x7 fund transfer using IMPS. Available immediate, 24x7 including holidays." },
  { key: "RTGS", icon: Clock, desc: "Real-time gross settlement for high value transactions. Available during banking hours." },
  { key: "FAME", icon: Building2, desc: "Fast and secure transfer within Slice Bank accounts. Instant and hassle-free transfers." },
];

const recent = [
  { date: "21 May 2024, 10:45 AM", method: "IMPS", name: "Rajesh Kumar", acct: "XXXX XXXX 7890", ifsc: "SBIN0001234", amount: 5000 },
  { date: "20 May 2024, 04:30 PM", method: "NEFT", name: "Amit Verma", acct: "XXXX XXXX 4567", ifsc: "HDFC0009876", amount: 25000 },
  { date: "19 May 2024, 11:20 AM", method: "RTGS", name: "Global Enterprises", acct: "XXXX XXXX 1122", ifsc: "ICIC0001122", amount: 150000 },
  { date: "18 May 2024, 02:15 PM", method: "FAME", name: "Rambabu Current", acct: "XXXX XXXX 1234", ifsc: "(Within Slice Bank)", amount: 10000 },
];

const tagColor: Record<string, string> = {
  IMPS: "bg-green-100 text-green-700", NEFT: "bg-purple-100 text-purple-700",
  RTGS: "bg-blue-100 text-blue-700", FAME: "bg-amber-100 text-amber-700",
};

function Transfers() {
  const [tab, setTab] = useState("NEFT");
  return (
    <DashboardLayout showGreeting>
      <h1 className="text-2xl font-bold">Transfers</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">Choose a transfer method to send money securely</p>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 space-y-5">
          <div className="bg-card rounded-2xl border border-border shadow-card">
            <div className="flex border-b border-border">
              {methods.map((m) => (
                <button key={m.key} onClick={() => setTab(m.key)}
                  className={`flex-1 py-4 text-sm font-semibold transition relative ${tab === m.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {m.key}
                  {tab === m.key && <motion.div layoutId="tabline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
              {methods.map((m) => (
                <motion.div key={m.key} whileHover={{ y: -3 }}
                  className={`p-5 rounded-xl border text-center transition ${tab === m.key ? "border-primary/40 bg-accent/40" : "border-border bg-card"}`}>
                  <div className="mx-auto w-12 h-12 rounded-full bg-accent text-primary grid place-items-center mb-3">
                    <m.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm">{m.key}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
                  <button className="mt-3 text-xs font-semibold text-primary hover:underline">Transfer Now →</button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Recent Transfers</h2>
              <a className="text-sm font-semibold text-primary cursor-pointer">View All</a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left font-medium pb-2">Date & Time</th>
                  <th className="text-left font-medium pb-2">Method</th>
                  <th className="text-left font-medium pb-2">Beneficiary</th>
                  <th className="text-left font-medium pb-2">Account / IFSC</th>
                  <th className="text-right font-medium pb-2">Amount (₹)</th>
                  <th className="text-right font-medium pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                    <td className="py-3">{r.date}</td>
                    <td className="py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${tagColor[r.method]}`}>{r.method}</span></td>
                    <td className="py-3">{r.name}</td>
                    <td className="py-3 text-xs"><div>{r.acct}</div><div className="text-muted-foreground">{r.ifsc}</div></td>
                    <td className="py-3 text-right text-foreground">{new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(r.amount)}</td>
                    <td className="py-3 text-right"><span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-semibold">Successful</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">Slice Bank Internet Banking is safe, secure and easy to use. Do not share your password, OTP or card details with anyone.</p>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h3 className="font-bold mb-3">Quick Actions</h3>
            <ul className="divide-y divide-border">
              {[{i: Users, l: "Manage Beneficiaries"}, {i: BarChart3, l: "View Transfer Limits"}, {i: History, l: "Transaction History"}, {i: Download, l: "Download Statement"}].map(({i: I, l}) => (
                <li key={l} className="flex items-center justify-between py-3 text-sm cursor-pointer hover:text-primary">
                  <span className="flex items-center gap-3"><I className="w-4 h-4 text-primary" /> {l}</span>
                  <span className="text-muted-foreground">›</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-6 border border-accent bg-accent/40">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-primary">Transfer Limits</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Set and manage your daily transfer limits for secure banking.</p>
                <button className="mt-3 text-xs font-semibold text-primary hover:underline">Manage Limits →</button>
              </div>
              <ShieldCheck className="w-10 h-10 text-primary/70" />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h3 className="font-bold flex items-center gap-2"><Info className="w-4 h-4 text-primary" /> Important Note</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Ensure correct account details before initiating any transfer. Transactions once processed cannot be cancelled.</p>
            <button className="mt-3 text-xs font-semibold text-primary hover:underline">Know More →</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
