import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ChevronRight,
  User,
  Loader2,
  RefreshCw,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { ChatMessage } from '../../types';
import { api } from '../../services/api';

export const AICareerAssistant: React.FC = () => {
  const {
    profile,
    targetRole,
    isAssistantOpen,
    toggleAssistant,
    analysisReport
  } = useCareer();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello **${profile.name.split(' ')[0]}**! I am your **AI Career Coach**. I have analyzed your skills, projects, and target role of **${targetRole}**.\n\nAsk me anything about skill gaps, portfolio projects, interview readiness, or custom roadmaps!`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    "What should I learn next?",
    `Am I ready for a ${targetRole} internship?`,
    "Which projects should I build for my portfolio?",
    "Create a 3-month personalized learning plan.",
    "How can I improve my SQL & Machine Learning skills?"
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAssistantOpen) {
      scrollToBottom();
    }
  }, [messages, isAssistantOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.chatWithAssistant(
        profile.id || 'demo-alex-student',
        query,
        [...messages, userMsg],
        targetRole
      );

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.reply }
      ]);

      if (response.suggested_prompts && response.suggested_prompts.length > 0) {
        setSuggestedPrompts(response.suggested_prompts);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I ran into a temporary issue connecting to the AI brain. However, based on your profile, your primary focus should be closing gaps in Machine Learning and Deep Learning!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isAssistantOpen && (
        <button
          onClick={toggleAssistant}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2.5 glow-teal group"
          title="Open AI Career Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="font-bold text-sm tracking-wide pr-1 hidden sm:inline">Ask Career AI</span>
        </button>
      )}

      {/* Slide-over Drawer Panel */}
      {isAssistantOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] glass-panel bg-white/95 dark:bg-slate-900/95 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    AI Career Advisor
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" /> Grounded
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target: <span className="font-semibold text-teal-600 dark:text-teal-400">{targetRole}</span>
                </p>
              </div>
            </div>

            <button
              onClick={toggleAssistant}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Context Snippet Strip */}
          <div className="px-4 py-2 bg-teal-50/50 dark:bg-teal-950/20 border-b border-teal-100 dark:border-teal-900/40 flex items-center justify-between text-[11px] text-teal-800 dark:text-teal-300">
            <span>Readiness: <strong>{analysisReport?.career_readiness_score || 82}%</strong></span>
            <span>CGPA: <strong>{profile.cgpa}</strong></span>
            <span>Skills Tracked: <strong>{profile.skills.length}</strong></span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2.5 ${
                  msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-teal-500 text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {/* Formatted Markdown Rendering */}
                  <div className="space-y-1.5 whitespace-pre-wrap font-sans">
                    {msg.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return <h4 key={pIdx} className="font-bold text-sm text-teal-700 dark:text-teal-300 mt-2 mb-1">{paragraph.replace('### ', '')}</h4>;
                      }
                      if (paragraph.startsWith('#### ')) {
                        return <h5 key={pIdx} className="font-bold text-xs text-indigo-700 dark:text-indigo-300 mt-1">{paragraph.replace('#### ', '')}</h5>;
                      }
                      return <p key={pIdx}>{paragraph}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 text-xs p-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                <span>AI is analyzing your profile and formulating advice...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Section */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center">
              <Sparkles className="w-3 h-3 mr-1 text-amber-500" /> Suggested Inquiries:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {suggestedPrompts.slice(0, 3).map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-300 transition text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about roadmaps, skill gaps, projects..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md shadow-teal-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
