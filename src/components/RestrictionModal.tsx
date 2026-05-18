import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

type Kind = null | "loan" | "fd" | "invest";

const content: Record<Exclude<Kind, null>, { title: string; body: string; cta: string }> = {
  loan: {
    title: "Not Eligible for New Loan",
    body: "We regret to inform you that you are currently not eligible for a new loan request. Kindly visit your home branch for further assistance and verification.",
    cta: "Okay",
  },
  fd: {
    title: "Fixed Deposit Services Unavailable",
    body: "Fixed Deposit creation is temporarily unavailable through internet banking. Please visit your nearest branch for FD-related services.",
    cta: "Understood",
  },
  invest: {
    title: "Investment Access Restricted",
    body: "Online investment services are currently unavailable for your account. Please contact your relationship manager or visit your branch for assistance.",
    cta: "Close",
  },
};

export function RestrictionModal({ kind, onClose }: { kind: Kind; onClose: () => void }) {
  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl px-10 py-9 shadow-card max-w-md w-full text-center relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto w-16 h-16 rounded-full grid place-items-center mb-5 border-2"
              style={{ borderColor: "var(--warning)", color: "var(--warning)" }}>
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{content[kind].title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-7">{content[kind].body}</p>
            <button onClick={onClose}
              className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-95 transition shadow-soft">
              {content[kind].cta}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
