import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Check, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function BooksEditor() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('books')
            .select('*');

        if (!error && data) {
            // Ensure we have exactly 3 objects (current, past1, past2)
            const map = {
                current: data.find(b => b.status === 'current') || { status: 'current', title: '', author: '', image_url: '' },
                past1: data.find(b => b.status === 'past1') || { status: 'past1', title: '', author: '', image_url: '' },
                past2: data.find(b => b.status === 'past2') || { status: 'past2', title: '', author: '', image_url: '' }
            };
            setBooks([map.current, map.past1, map.past2]);
        }
        setLoading(false);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newBooks = [...books];
        newBooks[index] = { ...newBooks[index], [field]: value };
        setBooks(newBooks);
    };

    const handleSave = async () => {
        setSaving(true);
        for (const book of books) {
            if (book.id) {
                await supabase.from('books').update({
                    title: book.title,
                    author: book.author,
                    image_url: book.image_url
                }).eq('id', book.id);
            } else {
                await supabase.from('books').insert([book]);
            }
        }
        setSaving(false);
        fetchBooks();
        toast.success('Books updated successfully!');
    };

    if (loading) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Books...</div>;

    const labels = ['Currently Reading', 'Past Book (Left Fan)', 'Past Book (Right Fan)'];

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-6 text-xl font-semibold">
                <BookOpen size={24} className="text-primary" />
                <h2>Reading Shelf</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
                Update the books displayed in your shelf. Add image URLs (like from Goodreads or Unsplash) and titles.
            </p>

            <div className="space-y-6">
                {books.map((book, idx) => (
                    <div key={idx} className="p-4 border rounded-xl bg-secondary/10">
                        <h3 className="font-semibold text-sm mb-3">{labels[idx]}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">Book Title</label>
                                <input
                                    type="text"
                                    value={book.title || ''}
                                    onChange={e => handleChange(idx, 'title', e.target.value)}
                                    className="w-full px-3 py-1.5 border rounded-md text-sm bg-background"
                                    placeholder="e.g. Clean Code"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Author</label>
                                <input
                                    type="text"
                                    value={book.author || ''}
                                    onChange={e => handleChange(idx, 'author', e.target.value)}
                                    className="w-full px-3 py-1.5 border rounded-md text-sm bg-background"
                                    placeholder="e.g. Robert C. Martin"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Cover Image URL</label>
                            <input
                                type="text"
                                value={book.image_url || ''}
                                onChange={e => handleChange(idx, 'image_url', e.target.value)}
                                className="w-full px-3 py-1.5 border rounded-md text-sm bg-background"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                    <Check size={16} /> {saving ? 'Saving...' : 'Save Books'}
                </button>
            </div>
        </div>
    );
}
