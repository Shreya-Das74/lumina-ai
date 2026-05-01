import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";

interface LoadingStateProps {
  progressStep: number;
}

export const LoadingState = ({ progressStep }: LoadingStateProps) => {
  const steps = [
    "Authenticating via Google Workspace IAM...",
    "Querying Vertex AI Search for prospect history...",
    "Executing BigQuery ML intent prediction...",
    "Drafting via Gemini 1.5 Pro...",
    "Securing payload via Secret Manager..."
  ];

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full min-h-[400px] glass-panel rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1A1A1A]">
        <motion.div
          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: steps.length * 1.2, ease: "linear" }}
        />
      </div>

      <div className="w-24 h-24 relative mb-8" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-[spin_1.5s_linear_infinite_reverse]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainCircuit className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>
      </div>

      {/* aria-live polite ensures screen readers read out the steps as they change */}
      <div 
        className="h-8 relative overflow-hidden w-full text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          <motion.p
            key={progressStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-blue-400 font-medium font-mono text-sm absolute w-full"
          >
            &gt; {steps[progressStep]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
