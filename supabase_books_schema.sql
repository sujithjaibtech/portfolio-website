-- Run this snippet in the Supabase SQL editor to create the books table

create table public.books (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    author text not null,
    image_url text not null,
    status text not null, -- 'current', 'past1', 'past2'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.books enable row level security;
create policy "Allow public read access on books" on public.books for select using (true);
create policy "Allow auth users all on books" on public.books for all using (auth.role() = 'authenticated');

-- Insert initial mockup data
insert into public.books (title, author, image_url, status)
values
('Current Read Title', 'Current Author', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop', 'current'),
('Past Book 1 Title', 'Author 1', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop', 'past1'),
('Past Book 2 Title', 'Author 2', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop', 'past2');
