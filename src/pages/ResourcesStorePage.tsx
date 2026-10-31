import React, { useState } from 'react';
import {
  PackageOpen,
  Search,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  FileText,
  Terminal,
  Presentation,
  BookMarked,
  Filter,
  CheckCircle2,
  X,
  Code2,
  Flame,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { DigitalResource, ResourceCategory } from '../types';
import { SEOHead } from '../components/SEOHead';

export const ResourcesStorePage: React.FC = () => {
  const { resources, downloadedResourceIds, downloadResource, currentUser } = useApp();
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
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8B5CF6', '#A3E635', '#F5F3FF']
    });
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'Starter Kits':
        return <Terminal className="w-4 h-4 text-[#A3E635]" />;
      case 'Pitch Decks':
        return <Presentation className="w-4 h-4 text-[#C084FC]" />;
      case 'Documentation':
        return <FileText className="w-4 h-4 text-sky-400" />;
      case 'AI Prompts':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Guides & E-books':
        return <BookMarked className="w-4 h-4 text-emerald-400" />;
      default:
        return <PackageOpen className="w-4 h-4 text-[#8B5CF6]" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <SEOHead
        title="Developer Starter Kits, Pitch Decks & Blueprints"
        description="Download curated hackathon starter kits, pitch deck templates, production README standards, and vibe coding system prompts from CodeGoblins."
        canonicalPath="/store"
        pageId="resources_store"
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
              <PackageOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Developer Resources Store
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Production boilerplates, winning hackathon pitch templates, system prompts, and field guides. Free for all goblin builders.
          </p>
        </div>

        {/* Stash Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#11111B] border border-white/5 px-4 py-2 rounded-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-[#A3E635] animate-pulse" />
          <span className="text-xs text-[#A1A1B5]">
            Downloaded in Stash:{' '}
            <strong className="text-[#F5F3FF] font-mono">{downloadedResourceIds.length}</strong>
          </span>
          {downloadedResourceIds.length > 0 && (
            <button
              onClick={() => setShowOnlyDownloaded(!showOnlyDownloaded)}
              className={`ml-2 text-[10px] px-2 py-0.5 rounded font-bold transition ${
                showOnlyDownloaded
                  ? 'bg-[#A3E635] text-black'
                  : 'bg-white/10 text-[#F5F3FF] hover:bg-white/20'
              }`}
            >
              {showOnlyDownloaded ? 'Showing Saved' : 'Filter Saved'}
            </button>
          )}
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search starter kits, pitch decks, prompts..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] placeholder-[#A1A1B5] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#8B5CF6] text-white shadow-glow-purple'
                  : 'bg-[#171725] text-[#A1A1B5] hover:text-[#F5F3FF] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isDownloaded = downloadedResourceIds.includes(res.id);

          return (
            <div
              key={res.id}
              className="goblin-card p-6 flex flex-col justify-between border-white/5 hover:border-[#8B5CF6]/50 transition group"
            >
              <div>
                {/* Badges & Category Header */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#171725] border border-white/5">
                    {getCategoryIcon(res.category)}
                    <span className="text-[11px] font-bold text-[#F5F3FF]">{res.category}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#A3E635]/15 text-[#A3E635]">
                    {res.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-[#F5F3FF] group-hover:text-[#A3E635] transition leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-[#A1A1B5] mt-2 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-[#A1A1B5] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-[#A1A1B5]">
                  <span>{res.fileFormat}</span>
                  <span className="mx-1.5">•</span>
                  <span>{res.downloadsCount} DLs</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveResourceModal(res)}
                    className="px-3 py-1.5 rounded-lg bg-[#171725] border border-white/5 hover:border-white/20 text-xs font-semibold text-[#F5F3FF] transition"
                  >
                    Inspect
                  </button>

                  <button
                    onClick={() => handleDownload(res)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      isDownloaded
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'goblin-btn-primary'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Get Free</span>
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
        <div className="p-12 text-center rounded-3xl bg-[#11111B] border border-white/5 space-y-3">
          <PackageOpen className="w-10 h-10 text-[#8B5CF6] mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-[#F5F3FF]">No Blueprints Found</h3>
          <p className="text-xs text-[#A1A1B5] max-w-sm mx-auto">
            Try adjusting your search query or select another category filter to explore the armory.
          </p>
        </div>
      )}

      {/* Resource Inspection & Download Modal */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-[#8B5CF6]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                    {activeResourceModal.category}
                  </span>
                  <span className="text-xs font-mono text-[#A3E635]">
                    {activeResourceModal.fileFormat} • {activeResourceModal.fileSize}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#F5F3FF]">
                  {activeResourceModal.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveResourceModal(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A1A1B5] hover:text-[#F5F3FF] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
              {activeResourceModal.description}
            </p>

            {/* Code Snippet / Terminal Command */}
            {activeResourceModal.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A1A1B5]">
                  <span>CLI Quickstart / Code Payload</span>
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
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-[#09090F] border border-white/10 text-xs font-mono text-[#A3E635] overflow-x-auto">
                  <code>{activeResourceModal.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Slides Preview (if pitch deck) */}
            {activeResourceModal.slidesPreview && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F3FF]">
                  Pitch Slide Structure Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeResourceModal.slidesPreview.map((s) => (
                    <div
                      key={s.slideNumber}
                      className="p-3.5 rounded-xl bg-[#171725] border border-white/5 text-xs space-y-1"
                    >
                      <div className="font-bold text-[#F5F3FF] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[#8B5CF6]/30 text-[#C084FC] flex items-center justify-center text-[10px] font-mono">
                          {s.slideNumber}
                        </span>
                        <span>{s.title}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-[#A1A1B5] space-y-0.5 pt-1">
                        {s.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Content (if documentation or guide) */}
            {activeResourceModal.previewContent && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F3FF]">
                  Blueprint Architecture / Table of Contents
                </h4>
                <pre className="p-4 rounded-2xl bg-[#09090F] border border-white/10 text-[11px] font-mono text-[#F5F3FF] overflow-x-auto whitespace-pre">
                  {activeResourceModal.previewContent}
                </pre>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#A1A1B5]">
                Free Community Tier • Grants <strong className="text-[#A3E635]">+25 Clan XP</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveResourceModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-white/5 transition"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    handleDownload(activeResourceModal);
                    setActiveResourceModal(null);
                  }}
                  className="w-full sm:w-auto goblin-btn-primary py-2.5 px-6 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Starter Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

