import { useState, useEffect } from "react";
import { BentoCard } from "../BentoGrid";
import { Code2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function TechStackCard() {
    const [stack, setStack] = useState<{ name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTechStack() {
            const { data } = await supabase
                .from('tech_stack')
                .select('name')
                .order('order_index', { ascending: true });
            if (data) setStack(data);
            setLoading(false);
        }
        fetchTechStack();
    }, []);

    return (
        <BentoCard
            className="col-span-1 md:col-span-6 lg:col-span-3 row-span-2 flex flex-col justify-start overflow-hidden"
            delay={0.5}
            hoverGradient="radial-gradient(ellipse at 80% 10%, rgba(0,188,212,0.10) 0%, transparent 60%)"
        >
            <div className="flex justify-between items-start mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Code2 size={14} /> Tech Stack
                </span>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-2 -mr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <div className="flex flex-wrap content-start items-center gap-2 mt-2 pb-6">
                        {stack.map((tech, i) => (
                            <div key={i} className="px-3 py-1.5 rounded-full bg-secondary/80 border text-xs sm:text-sm font-medium text-secondary-foreground hover:bg-secondary cursor-default transition-colors shadow-sm">
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </BentoCard>
    );
}
