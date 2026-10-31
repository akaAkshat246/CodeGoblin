import React from 'react';
import { Shield, X, Scale, RefreshCw, HeartHandshake } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'refund' | 'guidelines' | null;

interface LegalTrustModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export const LegalTrustModal: React.FC<LegalTrustModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#11111B] border border-[#8B5CF6]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
              {type === 'privacy' && <Shield className="w-5 h-5" />}
              {type === 'terms' && <Scale className="w-5 h-5" />}
              {type === 'refund' && <RefreshCw className="w-5 h-5" />}
              {type === 'guidelines' && <HeartHandshake className="w-5 h-5" />}
            </span>
            <div>
              <h2 className="text-xl font-black text-[#F5F3FF]">
                {type === 'privacy' && 'Privacy Policy & Data Protection'}
                {type === 'terms' && 'Terms of Service & Guild Agreement'}
                {type === 'refund' && 'Workshop & Digital Product Refund Policy'}
                {type === 'guidelines' && 'Clan Code of Honor & Community Guidelines'}
              </h2>
              <span className="text-[10px] text-[#A1A1B5] font-mono">
                Effective: October 2026 • CodeGoblins Platform Governance
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A1A1B5] hover:text-[#F5F3FF] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="space-y-4 text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                CodeGoblins (&quot;we&quot;, &quot;our&quot;, or &quot;clan&quot;) respects the privacy and autonomy of student developers. We adhere to the Digital Personal Data Protection (DPDP) Act 2023 principles of purpose limitation, data minimization, and storage limitation.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">1. Information We Collect</h4>
              <p>
                We only collect information necessary to deliver educational roadmaps, verify workshop attendance, and foster squad collaborations: display name, username, email, GitHub/portfolio links, self-reported skills, and project submissions.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">2. Payment Security</h4>
              <p>
                We never store raw debit/credit card numbers, CVVs, or UPI PINs. All financial checkout flows are securely tokenized and processed through our RBI-authorized payment partner, Razorpay.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">3. Your Data Rights & Deletion</h4>
              <p>
                Every member has the right to export their data or request permanent account deletion at any time by contacting <code>privacy@codegoblins.in</code>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                By accessing CodeGoblins (codegoblins.in) and our member platforms, you agree to abide by these terms.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">1. Intellectual Property & Code Ownership</h4>
              <p>
                You retain 100% intellectual property ownership of all source code, hackathon projects, and prototypes you forge and submit. CodeGoblins does not claim equity or ownership over student projects.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">2. Respectful Community Conduct</h4>
              <p>
                Harassment, academic dishonesty, unauthorized scraping, malicious vulnerability exploitation, or posting illegal content will result in immediate suspension without warning.
              </p>
            </>
          )}

          {type === 'refund' && (
            <>
              <p>
                We strive for complete transparency regarding all educational events, workshops, and digital resources.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">1. Live Workshop Refunds</h4>
              <p>
                You may request a 100% refund on paid workshops up to 24 hours before the scheduled session start time. After the workshop has started or recordings/course materials have been dispatched, registrations are non-refundable.
              </p>
              <h4 className="font-bold text-[#F5F3FF] text-sm pt-2">2. Digital Templates & Starter Kits</h4>
              <p>
                Free digital resources carry zero charges. For any premium digital templates, refunds are honored if the downloadable archive is corrupt or fundamentally misaligned with the documented specification.
              </p>
            </>
          )}

          {type === 'guidelines' && (
            <>
              <p>
                CodeGoblins is built on radical curiosity, psychological safety, and mutual elevation.
              </p>
              <ul className="list-disc list-inside space-y-2 pt-1 text-xs sm:text-sm">
                <li><strong className="text-[#F5F3FF]">No Goblin Left Behind</strong>: Every senior builder was once a beginner struggling with Git merge conflicts. Help your peers with empathy.</li>
                <li><strong className="text-[#F5F3FF]">Constructive Code Reviews</strong>: Critique code architecture, never individuals.</li>
                <li><strong className="text-[#F5F3FF]">Vibe Coding with Integrity</strong>: AI tools accelerate prototyping, but understanding your architecture and verifying production correctness is your responsibility.</li>
              </ul>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="goblin-btn-primary py-2 px-6 text-xs font-bold"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
