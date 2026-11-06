import React, { useState } from 'react';
import { Mail, Send, X, Paperclip, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassyButton } from './GlassyButton';

export interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRecipient?: string;
  defaultSubject?: string;
  className?: string;
}

export const EmailComposer: React.FC<EmailComposerProps> = ({
  isOpen,
  onClose,
  defaultRecipient = 'founders@codegoblins.dev',
  defaultSubject = '',
  className = '',
}) => {
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const quickSubjects = [
    'Feature Suggestion',
    'Report Quest Bug',
    'Join Core Clan',
    'Partnership & Hackathons',
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    // Simulate raven dispatch
    await new Promise((res) => setTimeout(res, 1200));
    setIsSending(false);
    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl bg-[#0f0f18] border border-white/15 p-6 shadow-2xl overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Goblin Dispatch</h3>
              <p className="text-[11px] text-zinc-400">Direct transmission to clan council</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSent ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-lime-400/15 border border-lime-400/30 flex items-center justify-center text-lime-400 mb-4 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Raven Dispatched!</h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              Your message was encrypted and delivered to the clan founders. Expect an echo shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 pt-4">
            {/* To Field */}
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">TO:</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-lime-400/60 transition-colors"
                placeholder="recipient@codegoblins.dev"
                required
              />
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5">
              {quickSubjects.map((qs) => (
                <button
                  type="button"
                  key={qs}
                  onClick={() => setSubject(qs)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-all ${
                    subject === qs
                      ? 'bg-lime-400/15 text-lime-300 border-lime-400/40'
                      : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  {qs}
                </button>
              ))}
            </div>

            {/* Subject Field */}
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">SUBJECT:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400/60 transition-colors"
                placeholder="What is this transmission about?"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">SCROLL / MESSAGE:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400/60 transition-colors resize-none placeholder:text-zinc-600"
                placeholder="Draft your query, proposal, or bug report..."
                required
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-lime-400" /> 256-bit Goblin Protocol
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <GlassyButton
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSending || !message.trim()}
                  icon={<Send className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {isSending ? 'Transmitting...' : 'Send Raven'}
                </GlassyButton>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
