import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help & Support — Slice Bank" }, { name: "description", content: "Get help and support for Slice Bank internet banking." }] }),
  component: () => (
    <DashboardLayout showGreeting>
      <h1 className="text-2xl font-bold">Help & Support</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">We're here to assist you 24x7</p>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { I: Phone, t: "Call Us", v: "1800 572 9999" },
          { I: Mail, t: "Email", v: "support@slice.bank" },
          { I: Clock, t: "Hours", v: "24x7, All Days" },
        ].map(({ I, t, v }) => (
          <div key={t} className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <I className="w-6 h-6 text-primary mb-3" />
            <div className="text-xs text-muted-foreground">{t}</div>
            <div className="font-semibold mt-1">{v}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  ),
});
