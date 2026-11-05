import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  FolderGit2,
  Menu,
  Swords,
  Users,
  X,
  ChevronDown,
  Mail,
  Maximize2,
  Minimize2,
  Terminal,
  CheckCircle2,
  Sparkles,
  Clock,
  Flame,
  Trophy,
  Send,
  Check,
  Compass,
  ShieldCheck,
  Star,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LegalTrustModal, LegalDocType } from '../components/LegalTrustModal';
import { SEOHead } from '../components/SEOHead';
import { SpotlightCard, Marquee, NumberTicker, ShimmerButton } from '../components/framer';

// The 9 Goblin Roles with authentic copy
export const GOBLIN_ROLES = [
  {
    name: 'Community & Operations',
    tagline: 'The one who brings us together.',
    desc: 'Build the community. Keep the chaos organized.',
  },
  {
    name: 'Technical',
    tagline: 'The mind behind the magic.',
    desc: 'Architecture, code quality, and bigger ideas.',
  },
  {
    name: 'Design & Creative',
    tagline: 'Makes the useful unforgettable.',
    desc: 'Visual identity, product design, and creative direction.',
  },
  {
    name: 'Hackathon & Events',
    tagline: 'Turns “what if” into “we’re in.”',
    desc: 'Bring builders together for the next challenge.',
  },
  {
    name: 'Business & Services',
    tagline: 'Finds possibility everywhere.',
    desc: 'Partnerships, services, and opportunities.',
  },
  {
    name: 'Finance & Administration',
    tagline: 'Keeps the guild running.',
    desc: 'Resources, budgeting, and transparency.',
  },
  {
    name: 'Innovation & Projects',
    tagline: 'An idea is only the beginning.',
    desc: 'Experiment, prototype, and ship real impact.',
  },
  {
    name: 'Engagement & Mentorship',
    tagline: 'No goblin left behind.',
    desc: 'Learn together. Help the next builder up.',
  },
  {
    name: 'Marketing & Outreach',
    tagline: 'Tells our story to the world.',
    desc: 'Content, connection, and community reach.',
  },
];

const CHAPTERS = [
  { num: '01', title: 'The spark', id: 'spawn' },
  { num: '02', title: 'The craft', id: 'craft' },
  { num: '03', title: 'The guild', id: 'guild' },
  { num: '04', title: 'The impact', id: 'impact' },
];

const FAQ_ITEMS = [
  {
    q: 'Do I need to be an experienced developer?',
    a: 'No. Curiosity matters more than your current skill level. Start with a beginner learning path, introduce yourself, and build from there.',
  },
  {
    q: 'What can I do in the community?',
    a: 'Create a profile, ask and answer questions, share projects, explore learning paths, discover squads, and meet other builders. Event announcements appear when organizers publish verified information.',
  },
  {
    q: 'How do I log in?',
    a: 'Click "Log in" or "Enter the Den" to enter immediately as a goblin builder. You can also customize your profile, nickname, and role inside the Den.',
  },
  {
    q: 'Is CodeGoblins an official college club?',
    a: 'CodeGoblins is building its community and working toward becoming an official college club. We do not claim an approval or affiliation that has not been confirmed.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Rohan Mehta',
    college: 'VIT Vellore',
    role: '3rd Year CSE • Hackathon Podium',
    avatar: '/art/goblin-2.webp',
    quote: 'College syllabus was drowning us in Turbo C++ slides. CodeGoblins gave me practical blueprints — within 2 months, our squad placed top 3 at a national hackathon!',
    project: 'Shipped: AI Clinical Copilot',
  },
  {
    name: 'Ananya Sharma',
    college: 'IIT Roorkee',
    role: '2nd Year AI & Data Science',
    avatar: '/art/goblin-3.webp',
    quote: 'The Goblin Den discussions are completely free of spam. When our team hit a blocking websocket state issue during a 36-hour sprint, peer goblins helped us debug in 15 minutes.',
    project: 'Shipped: Multi-Agent Canvas',
  },
  {
    name: 'Vikramaditya Rao',
    college: 'Tier-3 Engineering College',
    role: 'Pre-final Year • Remote Intern',
    avatar: '/art/goblin-7.webp',
    quote: 'I had zero connections and zero GitHub commits. Going through the roadmap and building in Project Forge got me verified proof of work. Landed my first remote internship last month.',
    project: 'Shipped: Realtime SQL Sandbox',
  },
];

// WebGL Depth Canvas Particle Tunnel
const DepthCanvas: React.FC<{ paused?: boolean }> = ({ paused = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;

    const reducedMotion = paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isCancelled = false;
    let animId = 0;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(
      vs,
      `attribute vec3 a; uniform float time; uniform vec2 pointer; uniform float aspect; uniform float scroll; varying float v; void main(){vec3 p=a; p.z=mod(p.z+time*.11+scroll*.9,8.)+.6; p.xy+=pointer*.2; float c=cos(p.z*.09),s=sin(p.z*.09);p.xy=mat2(c,-s,s,c)*p.xy;gl_Position=vec4(p.x/aspect,p.y,p.z*.05,p.z);gl_PointSize=2.+4./p.z;v=1.-p.z/10.;}`
    );
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(
      fs,
      `precision mediump float; varying float v;void main(){vec2 p=gl_PointCoord-.5;if(dot(p,p)>.25)discard;gl_FragColor=vec4(mix(vec3(.58,.39,.87),vec3(.62,.88,.36),v),v*.55);}`
    );
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const vertices: number[] = [];
    for (let i = 0; i < 36; i++) {
      for (let j = 0; j < 30; j++) {
        const angle = (j / 30) * Math.PI * 2;
        const radius = 1.6 + (i % 3) * 0.28;
        vertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, (i / 36) * 8);
      }
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const aLoc = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 3, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'time');
    const ptrLoc = gl.getUniformLocation(program, 'pointer');
    const aspectLoc = gl.getUniformLocation(program, 'aspect');
    const scrollLoc = gl.getUniformLocation(program, 'scroll');

    let ptrX = 0;
    let ptrY = 0;
    const onPointerMove = (e: PointerEvent) => {
      ptrX = e.clientX / window.innerWidth - 0.5;
      ptrY = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const render = (time: number) => {
      if (isCancelled) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, reducedMotion ? 0 : time / 1000);
      gl.uniform2f(ptrLoc, reducedMotion ? 0 : ptrX, reducedMotion ? 0 : ptrY);
      gl.uniform1f(aspectLoc, w / h);
      gl.uniform1f(scrollLoc, reducedMotion ? 0 : window.scrollY / window.innerHeight);

      gl.drawArrays(gl.POINTS, 0, vertices.length / 3);

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [paused]);

  return <canvas ref={canvasRef} className="depth-canvas" aria-hidden="true" />;
};

// Terminal Component
interface TerminalLine {
  type: 'system' | 'command' | 'output' | 'success' | 'error';
  text: string;
}

const TerminalSandbox: React.FC<{
  large?: boolean;
  inputId?: string;
  onEnterDen?: () => void;
}> = ({ large = false, inputId = large ? 'lab-command' : 'hero-command', onEnterDen }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: 'CodeGoblins terminal sandbox · type help to begin.' },
    { type: 'command', text: 'goblin init --future' },
    { type: 'success', text: '✓ Curiosity detected. Your next chapter is ready.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIdx(-1);
    setInputVal('');

    if (cmd.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }

    const lower = cmd.toLowerCase();
    let res = '';
    let type: TerminalLine['type'] = 'output';

    switch (lower) {
      case 'help':
        res = `Available commands:
  about      Meet CodeGoblins
  ls         Explore the guild
  quests     Find your learning path
  roles      Meet the nine goblins
  whoami     Your next identity
  enter      Enter the Goblin Den
  forge      Open Project Forge
  contact    Talk to the team
  join       Open the community
  clear      Clear this terminal`;
        break;
      case 'about':
        res = `Small goblins. Big ideas.
Different strengths. Same passion.
Turning ideas into real impact — together.`;
        break;
      case 'ls':
        res = `quests/  project-forge/  goblin-den/
squads/  hackathons/     mentorship/`;
        break;
      case 'quests':
        res = `Web development · AI/ML · Cloud & DevOps
DSA · Open source · Vibe coding
Start small. Build something. Share what you learned.`;
        break;
      case 'whoami':
        res = `A curious builder. Your level is not your limit.
Sign in to create your own goblin identity.`;
        break;
      case 'roles':
        res = GOBLIN_ROLES.map((r, i) => `0${i + 1}  ${r.name}`).join('\n');
        document.getElementById('guild')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
        break;
      case 'contact':
        res = `codegoblins.team@gmail.com`;
        break;
      case 'join':
      case 'enter':
        res = `Your guild is ready! Opening the Goblin Den...`;
        type = 'success';
        if (onEnterDen) setTimeout(onEnterDen, 600);
        break;
      case 'forge':
        res = `Opening Project Forge in the Den...`;
        type = 'success';
        if (onEnterDen) setTimeout(onEnterDen, 600);
        break;
      case 'pwd':
        res = `/home/goblin/build-beyond-code`;
        break;
      default:
        res = `Command not found: ${cmd}\nType help for available commands. This sandbox does not run system commands.`;
        type = 'error';
    }

    setLines((prev) => [
      ...prev.slice(-55),
      { type: 'command', text: cmd },
      { type, text: res },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    }
  };

  return (
    <div className={`real-terminal ${large ? 'large' : ''} ${isMaximized ? 'terminal-max' : ''}`}>
      <div className="terminal-chrome">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>goblin@codegoblins: ~/build-beyond-code</span>
        <button
          type="button"
          aria-label={isMaximized ? 'Minimize terminal' : 'Expand terminal'}
          onClick={() => setIsMaximized(!isMaximized)}
        >
          {isMaximized ? (
            <Minimize2 size={large ? 14 : 12} />
          ) : (
            <Maximize2 size={large ? 14 : 12} />
          )}
        </button>
      </div>

      <div className="terminal-body" role="log" aria-label="Terminal output" ref={bodyRef}>
        {lines.map((l, idx) => (
          <div key={idx} className={`terminal-line ${l.type}`}>
            {l.type === 'command' && (
              <span className="prompt">
                goblin@den<span>:~$ </span>
              </span>
            )}
            {l.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId} className="prompt">
          goblin@den<span>:~$</span>
        </label>
        <input
          id={inputId}
          maxLength={180}
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal command"
          placeholder="type help + enter"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" aria-label="Run command">
          <ArrowRight size={14} />
        </button>
      </form>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const { navigateTo, setIsAuthModalOpen } = useApp();
  const [currentChapter, setCurrentChapter] = useState('spawn');
  const [selectedRole, setSelectedRole] = useState(1); // Default to Technical (02)
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);
  const [isMotionDisabled, setIsMotionDisabled] = useState(false);
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Thrive-Inspired High Conversion Features: Interactive Path Diagnostic
  const [quizGoal, setQuizGoal] = useState<'vibe' | 'ai' | 'hackathon' | 'dsa'>('vibe');
  const [quizLevel, setQuizLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // Newsletter Opt-in (Thrive Leads Style)
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const getTrackRecommendation = () => {
    switch (quizGoal) {
      case 'vibe':
        return {
          title: 'Fullstack Vibe Coding & Agent Architecture',
          badge: 'Most Popular for 2026',
          time: '4-6 Weeks',
          summary: 'Master rapid shipping using AI coding agents, React 19, Supabase, and automated cloud deployments.',
          firstStep: 'Mission 1: Scaffold your first multi-tier AI agent workflow in Vite',
          xp: 150
        };
      case 'ai':
        return {
          title: 'Applied GenAI & Intelligent Systems',
          badge: 'High Industry Demand',
          time: '6-8 Weeks',
          summary: 'Build RAG pipelines, LangChain integrations, vector databases, and production-grade LLM orchestration.',
          firstStep: 'Mission 1: Build a semantic context retrieval agent with embedding cache',
          xp: 200
        };
      case 'hackathon':
        return {
          title: 'Hackathon Speedrunner & Rapid MVP',
          badge: 'Podium Ready',
          time: '3-4 Weeks',
          summary: 'Turn hackathon problem statements into functional deployed MVPs in 24-36 hours using prebuilt blueprints.',
          firstStep: 'Mission 1: 3-hour rapid prototype deployment with authentication & UI',
          xp: 180
        };
      case 'dsa':
        return {
          title: 'Modern Algorithms & Systems Engineering',
          badge: 'Interview & Competitive',
          time: '8-10 Weeks',
          summary: 'Hands-on problem solving, clean algorithmic reasoning, and distributed system design patterns.',
          firstStep: 'Mission 1: Solve dynamic state machines and graph traversal with code tests',
          xp: 175
        };
    }
  };

  // Setup chapter scroll spy
  useEffect(() => {
    setIsMotionDisabled(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentChapter(entry.target.id);
            entry.target.classList.add('in-view');
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px', threshold: 0 }
    );

    document.querySelectorAll('.story-chapter').forEach((c) => observer.observe(c));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsNavExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMotionDisabled && e.pointerType !== 'touch') {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouseRot({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    }
  };

  const handleEnterDen = () => {
    navigateTo('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  const activeRoleData = GOBLIN_ROLES[selectedRole];

  return (
    <div className={`landing ${isMotionDisabled ? 'still' : ''}`}>
      <SEOHead
        title="CodeGoblins — EdTech & Student Developer Community Platform"
        description="A high-ambition developer clan for college students. Master vibe coding, dominate hackathons, build portfolio MVPs, collaborate in squads, and level up."
        canonicalPath="/"
        pageId="landing"
      />

      {/* 3D WebGL Background Tunnel */}
      <DepthCanvas paused={isMotionDisabled} />

      {/* Atmospheric grain overlay */}
      <div className="landing-grain" />

      {/* Accessibility skip link */}
      <a className="skip-link" href="#spawn">
        Skip to story
      </a>

      {/* Landing Navigation Header */}
      <header className="landing-nav">
        <a className="landing-brand" href="#spawn" aria-label="CodeGoblins home">
          <img src="/art/logo.webp" alt="CodeGoblins — Small goblins, big ideas" />
          <span>
            CODE<span>GOBLINS</span>
            <small>BUILD BEYOND CODE.</small>
          </span>
        </a>

        <nav className={isNavExpanded ? 'expanded' : ''}>
          <a href="#craft" onClick={() => setIsNavExpanded(false)}>
            The story
          </a>
          <a href="#guild" onClick={() => setIsNavExpanded(false)}>
            The goblins <span>09</span>
          </a>
          <button
            type="button"
            className="text-left font-sans text-xs text-[#d1c8db] hover:text-[#b5ed72] transition"
            onClick={() => {
              setIsNavExpanded(false);
              navigateTo('learning_hub');
            }}
          >
            Roadmaps
          </button>
          <button
            type="button"
            className="text-left font-sans text-xs text-[#d1c8db] hover:text-[#b5ed72] transition"
            onClick={() => {
              setIsNavExpanded(false);
              navigateTo('hackathons');
            }}
          >
            Workshops
          </button>
          <button
            type="button"
            className="text-left font-sans text-xs text-[#d1c8db] hover:text-[#b5ed72] transition"
            onClick={() => {
              setIsNavExpanded(false);
              navigateTo('resources_store');
            }}
          >
            Store
          </button>
          <button
            type="button"
            className="text-left font-sans text-xs text-[#d1c8db] hover:text-[#b5ed72] transition"
            onClick={() => {
              setIsNavExpanded(false);
              navigateTo('projects');
            }}
          >
            Showcase
          </button>
        </nav>

        <div className="landing-nav-right">
          <button
            type="button"
            className="login-link text-[#f3f1ec] hover:text-[#b5ed72] transition"
            onClick={handleOpenAuth}
          >
            Log in <ArrowUpRight size={14} />
          </button>
          <button
            type="button"
            className="enter-link cursor-pointer"
            onClick={handleEnterDen}
          >
            Enter the Den <ArrowRight size={14} />
          </button>
          <button
            className="landing-menu"
            aria-label="Toggle menu"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            {isNavExpanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Story Rail (Chapter Navigator) */}
      <aside className="story-rail" aria-label="Story chapters">
        {CHAPTERS.map((ch) => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className={currentChapter === ch.id ? 'current' : ''}
            aria-label={ch.title}
          >
            <span>{ch.num}</span>
            <i />
            <b>{ch.title}</b>
          </a>
        ))}
      </aside>

      <main className="landing-main">
        {/* ================= CHAPTER 01 / THE SPARK ================= */}
        <section className="landing-hero story-chapter" id="spawn">
          <div className="hero-coordinate">
            CG / WORLD_001 <span>● SYSTEM ONLINE</span>
          </div>

          <div className="landing-hero-layout">
            <div className="landing-hero-copy">
              <span className="landing-kicker">
                <i /> A GUILD FOR THE CURIOUS. A HOME FOR THE BUILDERS.
              </span>

              <h1>
                College teaches
                <br />
                the syllabus.
                <br />
                <span>We build</span>
                <br />
                <em>what’s next.</em>
                <span className="headline-star" aria-hidden="true">
                  ✳
                </span>
              </h1>

              <p>
                For the late-night thinkers. The “what if” people.
                <br />
                The ones with 27 tabs open and one big idea.
                <br />
                <strong>You’ve found your goblins.</strong>
              </p>

              <div className="landing-ctas">
                <button
                  type="button"
                  className="landing-primary cursor-pointer"
                  onClick={handleEnterDen}
                >
                  Enter the Goblin Den <ArrowUpRight size={18} />
                </button>
                <a className="landing-text-link" href="#craft">
                  Discover our story <ChevronDown size={14} />
                </a>
              </div>

              <div className="hero-members">
                <div>
                  <img src="/art/goblin-1.webp" alt="Guild member" />
                  <img src="/art/goblin-3.webp" alt="Guild member" />
                  <img src="/art/goblin-7.webp" alt="Guild member" />
                </div>
                <span>
                  Different strengths. <b>Same passion.</b>
                  <small>No lone-wolf coding required.</small>
                </span>
              </div>
            </div>

            {/* Interactive 3D World Stage */}
            <div
              className="world-stage"
              ref={stageRef}
              onPointerMove={handleStagePointerMove}
              onPointerLeave={() => setMouseRot({ x: 0, y: 0 })}
            >
              <div
                className="world-rotator"
                style={{
                  transform: `rotateX(${mouseRot.y * -8}deg) rotateY(${mouseRot.x * 12}deg)`,
                }}
              >
                <div className="world-orbit orbit-a" />
                <div className="world-orbit orbit-b" />
                <div className="world-floor" />

                <div className="floating-label label-top">
                  <i /> GOBLIN MODE: ACTIVATED <Terminal size={13} />
                </div>

                <div className="mascot-display">
                  <div className="mascot-halo" />
                  <img
                    src="/art/logo.webp"
                    alt="The official CodeGoblins hooded goblin building at a laptop"
                  />
                  <div className="mascot-caption">
                    <span>PLAYER_001</span>
                    <b>THE NEXT BUILDER IS YOU.</b>
                  </div>
                </div>

                <div className="floating-code">
                  <CodeXml size={18} />
                  <span>
                    while (curious) &#123;
                    <br />
                    &nbsp; learn(); build(); repeat();
                    <br />
                    &#125;
                  </span>
                </div>

                <div className="hero-terminal">
                  <TerminalSandbox onEnterDen={handleEnterDen} />
                </div>

                <div className="floating-label label-bottom">
                  <span className="tiny-square" /> IDEAS → CODE → IMPACT{' '}
                  <ArrowUpRight size={13} />
                </div>
              </div>

              <div className="stage-hint">
                <span>↔</span> MOVE YOUR CURSOR. ENTER THE WORLD.
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <a href="#craft">
              <span className="scroll-mouse" />
              SCROLL TO BEGIN THE ADVENTURE <ChevronDown size={13} />
            </a>
            <span>LEARN. BUILD. COLLABORATE. GROW. REPEAT.</span>
            <span>01 / 04</span>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="story-marquee" aria-hidden="true">
          <span>GOOD CODE.</span> BETTER PEOPLE. <i>✳</i>
          <span>SMALL GOBLINS.</span> BIG IDEAS. <i>✳</i>
          <span>BUILD BEYOND CODE.</span> <i>✳</i>
        </div>

        {/* ================= CHAPTER 02 / THE CRAFT ================= */}
        <section className="craft-section story-chapter" id="craft">
          <div className="chapter-heading">
            <span className="chapter-number">02 / THE CRAFT</span>
            <p>EVERY ORIGIN STORY STARTS WITH A SPARK.</p>
          </div>

          <div className="craft-layout">
            <div className="craft-copy">
              <span className="landing-kicker">FROM “I HAVE AN IDEA” TO “I BUILT THIS.”</span>
              <h2>
                Your potential.
                <br />
                Out of the drafts.
                <br />
                <em>Into the world.</em>
              </h2>
              <p>
                CodeGoblins is a community for curious builders who want to go beyond the syllabus.
                Ask questions, learn by doing, find your people, and turn a wild idea into something
                real.
              </p>

              <div className="story-steps">
                <button
                  type="button"
                  className="w-full text-left cursor-pointer"
                  onClick={() => {
                    navigateTo('learning_hub');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>01</span>
                  <div>
                    <h3>Learn the craft</h3>
                    <p>Follow practical learning paths. Ask the question. Break things. Understand why.</p>
                  </div>
                  <ArrowUpRight size={18} />
                </button>

                <a href="#guild">
                  <span>02</span>
                  <div>
                    <h3>Find your guild</h3>
                    <p>Meet people whose strengths complement yours. Great builds are a team sport.</p>
                  </div>
                  <ArrowUpRight size={18} />
                </a>

                <button
                  type="button"
                  className="w-full text-left cursor-pointer"
                  onClick={() => {
                    navigateTo('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>03</span>
                  <div>
                    <h3>Ship the idea</h3>
                    <p>Show your work, get feedback, and make the next version better.</p>
                  </div>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* Origin Window & Sticky Note */}
            <div className="origin-stack">
              <div className="origin-backplate" />
              <div className="origin-window">
                <div className="image-titlebar">
                  <span className="window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>our-origin.story</span>
                  <CodeXml size={13} />
                </div>
                <img
                  src="/art/origin.webp"
                  alt="Original CodeGoblins illustration: the people behind the chaos, learning and building together"
                  loading="lazy"
                />
                <div className="origin-caption">
                  <span>NOT JUST HACKATHONS.</span>
                  <b>People. Ideas. Progress. Always.</b>
                  <span>↗</span>
                </div>
              </div>

              <div className="sticky-note">
                Less “someday”.
                <br />
                <b>More “let’s build.”</b>
                <span>↗</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SIDE QUEST / THE PLAYGROUND (goblinOS) ================= */}
        <section className="terminal-section" id="terminal-lab">
          <div className="chapter-heading">
            <span className="chapter-number">SIDE QUEST / THE PLAYGROUND</span>
            <p>A LITTLE LESS TALK. A LITTLE MORE TERMINAL.</p>
          </div>

          <div className="desktop-scene">
            <div className="ubuntu-wallpaper">
              <div className="wallpaper-orb" />
              <span className="wallpaper-code">&lt;/&gt;</span>
            </div>

            <div className="desktop-panel">
              <span>
                Activities <span>CodeGoblins Desktop</span>
              </span>
              <span>Sandbox session</span>
              <span>⌁ &nbsp; ◉ &nbsp; ⏻</span>
            </div>

            <div className="desktop-dock">
              <button
                type="button"
                aria-label="Open terminal"
                onClick={() => document.getElementById('lab-command')?.focus()}
              >
                <Terminal size={19} />
              </button>
              <a href="#guild" aria-label="Meet the guild">
                <Users size={19} />
              </a>
              <button
                type="button"
                aria-label="Open Project Forge"
                onClick={() => {
                  navigateTo('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <FolderGit2 size={19} />
              </button>
              <a href="mailto:codegoblins.team@gmail.com" aria-label="Contact CodeGoblins">
                <Mail size={19} />
              </a>
              <span>⋮</span>
            </div>

            <div className="desktop-intro">
              <span>YOUR NEXT IDEA STARTS HERE.</span>
              <h2>
                Welcome to
                <br />
                <em>goblinOS.</em>
              </h2>
              <p>
                A familiar desktop.
                <br />
                An unfamiliar amount of possibility.
              </p>
              <small>
                Interactive terminal sandbox.
                <br />
                No system access. Just a little exploration.
              </small>
            </div>

            <div className="desktop-terminal">
              <TerminalSandbox large inputId="lab-command" onEnterDen={handleEnterDen} />
            </div>

            <div className="desktop-tip">
              TRY{' '}
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('lab-command') as HTMLInputElement | null;
                  if (input) {
                    input.focus();
                    input.value = 'help';
                  }
                }}
              >
                help ↵
              </button>{' '}
              · EXPLORE THE GUILD FROM YOUR COMMAND LINE
            </div>
          </div>
        </section>

        {/* ================= CHAPTER 03 / THE GUILD ================= */}
        <section className="guild-section story-chapter" id="guild">
          <div className="chapter-heading">
            <span className="chapter-number">03 / THE GUILD</span>
            <p>NINE STRENGTHS. ONE VERY GOOD KIND OF CHAOS.</p>
          </div>

          <div className="guild-heading">
            <div>
              <span className="landing-kicker">MEET THE PEOPLE BEHIND THE PIXELS.</span>
              <h2>
                No two goblins alike.
                <br />
                <em>That’s the whole point.</em>
              </h2>
            </div>
            <p>
              Some write the code. Some tell the story.
              <br />
              Some bring everyone together.
              <br />
              Every strength has a place in this guild.
            </p>
          </div>

          <div className="goblin-gallery">
            {/* Left: 9 Role Selector Tabs */}
            <div className="goblin-selector" role="tablist" aria-label="Goblin roles">
              {GOBLIN_ROLES.map((role, idx) => {
                const isChosen = selectedRole === idx;
                return (
                  <button
                    key={role.name}
                    type="button"
                    className={isChosen ? 'chosen' : ''}
                    role="tab"
                    aria-selected={isChosen}
                    aria-controls="goblin-details"
                    id={`goblin-tab-${idx}`}
                    onClick={() => setSelectedRole(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        const next = (idx + 1) % 9;
                        setSelectedRole(next);
                        document.getElementById(`goblin-tab-${next}`)?.focus();
                      }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        const prev = (idx + 8) % 9;
                        setSelectedRole(prev);
                        document.getElementById(`goblin-tab-${prev}`)?.focus();
                      }
                    }}
                  >
                    <span>0{idx + 1}</span>
                    <b>{role.name}</b>
                    <ArrowUpRight size={15} />
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Role Feature Display */}
            <div
              className="goblin-feature"
              role="tabpanel"
              id="goblin-details"
              aria-labelledby={`goblin-tab-${selectedRole}`}
            >
              <div className="role-visual">
                <div className="role-rings" />
                <img
                  key={selectedRole}
                  src={`/art/goblin-${selectedRole + 1}.webp`}
                  alt={`Original ${activeRoleData.name} goblin character artwork`}
                  loading="lazy"
                />
                <span className="role-index">0{selectedRole + 1}</span>
                <div className="role-art-label">ORIGINAL GUILD CHARACTER / CODEGOBLINS</div>
              </div>

              <div className="role-description">
                <span className="landing-kicker">
                  THE {activeRoleData.name.toUpperCase()} LEAD
                </span>
                <h3>{activeRoleData.tagline}</h3>
                <p>{activeRoleData.desc}</p>
                <span className="role-open">
                  <i /> Role-inspired identity · Team assignments open
                </span>
                <button
                  type="button"
                  className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition"
                  onClick={handleEnterDen}
                >
                  Find your place in the guild <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible 9 Roles Full Artwork */}
          <details className="artwork-details">
            <summary>
              Explore the original nine-goblin team illustration <span>+</span>
            </summary>
            <img
              src="/art/roles.webp"
              alt="All nine original CodeGoblins team roles and their responsibilities"
              loading="lazy"
            />
          </details>
        </section>

        {/* ================= CHAPTER 04 / THE IMPACT ================= */}
        <section className="impact-section story-chapter" id="impact">
          <div className="chapter-heading">
            <span className="chapter-number">04 / THE IMPACT</span>
            <p>THE BEST PART IS WHAT WE BUILD TOGETHER.</p>
          </div>

          <div className="impact-top">
            <h2>
              Big ideas need
              <br />
              <em>people who own them.</em>
            </h2>
            <p>
              A community. A project. A late-night breakthrough.
              <br />
              Whatever comes next, let’s make it matter.
            </p>
          </div>

          <div className="impact-cards">
            {/* Card 1: Project Forge */}
            <button
              type="button"
              className="impact-card text-left cursor-pointer"
              onClick={() => {
                navigateTo('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                <span>01</span>
                <FolderGit2 size={23} />
              </div>
              <small>SHIP SOMETHING REAL</small>
              <h3>Project Forge</h3>
              <p>Give that “someday” project a home. Share your work and get thoughtful feedback.</p>
              <ArrowUpRight size={24} />
            </button>

            {/* Card 2: The Goblin Den */}
            <button
              type="button"
              className="impact-card text-left cursor-pointer"
              onClick={() => {
                navigateTo('discussions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                <span>02</span>
                <CodeXml size={23} />
              </div>
              <small>CURIOSITY IS WELCOME</small>
              <h3>The Goblin Den</h3>
              <p>Ask, explain, learn. A good question can be the beginning of someone’s next big idea.</p>
              <ArrowUpRight size={24} />
            </button>

            {/* Card 3: Squads & Hackathons */}
            <button
              type="button"
              className="impact-card text-left cursor-pointer"
              onClick={() => {
                navigateTo('squads');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                <span>03</span>
                <Swords size={23} />
              </div>
              <small>BUILD IT TOGETHER</small>
              <h3>Squads &amp; Hackathons</h3>
              <p>Find the missing piece of your team. Different strengths, one shared goal.</p>
              <ArrowUpRight size={24} />
            </button>
          </div>

          {/* Operating System Manifesto Panel */}
          <div className="manifesto-panel">
            <img
              src="/art/manifesto.webp"
              alt="Original CodeGoblins manifesto: ownership, collaboration and execution turn ideas into real impact"
              loading="lazy"
            />
            <div>
              <span className="landing-kicker">OUR OPERATING SYSTEM</span>
              <h3>
                Ownership.
                <br />
                Collaboration.
                <br />
                <em>Execution.</em>
              </h3>
              <p>
                Clear responsibility. Different strengths.
                <br />
                Ideas into action, consistently.
              </p>
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE TRACK DIAGNOSTIC & EVENT COUNTDOWN ================= */}
        <section className="story-chapter px-4 sm:px-6 max-w-5xl mx-auto py-12 space-y-8" id="diagnostic">
          {/* Hackathon Scarcity & Countdown Banner (Thrive Ultimatum pattern) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#171725] to-[#111118] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Flame className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Flagship Event • Season 1
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 font-mono font-semibold">
                    142 / 500 Passes Left
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  GoblinHacks 2026: The 36-Hour National Prototype Sprint
                </h3>
                <p className="text-xs text-zinc-400">
                  ₹1,50,000 Prize Pool • Cross-college teams welcome • 100% Free student registration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="font-mono text-xs bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300">
                <span className="text-amber-400 font-bold">18d</span> : 04h : 22m
              </div>
              <button
                type="button"
                onClick={() => {
                  navigateTo('hackathons');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors shrink-0"
              >
                Claim Free Pass
              </button>
            </div>
          </div>

          {/* Interactive Path Diagnostic Quiz (Thrive Quiz Builder / Notion Preview pattern) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111118] border border-white/[0.08] shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-lime-400/10 text-lime-400 border border-lime-400/20 uppercase tracking-wider inline-block mb-2">
                30-Second Diagnostic
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Find Your Clan Specialization
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Tell us what you want to build and where you are starting. We will map your custom learning track.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Question 1: Goal */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-zinc-300 block uppercase tracking-wider">
                  Step 1: What is your primary focus?
                </span>
                <div className="space-y-2">
                  {[
                    { id: 'vibe' as const, label: 'Fullstack Vibe Coding', desc: 'React, AI agents, rapid UI & cloud backends' },
                    { id: 'ai' as const, label: 'GenAI & Applied ML Systems', desc: 'RAG, LangChain, embeddings & LLM agents' },
                    { id: 'hackathon' as const, label: 'Hackathon Speedrunner', desc: '36hr MVP prototypes, pitch decks & bounties' },
                    { id: 'dsa' as const, label: 'Modern Algorithms & Systems', desc: 'Clean algorithmic problem-solving & architecture' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizGoal(opt.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-colors flex items-start justify-between ${
                        quizGoal === opt.id
                          ? 'bg-white/[0.08] border-lime-400/40 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{opt.label}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.desc}</p>
                      </div>
                      {quizGoal === opt.id && <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Recommendation Card */}
              {(() => {
                const rec = getTrackRecommendation();
                return (
                  <SpotlightCard className="p-5 flex flex-col justify-between" spotlightColor="rgba(163, 230, 53, 0.15)">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-lime-400 uppercase tracking-wider font-mono">
                          Recommended Track
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {rec.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5">{rec.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">{rec.summary}</p>

                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5 text-xs text-zinc-300 mb-4">
                        <div className="flex items-center justify-between text-[11px] text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Estimated Time:</span>
                          </span>
                          <span className="text-zinc-300 font-mono font-medium">{rec.time}</span>
                        </div>
                        <p className="text-[11px] text-lime-400 font-medium pt-1">
                          {rec.firstStep}
                        </p>
                      </div>
                    </div>

                    <ShimmerButton
                      type="button"
                      onClick={() => {
                        navigateTo('learning_hub');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 px-4 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Start This Track in the Den (+{rec.xp} XP)</span>
                    </ShimmerButton>
                  </SpotlightCard>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ================= FRAMER LIVE METRICS & INFINITE MARQUEE TICKER ================= */}
        <section className="px-4 sm:px-6 max-w-5xl mx-auto py-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Active Builders', value: 1420, suffix: '+', icon: Users, color: 'text-lime-400' },
              { label: 'Bounty Pool', value: 150000, prefix: '₹', icon: Trophy, color: 'text-amber-400' },
              { label: 'Guild Roles', value: 9, suffix: ' Roles', icon: Swords, color: 'text-purple-400' },
              { label: 'Code Blueprints', value: 50, suffix: '+', icon: FolderGit2, color: 'text-emerald-400' },
            ].map((stat, idx) => (
              <SpotlightCard key={idx} className="p-4" spotlightColor="rgba(255, 255, 255, 0.08)">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5">
                  <span>{stat.label}</span>
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                </div>
                <div className={`text-xl font-bold font-mono ${stat.color}`}>
                  <NumberTicker value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Framer Infinite Marquee Ticker */}
          <div className="py-2">
            <Marquee speed={32} pauseOnHover={true}>
              {[
                '⚛️ React 19',
                '⚡ Next.js 15',
                '🟦 TypeScript',
                '🐍 Python & PyTorch',
                '⚡ FastAPI',
                '🐳 Docker',
                '🟢 Supabase',
                '☁️ Cloudflare Workers',
                '🤖 LangChain & LLM Agents',
                '🏛️ IIT Delhi',
                '🏛️ BITS Pilani',
                '🏛️ VIT Vellore',
                '🏛️ NIT Trichy',
                '🚀 Tier-3 Hackers',
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5 whitespace-nowrap"
                >
                  {badge}
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* ================= SOCIAL PROOF & STUDENT TESTIMONIALS (Thrive Ovation pattern) ================= */}
        <section className="story-chapter px-4 sm:px-6 max-w-5xl mx-auto py-12 space-y-6" id="testimonials">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block mb-1">
              Social Proof & Proof of Work
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Built by Students. Trusted by Campuses.
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Real college developers who broke free from textbook theory and shipped live products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {TESTIMONIALS.map((t, idx) => (
              <SpotlightCard
                key={idx}
                className="p-5 flex flex-col justify-between"
                spotlightColor="rgba(139, 92, 246, 0.15)"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed italic mb-4">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                    <p className="text-[10px] text-lime-400">{t.college}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{t.project}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="landing-faq">
          <span className="chapter-number">BEFORE YOU SPAWN</span>
          <h2>A few good questions.</h2>

          {FAQ_ITEMS.map((item, idx) => {
            const isExp = expandedFaq === idx;
            return (
              <div key={item.q} className={`faq-row ${isExp ? 'expanded' : ''}`}>
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExp ? null : idx)}
                  aria-expanded={isExp}
                >
                  {item.q}
                  <span>{isExp ? '−' : '+'}</span>
                </button>
                {isExp && <p>{item.a}</p>}
              </div>
            );
          })}
        </section>

        {/* ================= FINAL SPAWN SECTION ================= */}
        <section className="final-spawn">
          <div className="final-orbit" />
          <img src="/art/logo.webp" alt="CodeGoblins official logo" loading="lazy" />
          <span className="landing-kicker">
            <i /> YOUR NEXT CHAPTER IS WAITING.
          </span>
          <h2>
            Good code.
            <br />
            <em>Better together.</em>
          </h2>
          <p>You bring the curiosity. We’ll bring the goblins.</p>
          <button
            type="button"
            className="landing-primary cursor-pointer"
            onClick={handleEnterDen}
          >
            Let’s build something <ArrowUpRight size={19} />
          </button>
          <a className="final-email" href="mailto:codegoblins.team@gmail.com">
            codegoblins.team@gmail.com <Mail size={13} />
          </a>
        </section>
      </main>

      {/* ================= COMPREHENSIVE CONVERSION FOOTER (Thrive Features Checklist) ================= */}
      <footer className="landing-footer bg-[#09090F] border-t border-white/[0.08] px-4 sm:px-8 py-12 space-y-10 text-left">
        {/* Newsletter / The Goblin Dispatch Opt-In (Thrive Leads pattern) */}
        <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-[#111118] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-lime-400/10 text-lime-400">
                <Mail className="w-4 h-4" />
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">Join The Goblin Dispatch</h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-lg">
              Get weekly hackathon prompts, curated learning roadmaps, and internship opportunities directly in your inbox. No spam, unsubscribe anytime.
            </p>
          </div>

          <form onSubmit={handleSubscribeNewsletter} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your student email..."
              className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
            >
              {newsletterSubscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* 4-Column Navigation Architecture */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-zinc-400">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/art/logo.webp" alt="CodeGoblins Logo" className="w-6 h-6 rounded-md" />
              <span className="font-bold text-white text-sm">CODEGOBLINS</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
              Building an open community for college developers to ship real code, win hackathons, and learn practical engineering.
            </p>
            <div className="flex items-center gap-2 text-zinc-400">
              <a
                href="https://github.com/akaAkshat246/CodeGoblins"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-colors"
                title="GitHub"
              >
                <FolderGit2 className="w-4 h-4" />
              </a>
              <a
                href="mailto:codegoblins.team@gmail.com"
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-colors"
                title="Email Team"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => navigateTo('dashboard')} className="hover:text-white transition-colors">
                  Clan Dashboard
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('projects')} className="hover:text-white transition-colors">
                  Project Forge
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('hackathons')} className="hover:text-white transition-colors">
                  Hackathons & Events
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('resources_store')} className="hover:text-white transition-colors">
                  Resources Store
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => navigateTo('discussions')} className="hover:text-white transition-colors">
                  The Goblin Den
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('squads')} className="hover:text-white transition-colors">
                  Teams & Squads
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('leaderboards')} className="hover:text-white transition-colors">
                  Esports Leaderboard
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('members')} className="hover:text-white transition-colors">
                  Member Directory
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Trust & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => setActiveLegalDoc('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveLegalDoc('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveLegalDoc('refund')} className="hover:text-white transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveLegalDoc('guidelines')} className="hover:text-white transition-colors">
                  Clan Guidelines
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Heartbeat & Copyright */}
        <div className="max-w-5xl mx-auto pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Clan Grid: Operational • 1,420 Builders Online</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} CodeGoblins • Founded by Akshat Vats & Akshat Kumar</span>
          </div>
        </div>
      </footer>

      {/* Trust & Legal Governance Modal */}
      <LegalTrustModal
        type={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

      {/* Floating Status & Motion Toggle */}
      <div className="experience-status">
        <span>
          <i /> GOBLIN WORLD
        </span>
        <button
          type="button"
          onClick={() => setIsMotionDisabled(!isMotionDisabled)}
          aria-pressed={isMotionDisabled}
        >
          {isMotionDisabled ? 'Motion off' : 'Motion on'}
          <span>{isMotionDisabled ? '○' : '◉'}</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
