'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

function getAutoReply(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes('payment') || msg.includes('pay')) return 'Payments are processed within 3–5 business days after task verification. Need to report a payment issue? Use the "Report Wrongdoings" section.';
  if (msg.includes('job') || msg.includes('apply')) return 'Browse available jobs in the Categories section. You can apply directly from any job listing page. Your applications are tracked in Application History.';
  if (msg.includes('profile') || msg.includes('kyc')) return 'Complete your profile in the "My Profile" section. A complete profile boosts your visibility to clients by 3x!';
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return 'Hello! 👋 I\'m the AdSky support assistant. How can I help you today?';
  if (msg.includes('password') || msg.includes('login')) return 'For login issues, use the "Forgot Password" option on the login page. A reset code will be sent to your registered email.';
  if (msg.includes('referral') || msg.includes('refer')) return 'You can find and share your referral code in the "My Referrals" section. Earn ₹100 for every successful referral!';
  return 'Thank you for your message! A support agent will review this shortly. For urgent help, please use "Request a Callback" instead.';
}

const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

export default function ChatSupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: 'Hi! 👋 I\'m the AdSky support bot. Ask me anything about jobs, payments, profiles, or your account. A human agent can also assist you if needed.', sender: 'bot', time: now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user', time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    setIsTyping(false);

    const botReply: Message = {
      id: (Date.now() + 1).toString(),
      text: getAutoReply(text),
      sender: 'bot',
      time: now()
    };
    setMessages(prev => [...prev, botReply]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = ['Payment help', 'Track my application', 'Profile issue', 'Report a problem'];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <MessageCircle size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat Support</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Online — typically replies in under a minute</p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col" style={{ height: '520px' }}>
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-primary">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">AdSky Support</p>
            <p className="text-blue-200 text-xs">Bot + Human assistance</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.sender === 'bot' ? 'bg-primary/10' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {msg.sender === 'bot' ? <Bot size={16} className="text-primary" /> : <User size={16} className="text-gray-600 dark:text-gray-300" />}
              </div>
              <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                    : 'bg-primary text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto">
          {quickReplies.map(qr => (
            <button key={qr} onClick={() => { setInput(qr); }} 
              className="flex-shrink-0 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-primary text-xs font-semibold rounded-full hover:bg-blue-100 transition-colors border border-blue-200 dark:border-blue-800">
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all resize-none"
          />
          <button onClick={handleSend} disabled={!input.trim()}
            className="w-11 h-11 bg-primary hover:bg-primary-hover text-white rounded-xl flex items-center justify-center disabled:opacity-40 transition-all flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
