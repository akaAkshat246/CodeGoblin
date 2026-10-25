import React, { useState } from 'react';
import {
  Hammer,
  Search,
  Plus,
  Heart,
  Bookmark,
  ExternalLink,
  GitBranch,
  Sparkles,
  Users,
  X,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Hammer className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Project Forge
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Showcase real software, discover peer demos, and find contributors for your hackathon projects.
          </p>
        </div>

        <button
          onClick={() => setIsForgeModalOpen(true)}
          className="goblin-btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Forge New Project</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title or tech stack..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Shipped">Shipped</option>
            <option value="In Progress">In Progress</option>
            <option value="Looking for Teammates">Looking for Teammates</option>
          </select>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#11111B] border border-white/5 text-[#A1A1B5]">
            <p className="text-sm font-semibold text-[#F5F3FF]">No projects matching filters.</p>
            <p className="text-xs mt-1">Be the first to forge a project in this category!</p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const isLiked = currentUser ? project.likedUserIds.includes(currentUser.id) : false;
            const isSaved = currentUser?.savedProjectIds?.includes(project.id);

            return (
              <div
                key={project.id}
                className="goblin-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Cover banner */}
                  <div className="h-44 w-full overflow-hidden relative cursor-pointer" onClick={() => navigateTo('project_detail', project.id)}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171725] via-transparent to-transparent pointer-events-none" />
                    
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md ${
                        project.status === 'Shipped'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : project.status === 'Looking for Teammates'
                          ? 'bg-[#8B5CF6]/25 text-[#A855F7] border-[#8B5CF6]/40'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {project.status}
                    </span>

                    {project.featured && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#A3E635] text-[#09090F] shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="text-[10px] text-[#A3E635] font-semibold mb-1">
                      {project.category}
                    </div>
                    <h3
                      onClick={() => navigateTo('project_detail', project.id)}
                      className="text-base font-bold text-[#F5F3FF] group-hover:text-[#A3E635] cursor-pointer transition"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#A1A1B5] mt-1 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#11111B] border border-white/5 text-[#A1A1B5]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-5 pt-0 border-t border-white/5 mt-2 flex items-center justify-between text-xs text-[#A1A1B5]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likeProject(project.id)}
                      className={`flex items-center gap-1 transition ${
                        isLiked ? 'text-rose-400 font-bold' : 'hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                      <span>{project.likes}</span>
                    </button>

                    <button
                      onClick={() => toggleSaveProject(project.id)}
                      className={`hover:text-[#F5F3FF] transition ${isSaved ? 'text-[#A3E635]' : ''}`}
                      title={isSaved ? 'Bookmarked' : 'Bookmark'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#A3E635] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => navigateTo('project_detail', project.id)}
                      className="text-[#A855F7] font-semibold hover:underline"
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

      {/* FORGE PROJECT MODAL */}
      {isForgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl text-left">
            <button
              onClick={() => setIsForgeModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Hammer className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Forge Submission
              </span>
            </div>
            <h3 className="text-2xl font-display font-black text-[#F5F3FF]">
              Publish a Project to the Showcase
            </h3>
            <p className="text-xs text-[#A1A1B5] mt-1 mb-5">
              Submit your project to inspire peers, find contributors, and earn +150 XP!
            </p>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CampusRadar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Category
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Tagline (Punchy 1-sentence elevator pitch)
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Real-time crowdsourced shuttle tracker with arrival estimations"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Problem Statement
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={problemStatement}
                    onChange={(e) => setProblemStatement(e.target.value)}
                    placeholder="What real pain point does this solve?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Your Solution
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How does your tech architecture solve it?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="React, TypeScript, Tailwind, Node.js"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://myproject.dev"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="Shipped">Shipped (Live & Working)</option>
                  <option value="In Progress">In Progress (Active Dev)</option>
                  <option value="Looking for Teammates">Looking for Teammates</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsForgeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A1A1B5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Forge Project (+150 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
