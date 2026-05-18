import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wallet, ArrowLeftRight, Receipt, CreditCard,
  PiggyBank, Landmark, TrendingUp, Tag, UserCog, HelpCircle, LogOut,
  Bell, Mail
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { RestrictionModal } from "./RestrictionModal";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/accounts", label: "Accounts", icon: Wallet },
  { to: "/transfers", label: "Transfers", icon: ArrowLeftRight },
  { to: "/payments", label: "Payments", icon: Receipt },
  { to: "/cards", label: "Cards", icon: CreditCard },
  { to: "/fixed-deposits", label: "Fixed Deposits", icon: PiggyBank, restricted: "fd" as const },
  { to: "/loans", label: "Loans", icon: Landmark, restricted: "loan" as const },
  { to: "/investments", label: "Investments", icon: TrendingUp, restricted: "invest" as const },
  { to: "/offers", label: "Offers", icon: Tag },
  { to: "/profile", label: "Profile & Settings", icon: UserCog },
  { to: "/help", label: "Help & Support", icon: HelpCircle },
];

type ModalKind = null | "loan" | "fd" | "invest";

export function DashboardLayout({
  children, showGreeting = false,
}: { children: ReactNode; showGreeting?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-[220px] bg-sidebar-gradient text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-6 py-7">
          <div className="text-3xl font-bold tracking-tight italic">slice</div>
          <div className="text-xs tracking-[0.3em] font-semibold opacity-90 mt-0.5">BANK</div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
            const content = (
              <span className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${active ? "bg-white text-primary shadow-md" : "text-white/85 hover:bg-white/10 hover:text-white"}`}>
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                {item.label}
              </span>
            );
            if (item.restricted) {
              return (
                <button key={item.to} onClick={() => setModal(item.restricted)} className="w-full text-left">
                  {content}
                </button>
              );
            }
            return <Link key={item.to} to={item.to}>{content}</Link>;
          })}
        </nav>
        <div className="px-3 pb-6 pt-2 border-t border-white/10 mt-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/85 hover:bg-white/10">
            <LogOut className="w-[18px] h-[18px]" strokeWidth={1.75} /> Log Out
          </Link>
          <div className="px-4 mt-6 text-xs text-white/60">© 2024 Slice Bank.<br/>All rights reserved.</div>
        </div>
      </aside>

      <main className="flex-1 ml-[220px]">
        <header className="px-8 pt-7 pb-4 flex items-start justify-between gap-6">
          <div>
            {showGreeting && (
              <>
                <h1 className="text-2xl font-bold text-foreground">Hello, Rambabu</h1>
                <p className="text-sm text-muted-foreground mt-1">Last login: 22 May 2024, 09:15 AM</p>
              </>
            )}
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition relative">
              <Mail className="w-5 h-5" /> Messages
              <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary" />
            </button>
            <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition">
              <Bell className="w-5 h-5" /> Notifications
              <span className="ml-1 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent text-primary grid place-items-center font-semibold text-sm">RS</div>
            </div>
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="px-8 pb-10">

          {children}
        </motion.div>
      </main>

      <RestrictionModal kind={modal} onClose={() => setModal(null)} />
    </div>
  );
}
