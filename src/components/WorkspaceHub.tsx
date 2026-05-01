import React from "react";
import { Mail, Calendar, FileText, CheckCircle2 } from "lucide-react";

export const WorkspaceHub = () => {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Workspace Hub</h1>
        <p className="text-gray-400">Seamless Google Workspace API integrations. Automate drafts, calendar holds, and pre-call docs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111] border border-[#222] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Mail className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Gmail API Integration</h2>
          </div>
          <p className="text-sm text-gray-400 mb-6">Nexus drafts emails natively from your actual outbox to preserve domain reputation and avoid spam filters.</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg border border-[#333]">
              <span className="text-sm text-gray-300">Drafts generated today</span>
              <span className="font-mono text-blue-400">142</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg border border-[#333]">
              <span className="text-sm text-gray-300">Auto-sent on reply</span>
              <span className="font-mono text-green-400">18</span>
            </div>
            <button className="w-full py-2 bg-blue-600/20 text-blue-400 font-medium rounded-lg text-sm hover:bg-blue-600/30 transition">
              Sync Inbox Rules
            </button>
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Google Docs API</h2>
          </div>
          <p className="text-sm text-gray-400 mb-6">Auto-generates customized 3-page &quot;Pre-Call Briefings&quot; for Account Executives exactly 15 minutes before meetings.</p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-[#1A1A1A] rounded-lg border border-[#333]">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <div>
                <p className="text-sm text-gray-200">Stripe CTO Prep Briefing</p>
                <p className="text-xs text-gray-500">Generated via Gemini 1.5 Pro</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#1A1A1A] rounded-lg border border-[#333]">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <div>
                <p className="text-sm text-gray-200">Vercel Enterprise Proposal</p>
                <p className="text-xs text-gray-500">Auto-formatted from call transcript</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
          <div className="p-4 bg-purple-500/10 rounded-full shrink-0">
            <Calendar className="w-10 h-10 text-purple-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-2">Google Calendar & Meet Auto-Scheduler</h2>
            <p className="text-sm text-gray-400">
              When a prospect replies positively via Gmail, Nexus parses the intent, automatically finds an open slot in your Google Calendar, generates a Google Meet link, and attaches the AI-generated Google Doc prep materials.
            </p>
          </div>
          <button className="whitespace-nowrap px-6 py-2.5 bg-white text-black font-medium rounded-lg text-sm hover:bg-gray-200 transition">
            View Schedule Log
          </button>
        </div>
      </div>
    </div>
  );
};
