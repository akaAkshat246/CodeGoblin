-- CodeGoblins Enterprise PostgreSQL Schema & RLS Policies
-- Target: Supabase / PostgreSQL 15+

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM (
  'Guest', 
  'Member', 
  'Moderator', 
  'Event Organizer', 
  'Mentor', 
  'Administrator'
);

CREATE TYPE goblin_archetype AS ENUM (
  'Leader', 'Architect', 'Creator', 'Competitor', 
  'Strategist', 'Debugger', 'Builder', 'Explorer', 'Hacker'
);

CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE order_status AS ENUM ('created', 'attempted', 'paid', 'failed', 'refunded');

-- 3. PROFILES TABLE (Mirrors Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role DEFAULT 'Member' NOT NULL,
  archetype goblin_archetype DEFAULT 'Builder' NOT NULL,
  avatar_goblin_id INT DEFAULT 1 NOT NULL,
  level INT DEFAULT 1 NOT NULL,
  xp INT DEFAULT 0 NOT NULL,
  streak_days INT DEFAULT 0 NOT NULL,
  longest_streak INT DEFAULT 0 NOT NULL,
  college TEXT,
  year_of_study TEXT,
  bio TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  is_mentor BOOLEAN DEFAULT FALSE,
  reputation_score INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. KNOWLEDGE ARTICLES & GUIDES (SEO Engine)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  cover_image_url TEXT,
  estimated_read_time INT DEFAULT 5,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. WORKSHOPS & HACKATHONS
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organizer TEXT NOT NULL,
  event_type TEXT DEFAULT 'Workshop' NOT NULL,
  format TEXT DEFAULT 'Online' NOT NULL,
  location TEXT,
  price_inr INT DEFAULT 0 NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  registration_deadline TIMESTAMPTZ NOT NULL,
  prize_pool TEXT,
  official_url TEXT,
  required_skills TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Upcoming' NOT NULL,
  team_size TEXT DEFAULT 'Individual' NOT NULL,
  description TEXT NOT NULL,
  banner_image TEXT NOT NULL,
  instructor_name TEXT,
  instructor_role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. EVENT REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  order_id TEXT,
  payment_status order_status DEFAULT 'paid' NOT NULL,
  attended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(event_id, user_id)
);

-- 7. PROJECT SHOWCASE (Project Forge)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar_goblin_id INT DEFAULT 1,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT NOT NULL,
  live_demo_url TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'Shipped' NOT NULL,
  moderation_status moderation_status DEFAULT 'pending' NOT NULL,
  likes INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. DIGITAL RESOURCES STORE
CREATE TABLE IF NOT EXISTS public.resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT NOT NULL,
  file_format TEXT NOT NULL,
  file_size TEXT NOT NULL,
  downloads_count INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  price_inr INT DEFAULT 0,
  code_snippet TEXT,
  preview_content TEXT,
  download_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. AUDIT LOGS (Security & Governance)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_name TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  status TEXT DEFAULT 'info' NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. TRIGGER: AUTO-CREATE PROFILE ON SUPABASE AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, email, role, archetype, avatar_goblin_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    'Member',
    'Builder',
    FLOOR(RANDOM() * 9 + 1)::INT
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, User write own profile
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Articles: Published articles public, admins can write
CREATE POLICY "Published articles are readable by all" 
  ON public.articles FOR SELECT USING (is_published = true);

-- Events: Public read
CREATE POLICY "Events are readable by everyone" 
  ON public.events FOR SELECT USING (true);

-- Event Registrations: Users can read own registrations
CREATE POLICY "Users can view own registrations" 
  ON public.event_registrations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" 
  ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Projects: Approved projects viewable by all, Users insert their own
CREATE POLICY "Approved projects viewable by everyone" 
  ON public.projects FOR SELECT USING (moderation_status = 'approved');

CREATE POLICY "Users can submit own project" 
  ON public.projects FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own pending project" 
  ON public.projects FOR UPDATE USING (auth.uid() = author_id AND moderation_status = 'pending');

-- Resources: Public read
CREATE POLICY "Resources are readable by everyone" 
  ON public.resources FOR SELECT USING (true);

-- Audit Logs: Admin read-only
CREATE POLICY "Audit logs viewable by staff" 
  ON public.audit_logs FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('Administrator', 'Moderator')
    )
  );

