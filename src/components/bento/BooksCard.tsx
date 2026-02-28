import { useState, useEffect } from "react";
import { BentoCard } from "../BentoGrid";
import { BookOpen } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function BooksCard() {
    const [books, setBooks] = useState({
        current: { title: 'Current Read', author: 'Author', image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop' },
        past1: { title: 'Past Book 1', author: 'Author', image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' },
        past2: { title: 'Past Book 2', author: 'Author', image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop' }
    });

    const [hoveredBook, setHoveredBook] = useState<'current' | 'past1' | 'past2' | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            const { data, error } = await supabase.from('books').select('*');
            if (!error && data && data.length > 0) {
                setBooks({
                    current: data.find((b: any) => b.status === 'current') || books.current,
                    past1: data.find((b: any) => b.status === 'past1') || books.past1,
                    past2: data.find((b: any) => b.status === 'past2') || books.past2,
                });
            }
        }
        fetchBooks();
    }, []);

    const activeBook = hoveredBook ? books[hoveredBook] : books.current;

    return (
        <BentoCard
            className="col-span-1 md:col-span-12 lg:col-span-4 row-span-2 flex flex-col justify-start"
            delay={0.6}
            hoverGradient="radial-gradient(ellipse at 50% 90%, rgba(255,152,0,0.10) 0%, transparent 60%)"
        >
            <div className="flex justify-between items-start mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <BookOpen size={14} /> Currently Reading
                </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 pt-2 group cursor-default">
                <div className="relative flex items-center justify-center w-full h-40">

                    {/* Left Past Book */}
                    <div
                        onMouseEnter={() => setHoveredBook('past1')}
                        onMouseLeave={() => setHoveredBook(null)}
                        className="absolute z-10 w-24 h-32 rounded-md shadow bg-muted border overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-14 -rotate-0 group-hover:-rotate-12 cursor-pointer hover:z-30 hover:scale-105"
                    >
                        <img src={books.past1.image_url} alt={books.past1.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Right Past Book */}
                    <div
                        onMouseEnter={() => setHoveredBook('past2')}
                        onMouseLeave={() => setHoveredBook(null)}
                        className="absolute z-10 w-24 h-32 rounded-md shadow bg-muted border overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-14 rotate-0 group-hover:rotate-12 cursor-pointer hover:z-30 hover:scale-105"
                    >
                        <img src={books.past2.image_url} alt={books.past2.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Center Current Book */}
                    <div
                        onMouseEnter={() => setHoveredBook('current')}
                        onMouseLeave={() => setHoveredBook(null)}
                        className="relative z-20 w-28 h-40 rounded-md shadow-xl bg-card border overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 cursor-pointer hover:scale-105"
                    >
                        <img src={books.current.image_url} alt={books.current.title} className="w-full h-full object-cover" />
                    </div>

                </div>

                {/* Hover Details underneath */}
                <div className="mt-5 text-center opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <span className="block font-bold text-sm text-foreground">{activeBook.title}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{activeBook.author}</span>
                </div>
            </div>
        </BentoCard>
    );
}
