"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Bot } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { InputForm } from "../components/InputForm";
import { LoadingState } from "../components/LoadingState";
import { EmailCard } from "../components/EmailCard";
import { IntentDashboard } from "../components/IntentDashboard";
import { WorkspaceHub } from "../components/WorkspaceHub";
import { SparringArena } from "../components/SparringArena";
import type { EmailOption } from "../types";

export default function LuminaApp() {
  const [prospectName, setProspectName] = useState("");
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [activeTab, setActiveTab] = useState("copilot");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState<EmailOption[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const [progressStep, setProgressStep] = useState(0);
  const loadingStepsLength = 5;

  useEffect(() => {
    if (isGenerating) {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < loadingStepsLength - 1) {
          currentStep++;
          setProgressStep(currentStep);
        }
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prospectName || !company || !context) return;
    
    setIsGenerating(true);
    setError(null);
    setOptions(null);
    setProgressStep(0);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectName, company, context }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setOptions(data.options);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Generation failed.";
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-blue-500/30 text-white font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-[#222] bg-[#0A0A0A]/80 backdrop-blur-md flex items-center px-6 justify-between shrink-0">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors capitalize">
                  {activeTab.replace('-', ' ')}
                </span>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </li>
              <li>
                <span className="text-white" aria-current="page">New Outreach</span>
              </li>
            </ol>
          </nav>
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium"
              role="status"
              aria-label="Model Status: Gemini 1.5 Pro Active"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Gemini 1.5 Pro Active
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {activeTab === "copilot" && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Initialize Context</h1>
                <p className="text-gray-400 text-sm">
                  Feed Nexus raw, unstructured data. Our multi-agent system will parse it and generate human-like outreach.
                </p>
              </div>

              <InputForm 
                prospectName={prospectName}
                setProspectName={setProspectName}
                company={company}
                setCompany={setCompany}
                context={context}
                setContext={setContext}
                isGenerating={isGenerating}
                handleGenerate={handleGenerate}
              />
            </div>

            {/* Right Column: Output / Magic Reveal */}
            <div className="lg:col-span-7" aria-live="polite">
              <AnimatePresence mode="wait">
                {!isGenerating && !options && !error && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full min-h-[400px] glass-panel rounded-2xl flex flex-col items-center justify-center text-center p-8 border-dashed border-[#333]"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-center mb-6">
                      <Bot className="w-8 h-8 text-blue-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-white">Awaiting Intelligence</h2>
                    <p className="text-gray-400 text-sm max-w-sm text-balance">
                      Input the prospect&apos;s context. Nexus&apos;s multi-agent system will analyze the data and generate strictly non-spam, human-like outreach options.
                    </p>
                  </motion.div>
                )}

                {isGenerating && (
                  <LoadingState progressStep={progressStep} />
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-6 border-red-500/30 text-red-400"
                    role="alert"
                  >
                    <p className="font-semibold mb-2">System Fault</p>
                    <p className="text-sm font-mono bg-red-500/10 p-3 rounded-lg">{error}</p>
                  </motion.div>
                )}

                {options && !isGenerating && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">Generated Angles</h2>
                      <span className="text-xs text-gray-500 font-mono">Powered by Gemini 1.5 Pro</span>
                    </div>

                    {options.map((opt, i) => (
                      <EmailCard 
                        key={i}
                        index={i}
                        option={opt}
                        copiedIndex={copiedIndex}
                        onCopy={handleCopy}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          )}
          {activeTab === "workspace" && <WorkspaceHub />}
          {activeTab === "sparring" && <SparringArena />}
          {activeTab === "intent" && <IntentDashboard />}
        </div>
      </main>
    </div>
  );
}
