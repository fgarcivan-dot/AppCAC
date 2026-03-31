"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BentoCard({ title, subtitle, icon: Icon, badge, className, children }: BentoCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex flex-col gap-3 rounded-3xl bg-surface p-5 border border-white/5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-[10px] font-black tracking-widest text-white/40 uppercase">
            {title}
          </h4>
          {subtitle && (
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-wider">
              {subtitle}
            </span>
          )}
        </div>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-primary group-active:text-white transition-colors">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="flex-1">
        {children}
      </div>

      {badge && (
        <div className="absolute right-4 top-4 flex h-5 items-center justify-center rounded-full bg-success/20 px-3 py-1 font-black text-[8px] tracking-[0.2em] text-success uppercase">
          {badge}
        </div>
      )}
    </motion.div>
  );
}
