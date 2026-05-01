import React, { memo } from "react";
import { motion } from "framer-motion";
import { Activity, Copy, CheckCircle2 } from "lucide-react";
import type { EmailCardProps } from "../types";

const EmailCardComponent = ({ option, index, copiedIndex, onCopy }: EmailCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="glass-panel rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-colors"
    >
      {/* Option Header */}
      <div className="bg-[#111] px-5 py-3 border-b border-[#222] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Angle: {option.angle}
          </span>
        </div>
        <button
          onClick={() => onCopy(`${option.subject}\n\n${option.body}`, index)}
          className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          aria-label={copiedIndex === index ? "Copied" : "Copy to clipboard"}
        >
          {copiedIndex === index ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Option Body */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs text-gray-500 font-mono mb-1">Subject Line</p>
          <p className="font-medium text-white">{option.subject}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-mono mb-1">Email Body</p>
          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#333] text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
            {/* React automatically escapes strings rendered like this, inherently protecting against XSS */}
            {option.body}
          </div>
        </div>
      </div>

      {/* Citation Footer */}
      <div className="bg-blue-900/10 px-5 py-2.5 border-t border-blue-900/30 flex items-start gap-2">
        <Activity className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-xs text-blue-300/80 italic">
          <span className="font-semibold text-blue-400">Context Source: </span>
          {option.citation}
        </p>
      </div>
    </motion.div>
  );
};

export const EmailCard = memo(EmailCardComponent);
