import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import {
  ArrowLeftRight, Receipt, ConciergeBell, Download, Eye,
  FileText, FileSpreadsheet, FileType, MonitorPlay, Users, FileCheck2, Settings, ShieldCheck, Landmark
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Slice Bank" },
      { name: "description", content: "Your Slice Bank account overview, balances, transactions and quick actions." },
    ],
  }),
  component: Dashboard,
});

const quick = [
  { icon: ArrowLeftRight, title: "Fund Transfer", desc: "Transfer money within Slice Bank or to other banks", cta: "Transfer Now", to: "/transfers" },
  { icon: Receipt, title: "Bill Payments", desc: "Pay your bills and recharges instantly", cta: "Pay Now", to: "/payments" },
  { icon: ConciergeBell, title: "Request Services", desc: "Cheque book, debit card, statement & more", cta: "Request Now", to: "/cards" },
  { icon: Download, title: "Download Statement", desc: "View and download your account statements", cta: "Download", to: "/dashboard" },
];

const txns = [
  { date: "22 May 2024, 09:12 AM", desc: "UPI to Amazon Pay", type: "UPI Payment", amount: -1299, balance: 125680.5 },
  { date: "21 May 2024, 07:45 PM", desc: "Salary Credit", type: "Credit", amount: 85000, balance: 126979.5 },
  { date: "20 May 2024, 11:30 AM", desc: "Swiggy", type: "UPI Payment", amount: -450, balance: 41979.5 },
  { date: "19 May 2024, 06:20 PM", desc: "Electricity Bill", type: "Bill Payment", amount: -1250, balance: 42429.5 },
  { date: "18 May 2024, 10:05 AM", desc: "Money Transfer to Rahul", type: "IMPS", amount: -5000, balance: 43679.5 },
];

const fmt = (n: number) => new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(Math.abs(n));

function Dashboard() {
  return (
    <DashboardLayout showGreeting>
      <div className="grid grid-cols-12 gap-5">
        {/* Balance card */}
        <motion.div whileHover={{ y: -2 }} className="col-span-12 lg:col-span-5 bg-card-gradient rounded-2xl p-6 text-white relative overflow-hidden shadow-card">
          <Landmark className="absolute right-6 top-6 w-28 h-28 text-white/10" />
          <div className="flex items-center gap-2 text-sm">
            <span>Savings Account</span>
            <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-semibold">Primary Account</span>
          </div>
          <div className="text-xs opacity-80 mt-1">XXXX XXXX 1234</div>
          <div className="mt-6 text-xs opacity-90">Available Balance</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-bold">₹1,25,680<span className="text-lg">.50</span></span>
            <Eye className="w-4 h-4 opacity-80" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5 text-xs">
            <div><div className="opacity-80">Total Balance</div><div className="font-semibold text-base">₹1,25,680.50</div></div>
            <div><div className="opacity-80">Uncleared Funds</div><div className="font-semibold text-base">₹0.00</div></div>
          </div>
          <button className="mt-5 px-4 py-2 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90">View Account Details</button>
        </motion.div>

        {/* Quick actions */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quick.map((q) => (
            <motion.div key={q.title} whileHover={{ y: -3 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center mb-3">
                <q.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{q.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{q.desc}</p>
              <Link to={q.to} className="inline-block mt-3 text-xs font-semibold text-primary hover:underline">{q.cta} →</Link>
            </motion.div>
          ))}
        </div>

        {/* Transactions */}
        <div className="col-span-12 lg:col-span-8 bg-card rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">Recent Transactions</h2>
            <a className="text-sm font-semibold text-primary cursor-pointer">View All</a>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left font-medium pb-2">Date</th>
                <th className="text-left font-medium pb-2">Description</th>
                <th className="text-left font-medium pb-2">Type</th>
                <th className="text-right font-medium pb-2">Amount (₹)</th>
                <th className="text-right font-medium pb-2">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((t, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
                  <td className="py-3 text-foreground">{t.date}</td>
                  <td className="py-3 text-foreground">{t.desc}</td>
                  <td className="py-3 text-muted-foreground">{t.type}</td>
                  <td className={`py-3 text-right font-medium ${t.amount < 0 ? "text-destructive" : "text-success"}`} style={{ color: t.amount < 0 ? "var(--destructive)" : "var(--success)" }}>
                    {t.amount < 0 ? "-" : "+"}{fmt(t.amount)}
                  </td>
                  <td className="py-3 text-right text-foreground">{fmt(t.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-4">
            <a className="text-sm font-semibold text-primary cursor-pointer">View All Transactions →</a>
          </div>
        </div>

        {/* Download statement */}
        <div className="col-span-12 lg:col-span-4 bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="font-bold text-foreground">Download Statement</h2>
          <p className="text-xs text-muted-foreground mt-1 mb-4">Select account and period to download your statement</p>
          <label className="text-xs text-muted-foreground">Account</label>
          <select className="w-full mt-1 mb-3 px-3 py-2 rounded-lg border border-border text-sm bg-white">
            <option>Savings Account - XXXX XXXX 1234</option>
          </select>
          <label className="text-xs text-muted-foreground">Select Period</label>
          <select className="w-full mt-1 mb-4 px-3 py-2 rounded-lg border border-border text-sm bg-white">
            <option>May 2024</option><option>April 2024</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            {[
              { Icon: FileType, label: "PDF", sub: "Download PDF" },
              { Icon: FileSpreadsheet, label: "Excel", sub: "Download Excel" },
              { Icon: FileText, label: "CSV", sub: "Download CSV" },
              { Icon: MonitorPlay, label: "View Online", sub: "View Statement" },
            ].map(({ Icon, label, sub }) => (
              <button key={label} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-accent/40 transition text-left">
                <Icon className="w-5 h-5 text-primary" />
                <div><div className="text-xs font-semibold">{label}</div><div className="text-[10px] text-muted-foreground">{sub}</div></div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-4 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Your statement password will be your DOB (DDMMYYYY)
          </p>
        </div>

        {/* Account summary */}
        <div className="col-span-12 lg:col-span-8 bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="font-bold text-foreground mb-4">Account Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              ["Account Type", "Savings Account"],
              ["Account Number", "XXXX XXXX 1234"],
              ["IFSC Code", "SLBK0001234"],
              ["Branch", "Bangalore - Main Branch"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="font-medium text-foreground mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="font-bold text-foreground mb-3">Quick Links</h2>
          <ul className="divide-y divide-border">
            {[
              { icon: Users, label: "Manage Beneficiaries" },
              { icon: FileCheck2, label: "View Cheque Status" },
              { icon: ConciergeBell, label: "Service Requests" },
              { icon: Settings, label: "Debit Card Controls" },
            ].map(({ icon: I, label }) => (
              <li key={label} className="flex items-center justify-between py-3 cursor-pointer hover:text-primary text-sm">
                <span className="flex items-center gap-3"><I className="w-4 h-4 text-primary" /> {label}</span>
                <span className="text-muted-foreground">›</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
