"use client";

import { motion } from "framer-motion";
import type { Metric } from "@/types/domain";

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      aria-label={`Métrica ${metric.label} com valor ${metric.value}`}
      className="glass-panel p-6 rounded-xl flex flex-col justify-between min-h-40"
    >
      <h3 className="text-slate-400 mb-4 uppercase tracking-wide text-xs">
        {metric.label}
      </h3>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-white">{metric.value}</span>
        {metric.trend ? (
          <span className="text-cyan-300 text-sm">{metric.trend}</span>
        ) : null}
      </div>
      {typeof metric.progress === "number" ? (
        <div className="h-1 w-full bg-surface-container-highest mt-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      ) : null}
    </motion.div>
  );
}
