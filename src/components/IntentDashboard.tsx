import React from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, AlertCircle, Database } from "lucide-react";

export const IntentDashboard = () => {
  const signals = [
    { time: "2 mins ago", event: "Pricing Page Visited", company: "Stripe", impact: "+15% Probability", type: "high" },
    { time: "1 hr ago", event: "Series C Funding Announced", company: "Rippling", impact: "+40% Probability", type: "high" },
    { time: "3 hrs ago", event: "Engineering Headcount +10%", company: "Vercel", impact: "+25% Probability", type: "medium" },
    { time: "1 day ago", event: "Competitor Mention in Email", company: "Linear", impact: "Urgent Review", type: "alert" },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Intent Signals</h1>
        <p className="text-gray-400">Real-time buyer telemetry powered by Pub/Sub and BigQuery ML.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111] border border-[#222] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-blue-500" />
            <h3 className="text-gray-400 font-medium text-sm">Active Models</h3>
          </div>
          <p className="text-2xl font-bold text-white">4 BQML Models</p>
          <p className="text-xs text-green-400 mt-1">Retrained 2 hours ago via Vertex AI</p>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-purple-500" />
            <h3 className="text-gray-400 font-medium text-sm">Events Processed</h3>
          </div>
          <p className="text-2xl font-bold text-white">1.4M / 24h</p>
          <p className="text-xs text-green-400 mt-1">Via Cloud Dataflow</p>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-gray-400 font-medium text-sm">Avg Deal Probability</h3>
          </div>
          <p className="text-2xl font-bold text-white">68.2%</p>
          <p className="text-xs text-green-400 mt-1">+12% vs last week</p>
        </div>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#222] flex justify-between items-center">
          <h2 className="text-white font-medium">Live Event Stream</h2>
          <span className="flex items-center gap-2 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
          </span>
        </div>
        <div className="divide-y divide-[#222]">
          {signals.map((signal, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="px-6 py-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
            >
              <div className="flex items-center gap-4">
                {signal.type === 'alert' ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : signal.type === 'high' ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <Activity className="w-5 h-5 text-blue-500" />
                )}
                <div>
                  <p className="text-white font-medium text-sm">{signal.company}</p>
                  <p className="text-gray-400 text-xs">{signal.event}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${signal.type === 'alert' ? 'text-red-400' : 'text-green-400'}`}>
                  {signal.impact}
                </p>
                <p className="text-gray-500 text-xs">{signal.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
