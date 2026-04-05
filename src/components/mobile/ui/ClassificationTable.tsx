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
}

export function ClassificationTable({ standings, externalUrl }: ClassificationTableProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-1000 bg-[#050505] border-white/5 mx-[1px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b transition-colors duration-1000 bg-white/[0.02] border-white/5">
              <th className="px-6 py-4 text-[9px] font-black tracking-[0.3em] uppercase truncate transition-colors duration-1000 text-white opacity-40">Pos</th>
              <th className="px-2 py-4 text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-1000 text-white opacity-40">Equipo</th>
              <th className="px-4 py-4 text-[9px] font-black tracking-[0.3em] uppercase text-center transition-colors duration-1000 text-white opacity-40">PTS</th>
              <th className="px-6 py-4 text-[9px] font-black tracking-[0.3em] uppercase text-center transition-colors duration-1000 text-white opacity-40">J</th>
            </tr>
          </thead>
          <tbody className="divide-y transition-colors duration-1000 divide-white/[0.03]">
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
                      ? "bg-primary/20 shadow-[inset_4px_0_0_0_rgba(218,41,28,1)] backdrop-blur-md z-10"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`text-xs font-black tabular-nums transition-colors duration-1000 ${
                      isHighlighted ? "text-white" : "text-white opacity-40"
                    }`}>
                      {row.pos}
                    </span>
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black tracking-widest uppercase transition-colors duration-1000 ${
                        isHighlighted 
                          ? "text-white drop-shadow-md"
                          : "text-white opacity-60 font-bold"
                      }`}>
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
                        ? "text-white" 
                        : "text-white opacity-90"
                    }`}>
                      {row.pts}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-bold tabular-nums transition-colors duration-1000 ${
                      isHighlighted ? "text-white opacity-80" : "text-white opacity-20"
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
        className="flex items-center justify-center gap-2 group p-4 rounded-2xl border active:scale-[0.98] transition-all duration-1000 font-black tracking-[0.3em] text-[10px] uppercase bg-white/[0.03] border-white/5 text-white opacity-40 active:bg-white/10"
      >
        <span>Ver Clasificación Completa</span>
        <ExternalLink size={12} className="transition-colors text-white opacity-20 group-hover:opacity-100 group-hover:text-primary" />
      </a>
    </div>
  );
}

