import React, { useState } from 'react';
import {
  Search,
  Plus,
  Heart,
  Bookmark,
  ExternalLink,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    createProject,
    likeProject,
    toggleSaveProject,
    currentUser,
    navigateTo
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isForgeModalOpen, setIsForgeModalOpen] = useState(false);

  // Form states for new project
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [solution, setSolution] = useState('');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Tailwind, FastAPI');
  const [githubUrl, setGithubUrl] = useState('https://github.com/myteam/project');
  const [liveDemoUrl, setLiveDemoUrl] = useState('https://demo.project.dev');
  const [category, setCategory] = useState('Full Stack & Web');
  const [status, setStatus] = useState<'In Progress' | 'Shipped' | 'Looking for Teammates'>('Shipped');

  const categories = [
    'All',
    'Full Stack & Web',
    'AI & Productivity',
    'Full Stack & IoT',
    'Competitive Programming',
    'Open Source Tool',
    'Mobile Application'
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const stack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    createProject({
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      problemStatement: problemStatement.trim(),
      solution: solution.trim(),
      coverImage: '/assets/goblins/chaos_hero_poster.jpg',
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatarGoblinId: currentUser.avatarGoblinId,
      techStack: stack.length > 0 ? stack : ['React', 'TypeScript'],
      githubUrl: githubUrl.trim(),
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      category,
      contributors: [
        {
          name: currentUser.displayName,
          role: 'Lead Architect',
          goblinId: currentUser.avatarGoblinId
        }
      ],
      status
    });

    setIsForgeModalOpen(false);
    setTitle('');
    setTagline('');
    setDescription('');
    setProblemStatement('');
    setSolution('');
  };

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      <SEOHead
        title="Project Forge"
        description="Explore live software applications, AI agents, and prototypes built by clan members."
        canonicalPath="/projects"
        pageId="projects_showcase"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Project Forge
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Discover peer demos, explore source code, and share your live software.
          </p>
        </div>

        <button
          onClick={() => setIsForgeModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#111118] border border-white/[0.06] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#111118] border border-white/[0.06] text-xs text-zinc-300 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#111118] border border-white/[0.06] text-xs text-zinc-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Shipped">Shipped</option>
            <option value="In Progress">In Progress</option>
            <option value="Looking for Teammates">Looking for Teammates</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full p-8 text-center rounded-xl bg-[#111118] border border-white/[0.06] text-zinc-400">
            <p className="text-sm font-semibold text-white">No projects found.</p>
            <p className="text-xs mt-1">Be the first to publish a project in this category!</p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const isLiked = currentUser ? project.likedUserIds.includes(currentUser.id) : false;
            const isSaved = currentUser?.savedProjectIds?.includes(project.id);

            return (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                      {project.status}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {project.category}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigateTo('project_detail', project.id)}
                    className="text-sm font-semibold text-white hover:text-[#A3E635] cursor-pointer transition leading-snug"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.2 rounded text-[10px] bg-white/[0.04] text-zinc-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likeProject(project.id)}
                      className={`flex items-center gap-1 transition ${
                        isLiked ? 'text-rose-400 font-medium' : 'hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                      <span>{project.likes}</span>
                    </button>

                    <button
                      onClick={() => toggleSaveProject(project.id)}
                      className={`hover:text-white transition ${isSaved ? 'text-[#A3E635]' : ''}`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white flex items-center gap-1 font-medium"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => navigateTo('project_detail', project.id)}
                      className="text-zinc-300 hover:text-white font-medium"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Project Creation Modal */}
      {isForgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Publish Project</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Share with community and earn +150 XP</p>
              </div>
              <button
                onClick={() => setIsForgeModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CampusRadar"
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Tagline (1-line description)
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Real-time bus tracker with arrival estimations"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="React, TypeScript, Tailwind, Node.js"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsForgeModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
