import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Info, X } from "lucide-react";

export type InfoModalVariant = "warning" | "info";

export function InfoModal({
  open,
  onClose,
  title,
  message,
  cta = "Okay",
  variant = "warning",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  cta?: string;
  variant?: InfoModalVariant;
}) {
  const Icon = variant === "info" ? Info : AlertCircle;
  const accent = variant === "info" ? "var(--primary)" : "var(--warning)";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl border border-border max-w-sm w-full p-6 text-center relative"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="mx-auto w-12 h-12 rounded-full grid place-items-center mb-4 border-2"
              style={{ borderColor: accent, color: accent }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{message}</p>
            <button
              onClick={onClose}
              className="w-full px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition shadow-sm"
            >
              {cta}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
