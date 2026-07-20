import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface VisitorCounterProps {
  className?: string;
}

const VisitorCounter = ({ className = "" }: VisitorCounterProps) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchVisitorCount = async () => {
      const BASE_COUNT = 1420; // Base count baseline
      const STORAGE_KEY = "portfolio_visitor_count";
      const VISITED_SESSION_KEY = "has_visited_session";

      let currentLocalCount = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      if (!currentLocalCount || currentLocalCount < BASE_COUNT) {
        currentLocalCount = BASE_COUNT;
      }

      // Check session to increment count locally for new visits
      const hasVisited = sessionStorage.getItem(VISITED_SESSION_KEY);
      if (!hasVisited) {
        currentLocalCount += 1;
        localStorage.setItem(STORAGE_KEY, currentLocalCount.toString());
        sessionStorage.setItem(VISITED_SESSION_KEY, "true");
      }

      // 1. Try CounterAPI (Global real-time database)
      try {
        const response = await fetch(
          "https://api.counterapi.dev/v1/nomaddiwakar-portfolio/visits/up",
          { cache: "no-store" }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.count === "number" && isMounted) {
            const apiCount = Math.max(data.count + BASE_COUNT, currentLocalCount);
            setVisitorCount(apiCount);
            setIsLive(true);
            localStorage.setItem(STORAGE_KEY, apiCount.toString());
            return;
          }
        }
      } catch {
        // Continue to secondary fallback if CounterAPI is blocked
      }

      // 2. Try CodeTabs Counter API (Secondary global API)
      try {
        const response = await fetch(
          "https://api.codetabs.com/v1/counter?key=nomaddiwakar-portfolio",
          { cache: "no-store" }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.count === "number" && isMounted) {
            const apiCount = Math.max(data.count + BASE_COUNT, currentLocalCount);
            setVisitorCount(apiCount);
            setIsLive(true);
            localStorage.setItem(STORAGE_KEY, apiCount.toString());
            return;
          }
        }
      } catch {
        // Fallback to local storage count
      }

      if (isMounted) {
        setVisitorCount(currentLocalCount);
        setIsLive(false);
      }
    };

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-3 rounded-full border dark:border-cyan-500/30 border-cyan-500/20 dark:bg-slate-950/80 bg-white/90 px-4 py-2 text-xs font-mono backdrop-blur-xl shadow-lg hover:border-cyan-400/50 transition-all ${className}`}
    >
      <div className="flex items-center gap-1.5 text-cyan-400">
        <Users size={15} />
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">
          Total Visitors:
        </span>
        <span className="font-bold text-sm text-cyan-400">
          {visitorCount !== null ? visitorCount.toLocaleString() : "..."}
        </span>
      </div>

      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400 font-semibold border border-emerald-500/20">
        {isLive ? "LIVE" : "REALTIME"}
      </span>
    </motion.div>
  );
};

export default VisitorCounter;
