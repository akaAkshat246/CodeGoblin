import React, { useState } from 'react';
import {
  Search,
  Download,
  Copy,
  Check,
  X,
  PackageOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { DigitalResource } from '../types';
import { SEOHead } from '../components/SEOHead';
import { ScrollRevealButton } from '../components/framer';

export const ResourcesStorePage: React.FC = () => {
  const { resources, downloadedResourceIds, downloadResource } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResourceModal, setActiveResourceModal] = useState<DigitalResource | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showOnlyDownloaded, setShowOnlyDownloaded] = useState(false);

  const categories: string[] = [
    'All',
    'Starter Kits',
    'Pitch Decks',
    'Documentation',
    'AI Prompts',
    'Guides & E-books'
  ];

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDownloaded = !showOnlyDownloaded || downloadedResourceIds.includes(res.id);
    return matchesCategory && matchesSearch && matchesDownloaded;
  });

  const handleDownload = (res: DigitalResource) => {
    downloadResource(res.id);
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#8B5CF6', '#A3E635', '#F5F3FF']
    });
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      <SEOHead
        title="Resources Store"
        description="Download curated hackathon starter kits, pitch deck templates, and vibe coding system prompts."
        canonicalPath="/store"
        pageId="resources_store"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Resources Store
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Production starter kits, winning pitch decks, and system prompts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-zinc-400">
          <span>Saved: {downloadedResourceIds.length}</span>
          {downloadedResourceIds.length > 0 && (
            <button
              onClick={() => setShowOnlyDownloaded(!showOnlyDownloaded)}
              className={`px-2.5 py-1 rounded-lg text-xs font-sans transition ${
                showOnlyDownloaded
                  ? 'bg-white/[0.1] text-white'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white'
              }`}
            >
              {showOnlyDownloaded ? 'Show All' : 'Show Saved'}
            </button>
          )}
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blueprints, prompts..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#111118] border border-white/[0.06] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-white/[0.08] text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredResources.map((res) => {
          const isDownloaded = downloadedResourceIds.includes(res.id);

          return (
            <div
              key={res.id}
              className="p-4 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                    {res.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {res.fileFormat}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {res.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.2 rounded text-[10px] text-zinc-500 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-zinc-500">
                  {res.downloadsCount} DLs
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveResourceModal(res)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Inspect
                  </button>

                  <button
                    onClick={() => handleDownload(res)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                      isDownloaded
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-white/[0.08] hover:bg-[#A3E635] hover:text-[#09090F] text-white'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3" />
                        <span>Get</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="p-8 text-center rounded-xl bg-[#111118] border border-white/[0.06] space-y-2">
          <PackageOpen className="w-8 h-8 text-zinc-500 mx-auto opacity-50" />
          <h3 className="text-sm font-semibold text-white">No Resources Found</h3>
          <p className="text-xs text-zinc-400">Try adjusting your search query or filter.</p>
        </div>
      )}

      {/* Resource Modal */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-400">
                  {activeResourceModal.category} • {activeResourceModal.fileFormat}
                </span>
                <h2 className="text-lg font-bold text-white mt-1.5">
                  {activeResourceModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveResourceModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeResourceModal.description}
            </p>

            {/* Code Snippet */}
            {activeResourceModal.codeSnippet && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Quickstart Snippet</span>
                  <button
                    onClick={() => handleCopyCode(activeResourceModal.codeSnippet!, activeResourceModal.id)}
                    className="flex items-center gap-1 text-[#A3E635] hover:underline"
                  >
                    {copiedId === activeResourceModal.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-zinc-200 overflow-x-auto">
                  <code>{activeResourceModal.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Slides Preview */}
            {activeResourceModal.slidesPreview && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-white">Slide Outline</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeResourceModal.slidesPreview.map((s) => (
                    <div
                      key={s.slideNumber}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1"
                    >
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-zinc-400">#{s.slideNumber}</span>
                        <span>{s.title}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-zinc-400 space-y-0.5">
                        {s.bullets.map((b, idx) => (
                          <li key={idx} className="truncate">{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Content */}
            {activeResourceModal.previewContent && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-white">Preview</h4>
                <pre className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre">
                  {activeResourceModal.previewContent}
                </pre>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">
                Reward: <strong className="text-[#A3E635]">+25 XP</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveResourceModal(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Close
                </button>
                <ScrollRevealButton
                  label="Download Resource"
                  downloadingLabel="Fetching Blueprint..."
                  completedLabel="Saved to Cache!"
                  onDownload={() => {
                    handleDownload(activeResourceModal);
                  }}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
