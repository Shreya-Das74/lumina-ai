import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, BrainCircuit } from "lucide-react";

export const SparringArena = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "Sparring Session Initialized. Persona: Suspicious VP of Engineering. Powered by Vertex AI Agent Builder." },
    { role: "bot", content: "I saw your email. Look, we already use Apollo for our outbound. It's fully integrated into our Salesforce instance. Why would we rip and replace for this?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate Vertex AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "bot", 
        content: "Apollo is a system of execution. It's great for blasting templates. But if you're trying to reach me—a VP of Engineering—I block Apollo tracking pixels by default. Nexus is a system of intelligence that drafts via my actual Gmail outbox and uses BigQuery ML to predict if I'm even in market. That's not a rip and replace, that's an upgrade." 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto w-full h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
          <BrainCircuit className="text-purple-500" />
          Objection Sparring Arena
        </h1>
        <p className="text-gray-400">Practice live pitches against dynamic buyer personas powered by Vertex AI custom models.</p>
      </div>

      <div className="flex-1 bg-[#111] border border-[#222] rounded-xl overflow-hidden flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'system' ? (
                <div className="w-full text-center text-xs text-purple-400 font-mono tracking-wider py-4 opacity-70">
                  {msg.content}
                </div>
              ) : (
                <div className={`flex items-start gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-[#222] border border-[#333]'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-purple-400" />}
                  </div>
                  <div className={`p-4 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-[#1A1A1A] text-gray-200 border border-[#333] rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#333] rounded-tl-none flex gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#0A0A0A] border-t border-[#222]">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your counter-argument..."
              className="w-full bg-[#111] border border-[#333] text-white text-sm rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-md disabled:opacity-50 hover:bg-purple-700 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
