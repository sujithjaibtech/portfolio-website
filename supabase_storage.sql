-- Run this snippet in the Supabase SQL editor to create the storage bucket for your resumes

-- 1. Insert a new public bucket called 'resumes'
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', true)
on conflict (id) do nothing;

-- 2. Allow public access to view/download the resumes
create policy "Allow public read access on resumes" 
on storage.objects for select 
using ( bucket_id = 'resumes' );

-- 3. Allow only authenticated users (you) to upload/update/delete resumes
create policy "Allow auth users all on resumes" 
on storage.objects for all 
using ( auth.role() = 'authenticated' and bucket_id = 'resumes' );
