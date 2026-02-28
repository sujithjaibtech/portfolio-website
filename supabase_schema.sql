-- Run this entirely in the Supabase SQL editor:

-- 1. Create Tables
create table public.work_experience (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    company text not null,
    location text not null,
    period text not null,
    responsibilities text[] not null default '{}',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    order_index integer default 0
);

create table public.tech_stack (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    order_index integer default 0
);

create table public.certifications (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    issuer text not null,
    year text not null,
    link text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    order_index integer default 0
);

create table public.projects (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text not null,
    image_url text not null,
    link text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    order_index integer default 0
);

create table public.settings (
    key text primary key,
    value text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Setup Row Level Security (RLS)
-- Enable RLS
alter table public.work_experience enable row level security;
alter table public.tech_stack enable row level security;
alter table public.certifications enable row level security;
alter table public.projects enable row level security;
alter table public.settings enable row level security;

-- Create Policies (Public read access)
create policy "Allow public read access on work_experience" on public.work_experience for select using (true);
create policy "Allow public read access on tech_stack" on public.tech_stack for select using (true);
create policy "Allow public read access on certifications" on public.certifications for select using (true);
create policy "Allow public read access on projects" on public.projects for select using (true);
create policy "Allow public read access on settings" on public.settings for select using (true);

-- Create Policies (Authenticated users can do all)
create policy "Allow auth users all on work_experience" on public.work_experience for all using (auth.role() = 'authenticated');
create policy "Allow auth users all on tech_stack" on public.tech_stack for all using (auth.role() = 'authenticated');
create policy "Allow auth users all on certifications" on public.certifications for all using (auth.role() = 'authenticated');
create policy "Allow auth users all on projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow auth users all on settings" on public.settings for all using (auth.role() = 'authenticated');

-- 3. Insert Initial Mock Data
insert into public.work_experience (title, company, location, period, responsibilities, order_index)
values
('Production Technical Support Engineer', 'TCS', 'CHENNAI', 'July 2022 - Present', array['Provided L2/L3 support for applications on Websphere, JBoss servers, and GCP Kubernetes.', 'Managed incidents via ServiceNow and consistently met SLAs.', 'Proven knowledge with ITSM process.', 'Worked with Linux servers for DB migration activities.', 'Deployed apps using Jenkins and Kubernetes, improved CI/CD cycles.', 'Assisted migration of legacy apps to GCP, analyzed integration points.'], 0);

insert into public.tech_stack (name, order_index)
values
('Java', 0), ('Springboot', 1), ('GenAI', 2), ('PromptEngineering', 3), ('Postgres', 4), ('GCP', 5), ('STRIIM', 6), ('Guidewire', 7), ('ITSM', 8);

insert into public.certifications (name, issuer, year, link, order_index)
values
('Microsoft Github Copilot Certification', 'MICROSOFT', '2026', '#', 0),
('Prompt Engineering For Web Developers', 'UDEMY', '2026', '#', 1),
('GCP Associate Cloud Engineer', 'GOOGLE', '2025', '#', 2),
('Oracle Certified Java SE Programmer', 'ORACLE', '2024', '#', 3);

insert into public.projects (title, description, image_url, link, order_index)
values
('Project 1', 'Awesome dashboard design with analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop', '#', 0),
('Project 2', 'E-commerce platform integration', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop', '#', 1);

insert into public.settings (key, value) values ('resume_url', '/resume.pdf');
