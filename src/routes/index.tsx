import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Keyboard, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Slice Bank Internet Banking" },
      { name: "description", content: "Secure internet banking login for Slice Bank customers." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (username.length > 0 && password.length > 0) {
      timer.current = setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => navigate({ to: "/dashboard" }), 1400);
      }, 1000);
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [username, password, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar */}
      <header className="border-b border-border bg-secondary/40 px-6 py-3 flex items-center gap-4">
        <span className="text-2xl font-bold text-primary tracking-tight">slice</span>
        <span className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-destructive text-destructive-foreground grid place-items-center text-xs font-bold">N</div>
          <span className="text-xs font-bold text-destructive leading-tight">North East<br/>Small Finance Bank</span>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[1.4fr_1fr]">
        {/* Left illustration */}
        <div className="relative bg-login-gradient overflow-hidden hidden lg:flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: 40 + i * 20, height: 40 + i * 20,
                left: `${(i * 13) % 80}%`, top: `${(i * 17) % 70}%`,
              }}
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <svg viewBox="0 0 400 360" className="w-[28rem] max-w-full drop-shadow-2xl">
              <defs>
                <linearGradient id="bldg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#5cc4ff" /><stop offset="1" stopColor="#2b8edd" />
                </linearGradient>
              </defs>
              <circle cx="290" cy="90" r="60" fill="#ff6b6b" opacity="0.9"/>
              <circle cx="340" cy="60" r="28" fill="#ff8888" opacity="0.7"/>
              <circle cx="120" cy="240" r="70" fill="#6c5ce7" opacity="0.35"/>
              <rect x="80" y="290" width="180" height="22" rx="4" fill="#7c4dff" opacity="0.9"/>
              <polygon points="200,80 100,160 300,160" fill="url(#bldg)"/>
              <rect x="100" y="160" width="200" height="20" fill="#3aa0e0"/>
              {[0,1,2,3,4].map(i => (
                <rect key={i} x={115 + i*36} y={180} width={22} height={90} rx={3} fill="#5cc4ff" opacity="0.9"/>
              ))}
              <rect x="100" y="270" width="200" height="20" fill="#3aa0e0"/>
              <circle cx="320" cy="220" r="30" fill="none" stroke="#a8d8f0" strokeWidth="6"/>
              <rect x="40" y="120" width="40" height="6" rx="3" fill="#7ed957"/>
              <rect x="40" y="140" width="60" height="6" rx="3" fill="#7ed957"/>
            </svg>
          </motion.div>
        </div>

        {/* Right login */}
        <div className="flex items-center justify-center px-6 py-10 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-sm"
          >
            <h1 className="text-3xl font-bold text-destructive mb-8 tracking-wide">LOGIN</h1>

            <Field icon={<User className="w-4 h-4" />} label="User Name">
              <input
                value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="ENTER USER NAME"
                className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition placeholder:text-muted-foreground/60 text-sm"
              />
            </Field>
            <p className="text-xs text-right mt-1 mb-4 text-muted-foreground">Forgot Username? <a className="text-primary font-semibold cursor-pointer">Click Here</a></p>

            <Field icon={<Lock className="w-4 h-4" />} label="Password">
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER PASSWORD"
                className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition placeholder:text-muted-foreground/60 text-sm"
              />
            </Field>
            <p className="text-xs text-right mt-1 mb-4 text-muted-foreground">Forgot password? <a className="text-primary font-semibold cursor-pointer">Click Here</a></p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Keyboard className="w-4 h-4" /> Click to open the virtual keyboard
            </div>
            <div className="bg-white border border-border rounded-md py-3 mb-2 grid place-items-center select-none"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, #eee 0 2px, transparent 2px 6px)" }}>
              <span className="text-2xl font-bold italic tracking-widest text-foreground line-through decoration-2">DWadByz</span>
            </div>
            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Type the text shown above"
              className="w-full px-4 py-2.5 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm mb-4" />

            <button
              onClick={() => { if (username && password) { setShowSuccess(true); setTimeout(() => navigate({ to: "/dashboard" }), 1400); } }}
              className="w-full py-3 rounded-md bg-destructive text-destructive-foreground font-semibold hover:brightness-110 active:scale-[0.99] transition shadow-soft mb-3"
            >Login</button>
            <button className="w-full py-3 rounded-md bg-destructive text-destructive-foreground font-semibold hover:brightness-110 transition shadow-soft">New User Sign Up</button>
            <p className="text-center text-sm mt-6 text-destructive font-medium underline cursor-pointer">Terms and Conditions</p>
          </motion.div>
        </div>
      </div>

      <footer className="bg-destructive text-destructive-foreground text-center text-sm py-2">
        © 2026 North East Small Finance Bank. All Rights Reserved
      </footer>

      <AnimatePresence>
        {showSuccess && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl px-10 py-8 shadow-card text-center max-w-sm">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}
                className="mx-auto w-16 h-16 rounded-full bg-success/15 grid place-items-center mb-4">
                <CheckCircle2 className="w-10 h-10" style={{ color: "var(--success)" }} />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">Login Successful</h3>
              <p className="text-sm text-muted-foreground mt-2">Redirecting to your dashboard…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
        <span className="text-muted-foreground">{icon}</span>{label}
      </div>
      {children}
    </div>
  );
}
