import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUp,
  Bookmark,
  CheckCircle2,
  Copy,
  Check,
  Send,
  MessageSquare,
  Sparkles,
  Code
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const DiscussionDetailPage: React.FC = () => {
  const {
    selectedPostId,
    posts,
    replies,
    addReply,
    acceptReply,
    upvotePost,
    toggleSavePost,
    currentUser,
    navigateTo
  } = useApp();

  const [replyText, setReplyText] = useState('');
  const [hasCodeSnippet, setHasCodeSnippet] = useState(false);
  const [snippetLanguage, setSnippetLanguage] = useState('typescript');
  const [snippetCode, setSnippetCode] = useState('');
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.id === selectedPostId);

  if (!post) {
    return (
      <div className="p-8 text-center text-[#A1A1B5]">
        <p>Post not found or removed.</p>
        <button
          onClick={() => navigateTo('discussions')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#171725] text-xs font-semibold text-[#F5F3FF]"
        >
          Back to Discussions
        </button>
      </div>
    );
  }

  const postReplies = replies.filter((r) => r.postId === post.id);
  const authorGoblin = GOBLIN_CHARACTERS.find((g) => g.id === post.authorAvatarGoblinId) || GOBLIN_CHARACTERS[0];
  const isSaved = currentUser?.savedPostIds?.includes(post.id);
  const hasUpvoted = currentUser ? post.upvotedUserIds.includes(currentUser.id) : false;
  const isPostAuthor = currentUser?.id === post.authorId || currentUser?.role === 'Administrator';

  const handleCopyCode = () => {
    if (post.codeSnippet) {
      navigator.clipboard.writeText(post.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentUser) return;

    addReply(
      post.id,
      replyText.trim(),
      hasCodeSnippet && snippetCode.trim()
        ? { language: snippetLanguage, code: snippetCode.trim() }
        : undefined
    );

    setReplyText('');
    setSnippetCode('');
    setHasCodeSnippet(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Back to Discussions */}
      <button
        onClick={() => navigateTo('discussions')}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to The Goblin Den</span>
      </button>

      {/* Main Post Card */}
      <div className="goblin-card p-6 sm:p-8 border-[#8B5CF6]/30">
        {/* Author Header */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img
              src={authorGoblin.avatarImg}
              alt={post.authorName}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#8B5CF6]/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#F5F3FF]">{post.authorName}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                  {post.authorRole}
                </span>
                <span className="text-[10px] text-[#A3E635] font-semibold">
                  {authorGoblin.roleTitle}
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1B5] font-mono mt-0.5">
                Channel: <span className="text-[#A3E635]">{post.category}</span> •{' '}
                {new Date(post.createdAt).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {post.solved && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 flex items-center gap-1.5 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solved</span>
              </span>
            )}
            <button
              onClick={() => toggleSavePost(post.id)}
              className={`p-2 rounded-xl border transition ${
                isSaved ? 'text-[#A3E635] border-[#A3E635]/40' : 'text-[#A1A1B5] border-white/10 hover:text-[#F5F3FF]'
              }`}
              title={isSaved ? 'Bookmarked' : 'Bookmark Post'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-display font-black text-[#F5F3FF] leading-snug">
          {post.title}
        </h1>

        {/* Content Body */}
        <p className="text-sm text-[#A1A1B5] mt-3 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        {/* Code Snippet Box */}
        {post.codeSnippet && (
          <div className="mt-4 rounded-2xl bg-[#09090F] border border-[#8B5CF6]/30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#11111B] border-b border-white/5 text-xs text-[#A1A1B5] font-mono">
              <span>{post.codeSnippet.language.toUpperCase()} SPEC</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] hover:text-[#F5F3FF] transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-[#A3E635] leading-relaxed">
              <code>{post.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Tags & Upvote Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs bg-[#11111B] border border-white/5 text-[#A1A1B5]"
              >
                #{t}
              </span>
            ))}
          </div>

          <button
            onClick={() => upvotePost(post.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition ${
              hasUpvoted
                ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#A855F7]'
                : 'bg-[#171725] border-white/10 hover:border-white/30 text-[#F5F3FF]'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            <span>{post.upvotes} Upvotes</span>
          </button>
        </div>
      </div>

      {/* REPLIES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#F5F3FF]">
          <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
          <span>Clan Solutions & Discussion ({postReplies.length})</span>
        </div>

        {postReplies.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-[#11111B] border border-white/5 text-[#A1A1B5] text-xs">
            No replies yet. Be the first goblin to provide an answer and earn XP!
          </div>
        ) : (
          postReplies.map((reply) => {
            const replyGoblin = GOBLIN_CHARACTERS.find((g) => g.id === reply.authorAvatarGoblinId) || GOBLIN_CHARACTERS[0];
            return (
              <div
                key={reply.id}
                className={`p-5 rounded-2xl border transition-all ${
                  reply.isAccepted
                    ? 'bg-[#171725] border-emerald-500/50 shadow-glow-green'
                    : 'bg-[#171725]/60 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={replyGoblin.avatarImg}
                      alt={reply.authorName}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#F5F3FF]">{reply.authorName}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#8B5CF6]/20 text-[#C084FC]">
                          {reply.authorRole}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A1A1B5]">
                        {new Date(reply.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {reply.isAccepted ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1 border border-emerald-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accepted Solution</span>
                      </span>
                    ) : (
                      isPostAuthor && (
                        <button
                          onClick={() => acceptReply(post.id, reply.id)}
                          className="px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/10 transition"
                        >
                          Mark as Solution
                        </button>
                      )
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#A1A1B5] mt-2 leading-relaxed whitespace-pre-line">
                  {reply.content}
                </p>

                {reply.codeSnippet && (
                  <pre className="mt-3 p-3 rounded-xl bg-[#09090F] border border-white/5 text-[11px] font-mono text-[#A3E635] overflow-x-auto">
                    <code>{reply.codeSnippet.code}</code>
                  </pre>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* POST A REPLY FORM */}
      <div className="goblin-card p-5 sm:p-6">
        <h3 className="text-sm font-bold text-[#F5F3FF] mb-1">
          Share Your Solution or Perspective
        </h3>
        <p className="text-xs text-[#A1A1B5] mb-4">
          Constructive, helpful answers earn +30 XP (+100 XP if marked Accepted Solution).
        </p>

        <form onSubmit={handleSubmitReply} className="space-y-3.5">
          <textarea
            rows={4}
            required
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your explanation or troubleshooting steps..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#11111B] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-[#A1A1B5] cursor-pointer">
              <input
                type="checkbox"
                checked={hasCodeSnippet}
                onChange={(e) => setHasCodeSnippet(e.target.checked)}
                className="rounded accent-[#8B5CF6]"
              />
              <span>Attach code snippet</span>
            </label>

            <button
              type="submit"
              className="goblin-btn-primary py-2 px-5 text-xs font-bold flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Solution (+30 XP)</span>
            </button>
          </div>

          {hasCodeSnippet && (
            <textarea
              rows={3}
              value={snippetCode}
              onChange={(e) => setSnippetCode(e.target.value)}
              placeholder="// Paste your code block..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#8B5CF6]/30 font-mono text-xs text-[#A3E635] focus:outline-none focus:border-[#A3E635]"
            />
          )}
        </form>
      </div>
    </div>
  );
};
