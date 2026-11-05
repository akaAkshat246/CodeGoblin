import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  ArrowUp,
  Bookmark,
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const DiscussionsPage: React.FC = () => {
  const {
    posts,
    createPost,
    upvotePost,
    toggleSavePost,
    currentUser,
    navigateTo
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterType, setFilterType] = useState<'trending' | 'newest' | 'solved' | 'unanswered'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for new post
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Vibe Coding');
  const [tagsInput, setTagsInput] = useState('React, VibeCoding, Hackathons');
  const [hasCodeSnippet, setHasCodeSnippet] = useState(false);
  const [snippetLanguage, setSnippetLanguage] = useState('typescript');
  const [snippetCode, setSnippetCode] = useState('');

  const categories = [
    'All',
    'General',
    'Introductions',
    'Web Development',
    'AI & Machine Learning',
    'Cloud & DevOps',
    'DSA & Competitive Programming',
    'Vibe Coding',
    'Hackathons',
    'Project Feedback',
    'Open Source',
    'Career & Internships',
    'Help & Troubleshooting'
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    createPost({
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatarGoblinId: currentUser.avatarGoblinId,
      authorRole: currentUser.role,
      category,
      tags: tags.length > 0 ? tags : ['General'],
      codeSnippet: hasCodeSnippet && snippetCode.trim()
        ? { language: snippetLanguage, code: snippetCode.trim() }
        : undefined
    });

    setTitle('');
    setContent('');
    setSnippetCode('');
    setHasCodeSnippet(false);
    setIsCreateModalOpen(false);
  };

  // Filter & sort posts
  let filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  if (filterType === 'trending') {
    filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
  } else if (filterType === 'newest') {
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (filterType === 'solved') {
    filteredPosts = filteredPosts.filter((p) => p.solved);
  } else if (filterType === 'unanswered') {
    filteredPosts = filteredPosts.filter((p) => p.repliesCount === 0);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              The Goblin Den
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Community discussions, debugging help, architecture reviews, and team matchmaking.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-white text-black font-semibold'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#111118] border border-white/[0.06]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussion threads..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
          />
        </div>

        <div className="flex items-center gap-1 self-start sm:self-auto text-xs">
          {(['trending', 'newest', 'solved', 'unanswered'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                filterType === tab
                  ? 'bg-white/[0.08] text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-[#111118] border border-white/[0.06] text-zinc-400">
            <p className="text-sm font-medium text-white">No discussions found.</p>
            <p className="text-xs mt-1">Start a conversation or adjust your filter.</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const authorGoblin = GOBLIN_CHARACTERS.find((g) => g.id === post.authorAvatarGoblinId) || GOBLIN_CHARACTERS[0];
            const isSaved = currentUser?.savedPostIds?.includes(post.id);
            const hasUpvoted = currentUser ? post.upvotedUserIds.includes(currentUser.id) : false;

            return (
              <div
                key={post.id}
                className="p-4 sm:p-5 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Author, category, solved status */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={authorGoblin.avatarImg}
                        alt={post.authorName}
                        className="w-6 h-6 rounded-md object-cover border border-white/10"
                      />
                      <span className="font-semibold text-white">{post.authorName}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        {post.authorRole}
                      </span>
                      <span className="text-zinc-600 hidden sm:inline">•</span>
                      <span className="text-[11px] text-zinc-400 hidden sm:inline">
                        in <span className="text-zinc-300 font-medium">{post.category}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.solved && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 flex items-center gap-1 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Solved</span>
                        </span>
                      )}
                      <span className="text-[11px] text-zinc-500">
                        {new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Title & snippet */}
                  <h3
                    onClick={() => navigateTo('discussion_detail', post.id)}
                    className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 cursor-pointer transition-colors"
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Upvotes, replies, bookmark */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => upvotePost(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                        hasUpvoted
                          ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() => navigateTo('discussion_detail', post.id)}
                      className="flex items-center gap-1.5 hover:text-white transition-colors text-xs text-zinc-400"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.repliesCount} replies</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'text-lime-400 border-lime-400/30 bg-lime-400/10'
                          : 'text-zinc-500 border-white/[0.06] hover:text-white hover:bg-white/[0.04]'
                      }`}
                      title={isSaved ? 'Bookmarked' : 'Bookmark Post'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo('discussion_detail', post.id)}
                      className="text-xs text-zinc-300 hover:text-white font-medium"
                    >
                      Open Thread →
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE DISCUSSION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl text-left">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-semibold text-white mb-1">
              Start a Discussion
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Ask questions, share code architecture, or request project feedback.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Discussion Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Best architecture for real-time multiplayer state with WebSockets?"
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c} className="bg-[#111118] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, Architecture, Fullstack"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Discussion Body
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Explain the background, what you tried, and what you're trying to solve..."
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Code Snippet Option */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-300">
                    <input
                      type="checkbox"
                      checked={hasCodeSnippet}
                      onChange={(e) => setHasCodeSnippet(e.target.checked)}
                      className="rounded accent-purple-500"
                    />
                    <span>Attach Code Snippet</span>
                  </label>
                  {hasCodeSnippet && (
                    <select
                      value={snippetLanguage}
                      onChange={(e) => setSnippetLanguage(e.target.value)}
                      className="px-2 py-1 rounded-md bg-black/40 border border-white/10 text-[11px] text-zinc-300 font-mono focus:outline-none"
                    >
                      <option value="typescript" className="bg-[#111118]">TypeScript</option>
                      <option value="python" className="bg-[#111118]">Python</option>
                      <option value="javascript" className="bg-[#111118]">JavaScript</option>
                      <option value="sql" className="bg-[#111118]">SQL</option>
                      <option value="json" className="bg-[#111118]">JSON</option>
                    </select>
                  )}
                </div>

                {hasCodeSnippet && (
                  <textarea
                    rows={4}
                    value={snippetCode}
                    onChange={(e) => setSnippetCode(e.target.value)}
                    placeholder="// Paste your code snippet here..."
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-lime-400 placeholder-zinc-600 focus:outline-none focus:border-white/30"
                  />
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish Discussion (+50 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
