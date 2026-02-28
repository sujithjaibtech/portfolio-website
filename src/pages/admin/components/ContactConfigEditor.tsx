import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactConfigEditor() {
    const [settings, setSettings] = useState({
        contact_email: '',
        social_linkedin: '',
        social_github: '',
        social_youtube: '',
        social_instagram: '',
        social_medium: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('settings')
            .select('*');

        if (!error && data) {
            const newSettings = { ...settings };
            data.forEach(item => {
                if (item.key in newSettings) {
                    (newSettings as any)[item.key] = item.value;
                }
            });
            setSettings(newSettings);
        }
        setLoading(false);
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        const updates = Object.entries(settings).map(([key, value]) => ({
            key,
            value
        }));

        for (const update of updates) {
            if (update.value) { // Only save if there's a value or allow empty? Let's allow empty to clear links.
                await supabase.from('settings').upsert({ key: update.key, value: update.value });
            } else {
                // If empty, we can just save it as empty string
                await supabase.from('settings').upsert({ key: update.key, value: '' });
            }
        }

        setSaving(false);
        toast.success('Contact links saved successfully!');
    };

    if (loading) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Contact Settings...</div>;

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-xl font-semibold">
                    <Share2 size={24} className="text-primary" />
                    <h2>Contact & Socials</h2>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
                Update the links for your "Interested? Let's Connect" card.
                Leave a field completely blank entirely if you don't want a link for that specific platform (note: icons still remain but won't be clickable).
            </p>

            <div className="space-y-4 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        value={settings.contact_email}
                        onChange={e => handleChange('contact_email', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-transparent"
                        placeholder="yourname@domain.com"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                        <input
                            type="text"
                            value={settings.social_linkedin}
                            onChange={e => handleChange('social_linkedin', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">GitHub URL</label>
                        <input
                            type="text"
                            value={settings.social_github}
                            onChange={e => handleChange('social_github', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent"
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">YouTube URL</label>
                        <input
                            type="text"
                            value={settings.social_youtube}
                            onChange={e => handleChange('social_youtube', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent"
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Instagram URL</label>
                        <input
                            type="text"
                            value={settings.social_instagram}
                            onChange={e => handleChange('social_instagram', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent"
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Medium URL</label>
                        <input
                            type="text"
                            value={settings.social_medium}
                            onChange={e => handleChange('social_medium', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent"
                            placeholder="https://medium.com/..."
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                    >
                        <Check size={16} /> {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
}
