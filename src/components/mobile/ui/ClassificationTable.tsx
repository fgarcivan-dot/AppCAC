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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-[9px] font-black tracking-widest text-white/30 uppercase">Pos</th>
              <th className="px-2 py-4 text-[9px] font-black tracking-widest text-white/30 uppercase">Equipo</th>
              <th className="px-4 py-4 text-[9px] font-black tracking-widest text-white/30 uppercase text-center">PTS</th>
              <th className="px-6 py-4 text-[9px] font-black tracking-widest text-white/30 uppercase text-center">J</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {standings.map((row, i) => (
              <motion.tr 
                key={row.pos}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`transition-colors duration-300 ${
                  row.highlighted ? "bg-primary/10" : "hover:bg-white/[0.02]"
                }`}
              >
                <td className="px-6 py-4">
                  <span className={`text-xs font-black tabular-nums ${
                    row.pos <= 3 ? "text-primary" : "text-white/40"
                  }`}>
                    {row.pos}
                  </span>
                </td>
                <td className="px-2 py-4">
                  <span className={`text-[11px] font-black tracking-tight uppercase ${
                    row.highlighted ? "text-white" : "text-white/60"
                  }`}>
                    {row.team}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-xs font-black tabular-nums ${
                    row.highlighted ? "text-primary" : "text-white/80"
                  }`}>
                    {row.pts}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-xs font-bold text-white/20 tabular-nums">
                    {row.pj}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Full Link */}
      <a 
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 group p-4 rounded-2xl bg-white/[0.03] border border-white/5 active:bg-white/10 transition-all font-black tracking-[0.3em] text-[10px] text-white/40 group-hover:text-white uppercase transition-colors"
      >
        <span>Ver Clasificación Completa</span>
        <ExternalLink size={12} className="text-white/20 group-hover:text-primary transition-colors" />
      </a>
    </div>
  );
}
