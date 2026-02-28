import { BentoCard } from "../BentoGrid";
import { BookOpen } from "lucide-react";

/**
 * BooksCard displays the "Currently Reading" section.
 * On hover, the current book lifts and two previously-read books fan out
 * on either side for a layered, interactive book-stack effect.
 * Update image src props in this file to reflect your actual books.
 */
export function BooksCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-6 lg:col-span-3 row-span-2 flex flex-col justify-start" delay={0.6}>
            <div className="flex justify-between items-start mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <BookOpen size={14} /> Currently Reading
                </span>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                {/* Hover group container */}
                <div className="relative group flex items-center justify-center w-full h-40">

                    {/* Left Past Book */}
                    <div className="absolute z-10 w-24 h-32 rounded-md shadow bg-muted border overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-10 -rotate-0 group-hover:-rotate-12">
                        {/* Replace with /books/past1.jpg */}
                        <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop" alt="Past Book 1" className="w-full h-full object-cover" />
                    </div>

                    {/* Right Past Book */}
                    <div className="absolute z-10 w-24 h-32 rounded-md shadow bg-muted border overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-10 rotate-0 group-hover:rotate-12">
                        {/* Replace with /books/past2.jpg */}
                        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop" alt="Past Book 2" className="w-full h-full object-cover" />
                    </div>

                    {/* Center Current Book */}
                    <div className="relative z-20 w-28 h-40 rounded-md shadow-xl bg-card border overflow-hidden transition-transform duration-500 group-hover:-translate-y-4">
                        {/* Replace with /books/current.jpg */}
                        <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop" alt="Current Book" className="w-full h-full object-cover" />

                        {/* Tooltip hint that shows on hover */}
                        <div className="absolute inset-x-0 bottom-0 bg-background/90 backdrop-blur text-xs p-2 text-center font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            Current Read
                        </div>
                    </div>

                </div>
            </div>
        </BentoCard>
    );
}
