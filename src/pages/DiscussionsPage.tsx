import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  ArrowUp,
  Bookmark,
  CheckCircle2,
  Code,
  Tag,
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              The Goblin Den
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Student discussions, vibe coding setups, technical debugging, and hackathon team queries.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="goblin-btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#8B5CF6] text-[#FFFFFF] shadow-glow-purple'
                : 'bg-[#171725] text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#1E1E32]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussion threads..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center gap-1 self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setFilterType('trending')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'trending' ? 'bg-[#171725] text-[#A3E635]' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setFilterType('newest')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'newest' ? 'bg-[#171725] text-[#A3E635]' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setFilterType('solved')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'solved' ? 'bg-[#171725] text-[#A3E635]' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Solved
          </button>
          <button
            onClick={() => setFilterType('unanswered')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'unanswered' ? 'bg-[#171725] text-[#A3E635]' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Unanswered
          </button>
        </div>
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-3.5">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#11111B] border border-white/5 text-[#A1A1B5]">
            <p className="text-sm font-semibold text-[#F5F3FF]">No discussion threads found.</p>
            <p className="text-xs mt-1">Be the first to start a conversation in this channel!</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const authorGoblin = GOBLIN_CHARACTERS.find((g) => g.id === post.authorAvatarGoblinId) || GOBLIN_CHARACTERS[0];
            const isSaved = currentUser?.savedPostIds?.includes(post.id);
            const hasUpvoted = currentUser ? post.upvotedUserIds.includes(currentUser.id) : false;

            return (
              <div
                key={post.id}
                className="goblin-card p-4 sm:p-5 flex flex-col justify-between group transition hover:border-[#8B5CF6]/40"
              >
                <div>
                  {/* Top Bar: Author, category, solved status */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={authorGoblin.avatarImg}
                        alt={post.authorName}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#8B5CF6]/30"
                      />
                      <span className="font-bold text-[#F5F3FF]">{post.authorName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#C084FC]">
                        {post.authorRole}
                      </span>
                      <span className="text-[11px] text-[#A1A1B5]">
                        in <span className="text-[#A3E635] font-semibold">{post.category}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.solved && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Solved</span>
                        </span>
                      )}
                      <span className="text-[10px] text-[#A1A1B5]">
                        {new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Title & snippet */}
                  <h3
                    onClick={() => navigateTo('discussion_detail', post.id)}
                    className="text-base font-bold text-[#F5F3FF] group-hover:text-[#A855F7] cursor-pointer transition"
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#A1A1B5] mt-1.5 line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#11111B] border border-white/5 text-[#A1A1B5]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Upvotes, replies, bookmark */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#A1A1B5]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => upvotePost(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                        hasUpvoted
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#A855F7]'
                          : 'bg-[#11111B] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span className="font-bold">{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() => navigateTo('discussion_detail', post.id)}
                      className="flex items-center gap-1.5 hover:text-[#F5F3FF] transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.repliesCount} replies</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        isSaved ? 'text-[#A3E635] border-[#A3E635]/40' : 'text-[#A1A1B5] border-white/5 hover:text-[#F5F3FF]'
                      }`}
                      title={isSaved ? 'Bookmarked' : 'Bookmark Post'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo('discussion_detail', post.id)}
                      className="text-xs text-[#A855F7] font-semibold hover:underline"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl text-left">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-black text-[#F5F3FF] mb-1">
              Start a New Clan Discussion
            </h3>
            <p className="text-xs text-[#A1A1B5] mb-5">
              Ask questions, share vibe coding setups, or solicit project feedback. Earn +50 XP upon publishing.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Discussion Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How to structure prompt context for full-stack code agents?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Channel / Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, VibeCoding, Hackathons"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Discussion Body / Context
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Explain the background, what you tried, and what you want peer builders to discuss..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              {/* Code Snippet Option */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#F5F3FF]">
                    <input
                      type="checkbox"
                      checked={hasCodeSnippet}
                      onChange={(e) => setHasCodeSnippet(e.target.checked)}
                      className="rounded accent-[#8B5CF6]"
                    />
                    <span>Attach Code Snippet / Prompt Spec</span>
                  </label>
                  {hasCodeSnippet && (
                    <select
                      value={snippetLanguage}
                      onChange={(e) => setSnippetLanguage(e.target.value)}
                      className="px-2 py-1 rounded-lg bg-[#171725] border border-white/10 text-[10px] text-[#A3E635] font-mono focus:outline-none"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="sql">SQL / Postgres</option>
                      <option value="json">JSON Spec</option>
                    </select>
                  )}
                </div>

                {hasCodeSnippet && (
                  <textarea
                    rows={4}
                    value={snippetCode}
                    onChange={(e) => setSnippetCode(e.target.value)}
                    placeholder="// Paste your code snippet or agent prompt here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/30 font-mono text-xs text-[#A3E635] focus:outline-none focus:border-[#A3E635]"
                  />
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Thread (+50 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
