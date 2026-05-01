import React, { memo } from "react";
import { Target, Mail, MessageSquare, Activity, Settings, BrainCircuit } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarComponent = () => {
  return (
    <div className="w-64 h-screen border-r border-[#222] bg-[#0A0A0A] hidden md:flex flex-col p-4">
      <div className="flex items-center gap-2 mb-10 px-2 mt-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white glow-text">Lumina.ai</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1" aria-label="Main Navigation">
        {[
          { icon: Target, label: "Copilot Engine", active: true },
          { icon: Mail, label: "Campaigns", active: false },
          { icon: MessageSquare, label: "Sparring Arena", active: false },
          { icon: Activity, label: "Analytics", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              item.active 
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                : "text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1A]"
            )}
            aria-current={item.active ? "page" : undefined}
          >
            <item.icon className="w-4 h-4" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-[#222] pt-4">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-gray-400 hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <Settings className="w-4 h-4" aria-hidden="true" />
          Workspace Settings
        </button>
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg bg-[#111]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" aria-hidden="true" />
          <div className="flex flex-col text-left">
            <span className="text-sm text-white font-medium">Alex Rep</span>
            <span className="text-xs text-gray-500">Enterprise AE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = memo(SidebarComponent);
