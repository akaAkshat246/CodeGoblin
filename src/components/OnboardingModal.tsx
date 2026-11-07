import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Shield, GraduationCap, Code } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingModalOpen, setIsOnboardingModalOpen, completeOnboarding } = useApp();

  const [step, setStep] = useState(1);
  const [selectedGoblinId, setSelectedGoblinId] = useState(2); // default Technical Lead
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [college, setCollege] = useState('PES University, Bengaluru');
  const [yearOfStudy, setYearOfStudy] = useState('1st Year B.Tech');
  const [bio, setBio] = useState('Passionate about learning vibe coding and shipping real hackathon projects.');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Vibe Coding',
    'Web Development',
    'Hackathons'
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'JavaScript',
    'Python',
    'HTML/CSS'
  ]);

  if (!isOnboardingModalOpen) return null;

  const availableInterests = [
    'Vibe Coding',
    'Web Development',
    'AI & Machine Learning',
    'Cloud & DevOps',
    'DSA & Algorithms',
    'UI/UX and Product Design',
    'Hackathons',
    'Open Source'
  ];

  const availableSkills = [
    'React',
    'TypeScript',
    'Python',
    'JavaScript',
    'Tailwind CSS',
    'FastAPI',
    'Docker',
    'Figma',
    'Git'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFinish = () => {
    const activeGoblin = GOBLIN_CHARACTERS.find((g) => g.id === selectedGoblinId);
    completeOnboarding({
      displayName: displayName.trim() || 'New Goblin',
      username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') || `goblin_${Math.floor(Math.random() * 8999 + 1000)}`,
      avatarGoblinId: selectedGoblinId,
      college,
      yearOfStudy,
      bio,
      interests: selectedInterests,
      skills: selectedSkills,
      preferredRoles: [activeGoblin?.roleTitle || 'Developer']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/40 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={() => setIsOnboardingModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A3E635]' : 'bg-[#171725]'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: SELECT GOBLIN IDENTITY */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#A3E635]" />
              <span className="text-xs font-bold text-[#A3E635] uppercase tracking-wider">
                Step 1 of 3: Choose Your Goblin Archetype
              </span>
            </div>
            <h3 className="text-2xl font-display font-black text-[#F5F3FF]">
              Select Your Goblin Clan Identity
            </h3>
            <p className="text-xs text-[#A1A1B5] mt-1 mb-5">
              Pick from the official 9 CodeGoblins team roles. This sets your initial avatar and community perks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
              {GOBLIN_CHARACTERS.map((goblin) => {
                const isSelected = selectedGoblinId === goblin.id;
                return (
                  <div
                    key={goblin.id}
                    onClick={() => setSelectedGoblinId(goblin.id)}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#171725] border-[#A3E635] shadow-glow-green ring-1 ring-[#A3E635]'
                        : 'bg-[#171725]/50 border-white/5 hover:border-[#8B5CF6]/40 hover:bg-[#171725]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={goblin.avatarImg}
                          alt={goblin.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#A855F7]">#{goblin.id}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#A3E635]" />}
                        </div>
                        <h4 className="text-xs font-bold text-[#F5F3FF] truncate">{goblin.name}</h4>
                        <p className="text-[10px] text-[#A3E635] font-medium truncate">{goblin.roleTitle}</p>
                      </div>
                    </div>
                    <p className="text-[10px] italic text-[#A1A1B5] mt-2 line-clamp-2">
                      "{goblin.motto}"
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="goblin-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
              >
                <span>Continue: Profile Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE DETAILS */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                Step 2 of 3: College & Persona
              </span>
            </div>
            <h3 className="text-2xl font-display font-black text-[#F5F3FF]">
              Tell the Clan About Yourself
            </h3>
            <p className="text-xs text-[#A1A1B5] mt-1 mb-5">
              CodeGoblins is built especially for engineering students eager to build beyond syllabus.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Samarth Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                    Goblin Username (Unique handle)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-[#A1A1B5]">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="samarth_builds"
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. RVCE Bengaluru, IIT Madras"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                    Year of Study
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="1st Year B.Tech">1st Year B.Tech (Cadet Explorer)</option>
                    <option value="2nd Year B.Tech">2nd Year B.Tech (Core Builder)</option>
                    <option value="3rd Year B.Tech">3rd Year B.Tech (Hackathon Vet)</option>
                    <option value="4th Year B.Tech">4th Year B.Tech (Senior Mentor)</option>
                    <option value="Self-Taught / Developer">Self-Taught / Dev Explorer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                  Builder Bio / Goal
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="What are you currently excited to build?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="goblin-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
              >
                <span>Continue: Skills & Interests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS & SKILLS */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Code className="w-4 h-4 text-[#A3E635]" />
              <span className="text-xs font-bold text-[#A3E635] uppercase tracking-wider">
                Step 3 of 3: Builder Interests
              </span>
            </div>
            <h3 className="text-2xl font-display font-black text-[#F5F3FF]">
              What Do You Want to Master?
            </h3>
            <p className="text-xs text-[#A1A1B5] mt-1 mb-5">
              We personalize your daily quests, squad recommendations, and hackathon alerts based on these tags.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-2">
                  Areas of Interest (Select all that excite you)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => {
                    const active = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          active
                            ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#C084FC] shadow-sm'
                            : 'bg-[#171725] border-white/5 text-[#A1A1B5] hover:text-[#F5F3FF]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[2.5]" />}
                        <span>{interest}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-2">
                  Languages & Frameworks You Know or Want to Learn
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => {
                    const active = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          active
                            ? 'bg-[#A3E635]/20 border-[#A3E635] text-[#A3E635] shadow-sm'
                            : 'bg-[#171725] border-white/5 text-[#A1A1B5] hover:text-[#F5F3FF]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[2.5]" />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleFinish}
                className="goblin-btn-green px-7 py-2.5 text-xs font-bold flex items-center gap-2 shadow-glow-green"
              >
                <Sparkles className="w-4 h-4" />
                <span>Spawn into the Goblin Den</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
