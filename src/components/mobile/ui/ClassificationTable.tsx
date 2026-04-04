"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export interface StandingRow {
  pos: number;
  team: string;
  pts: number;
  pj: number;
  highlighted?: boolean;
}

interface ClassificationTableProps {
  standings: StandingRow[];
  externalUrl: string;
  theme?: "day" | "night";
}

export function ClassificationTable({ standings, externalUrl, theme = "night" }: ClassificationTableProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className={`relative overflow-hidden rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-1000 ${
        theme === 'day' ? "bg-white border-primary/10 shadow-[0_10px_30px_-15px_rgba(218,41,28,0.1)]" : "bg-black border-white/5 mx-[1px]"
      }`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b transition-colors duration-1000 ${
              theme === 'day' ? "bg-slate-200/50 border-slate-200" : "bg-white/[0.02] border-white/5"
            }`}>
              <th className={`px-6 py-4 text-[9px] font-bold tracking-widest uppercase truncate transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-600" : "text-white/30"
              }`} style={{ fontFamily: 'NeueMontreal' }}>Pos</th>
              <th className={`px-2 py-4 text-[9px] font-bold tracking-widest uppercase transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-600" : "text-white/30"
              }`} style={{ fontFamily: 'NeueMontreal' }}>Equipo</th>
              <th className={`px-4 py-4 text-[9px] font-bold tracking-widest uppercase text-center transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-600" : "text-white/30"
              }`} style={{ fontFamily: 'NeueMontreal' }}>PTS</th>
              <th className={`px-6 py-4 text-[9px] font-bold tracking-widest uppercase text-center transition-colors duration-1000 ${
                theme === 'day' ? "text-slate-600" : "text-white/30"
              }`} style={{ fontFamily: 'NeueMontreal' }}>J</th>
            </tr>
          </thead>
          <tbody className={`divide-y transition-colors duration-1000 ${
            theme === 'day' ? "divide-slate-100" : "divide-white/[0.03]"
          }`}>
            {standings.map((row, i) => {
              const isCercedense = row.team.toUpperCase().includes("CERCEDENSE");
              const isHighlighted = row.highlighted || isCercedense;
              
              return (
                <motion.tr 
                  key={row.pos}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`transition-all duration-1000 relative ${
                    isHighlighted 
                      ? (theme === 'day' 
                          ? "bg-primary/5 shadow-[inset_4px_0_0_0_rgba(218,41,28,1)] z-10" 
                          : "bg-primary/20 shadow-[inset_4px_0_0_0_rgba(218,41,28,1)] backdrop-blur-md z-10")
                      : (theme === 'day' ? "hover:bg-slate-50 text-slate-500" : "hover:bg-white/[0.02]")
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`text-xs font-black tabular-nums transition-colors duration-1000 ${
                      isHighlighted ? "text-white" : (theme === 'day' ? "text-slate-600" : "text-white/40")
                    }`}>
                      {row.pos}
                    </span>
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black tracking-widest uppercase transition-colors duration-1000 ${
                        isHighlighted 
                          ? (theme === 'day' ? "text-primary" : "text-white drop-shadow-md")
                          : (theme === 'day' ? "text-slate-700 font-bold" : "text-white/60 font-bold")
                      }`} style={{ fontFamily: 'NeueMontreal' }}>
                        {row.team}
                      </span>
                      {isCercedense && (
                        <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(218,41,28,1)]" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-xs font-black tabular-nums transition-colors duration-1000 ${
                      isHighlighted 
                        ? (theme === 'day' ? "text-primary" : "text-white") 
                        : (theme === 'day' ? "text-slate-900" : "text-white/90")
                    }`}>
                      {row.pts}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-bold tabular-nums transition-colors duration-1000 ${
                      isHighlighted ? "text-white/80" : (theme === 'day' ? "text-slate-500" : "text-white/20")
                    }`}>
                      {row.pj}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Full Link */}
      <a 
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 group p-4 rounded-2xl border active:scale-[0.98] transition-all duration-1000 font-bold tracking-[0.3em] text-[10px] uppercase ${
          theme === 'day' 
            ? "bg-white border-slate-200 text-slate-600 active:bg-slate-100 shadow-sm" 
            : "bg-white/[0.03] border-white/5 text-white/40 active:bg-white/10"
        }`}
        style={{ fontFamily: 'NeueMontreal' }}
      >
        <span>Ver Clasificación Completa</span>
        <ExternalLink size={12} className={`transition-colors ${theme === 'day' ? "text-slate-500 group-hover:text-primary" : "text-white/20 group-hover:text-primary"}`} />
      </a>
    </div>
  );
}
