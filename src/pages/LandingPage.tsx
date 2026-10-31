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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LegalTrustModal, LegalDocType } from '../components/LegalTrustModal';
import { SEOHead } from '../components/SEOHead';

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

      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">
        <a className="landing-brand" href="#spawn">
          <img src="/art/logo.webp" alt="CodeGoblins" />
          <span>
            CODE<span>GOBLINS</span>
            <small>SMALL GOBLINS. BIG IDEAS.</small>
          </span>
        </a>
        <p>
          Different strengths. Same passion.
          <br />
          Turning ideas into real impact — together.
        </p>
        <div>
          <a href="mailto:codegoblins.team@gmail.com">
            Let’s talk <ArrowUpRight size={13} />
          </a>
          <button
            type="button"
            className="text-[#a89ab7] hover:text-[#b5ed72] flex items-center gap-1.5 transition text-[9px] cursor-pointer"
            onClick={handleOpenAuth}
          >
            Log in <ArrowUpRight size={13} />
          </button>
          <a href="#spawn">Back to the surface ↑</a>
        </div>

        {/* Legal & Compliance Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-[#A1A1B5] pt-2 border-t border-white/5 w-full">
          <button
            type="button"
            onClick={() => setActiveLegalDoc('privacy')}
            className="hover:text-[#F5F3FF] transition"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveLegalDoc('terms')}
            className="hover:text-[#F5F3FF] transition"
          >
            Terms of Service
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveLegalDoc('refund')}
            className="hover:text-[#F5F3FF] transition"
          >
            Refund Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveLegalDoc('guidelines')}
            className="hover:text-[#F5F3FF] transition"
          >
            Clan Guidelines
          </button>
        </div>

        <span>© {new Date().getFullYear()} CodeGoblins • All Rights Reserved</span>
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
