import React from "react";
import { User, Building, FileText, Terminal, Sparkles } from "lucide-react";

interface InputFormProps {
  prospectName: string;
  setProspectName: (val: string) => void;
  company: string;
  setCompany: (val: string) => void;
  context: string;
  setContext: (val: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
}

export const InputForm = ({
  prospectName,
  setProspectName,
  company,
  setCompany,
  context,
  setContext,
  isGenerating,
  handleGenerate,
}: InputFormProps) => {
  return (
    <div className="glass-panel rounded-2xl p-5 space-y-5">
      <div className="space-y-4">
        {/* Added labels and IDs for Accessibility (a11y) */}
        <div className="relative">
          <label htmlFor="prospectName" className="sr-only">Prospect Name</label>
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" aria-hidden="true" />
          <input
            id="prospectName"
            type="text"
            placeholder="Prospect Name (e.g., David, VP of Eng)"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
            value={prospectName}
            onChange={(e) => setProspectName(e.target.value)}
          />
        </div>

        <div className="relative">
          <label htmlFor="company" className="sr-only">Target Company</label>
          <Building className="absolute left-3 top-3 w-5 h-5 text-gray-500" aria-hidden="true" />
          <input
            id="company"
            type="text"
            placeholder="Target Company (e.g., Stripe)"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="relative">
          <label htmlFor="context" className="sr-only">Unstructured Context</label>
          <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" aria-hidden="true" />
          <textarea
            id="context"
            placeholder="Paste unstructured context here (LinkedIn bio, recent tweet, excerpt from an earnings call, or podcast transcript...)"
            className="w-full h-48 bg-[#1A1A1A] border border-[#333] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-white placeholder-gray-500"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prospectName || !company || !context}
        className="w-full relative group overflow-hidden rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        aria-busy={isGenerating}
      >
        <div className="relative z-10 flex items-center justify-center gap-2">
          {isGenerating ? (
            <Terminal className="w-4 h-4 animate-pulse" aria-hidden="true" />
          ) : (
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          )}
          {isGenerating ? "Synthesizing Context..." : "Generate Outreach"}
        </div>
        {!isGenerating && (
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        )}
      </button>
    </div>
  );
};
