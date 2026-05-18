import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/accounts")({
  head: () => ({ meta: [{ title: "Accounts — Slice Bank" }, { name: "description", content: "Your Slice Bank accounts overview." }] }),
  component: () => (
    <DashboardLayout showGreeting>
      <h1 className="text-2xl font-bold">Accounts</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">Manage your linked accounts</p>
      <div className="bg-card rounded-2xl p-8 shadow-card border border-border text-center text-muted-foreground">
        Accounts module coming soon.
      </div>
    </DashboardLayout>
  ),
});
