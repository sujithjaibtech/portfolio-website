import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabase';
import { Check, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function ResumeEditor() {
    const [resumeUrl, setResumeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchResumeUrl();
    }, []);

    const fetchResumeUrl = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'resume_url')
            .single();

        if (!error && data) {
            setResumeUrl(data.value);
        } else if (error && error.code === 'PGRST116') {
            setResumeUrl('/resume.pdf');
        }
        setLoading(false);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                return;
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `resume-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload the file to Supabase storage bucket named 'resumes'
            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                console.error("Upload Error:", uploadError);
                toast.error(`Error uploading file: ${uploadError.message}`);
                return;
            }

            // Get the public URL
            const { data } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            const publicUrl = data.publicUrl;

            setResumeUrl(publicUrl);

            // Auto save the setting
            await saveUrlToSettings(publicUrl);

        } catch (error: any) {
            toast.error('Error: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const saveUrlToSettings = async (urlToSave: string) => {
        setSaving(true);
        const { error } = await supabase
            .from('settings')
            .upsert({ key: 'resume_url', value: urlToSave });

        setSaving(false);
        if (!error) {
            toast.success('Resume updated successfully!');
        } else {
            toast.error('Failed to update settings. Check console.');
        }
    };

    const handleManualSave = () => {
        saveUrlToSettings(resumeUrl);
    };

    const getFileName = (url: string) => {
        if (!url || typeof url !== 'string') return 'No file uploaded';
        if (url === '/resume.pdf') return 'Default demo resume (resume.pdf)';

        try {
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            // Remove timestamp or query params for cleaner display
            return decodeURIComponent(lastPart).split('?')[0];
        } catch (e) {
            return url;
        }
    };

    if (loading) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Resume Settings...</div>;

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 text-xl font-semibold">
                <FileText size={24} className="text-primary" />
                <h2>Resume Document</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
                Upload your latest resume PDF. This will be automatically hosted on Supabase Storage and linked to the Download button on your portfolio.
            </p>

            <div className="space-y-4">
                <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 overflow-hidden">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                            <FileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-semibold text-sm truncate">Current Resume</h3>
                            <p className="text-xs text-muted-foreground truncate" title={resumeUrl}>
                                {getFileName(resumeUrl)}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 flex gap-2">
                        {resumeUrl && resumeUrl.startsWith('http') && (
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-xs font-medium border rounded-md hover:bg-secondary transition-colors"
                            >
                                View File
                            </a>
                        )}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 disabled:opacity-50"
                        >
                            <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload New'}
                        </button>
                    </div>
                </div>

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="pt-4 border-t">
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Or enter external URL manually
                    </label>
                    <div className="flex gap-2 text-sm">
                        <input
                            type="text"
                            value={resumeUrl}
                            onChange={e => setResumeUrl(e.target.value)}
                            className="flex-1 px-3 py-1.5 border rounded-md bg-transparent"
                            placeholder="https://..."
                        />
                        <button
                            onClick={handleManualSave}
                            disabled={saving}
                            className="flex items-center gap-1 px-3 py-1.5 border hover:bg-secondary rounded-md disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : <><Check size={14} /> Save</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
