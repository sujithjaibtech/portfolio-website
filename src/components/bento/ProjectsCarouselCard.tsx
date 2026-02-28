import { useState, useEffect } from "react";
import { BentoCard } from "../BentoGrid";
import { FolderOpen, ExternalLink } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function ProjectsCarouselCard() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setProjects(data);
            setLoading(false);
        }
        fetchProjects();
    }, []);

    // Create a duplicated array so the marquee loops smoothly
    const marqueeItems = [...projects, ...projects];

    return (
        <BentoCard
            className="col-span-1 md:col-span-12 lg:col-span-6 row-span-2 flex flex-col justify-start overflow-hidden"
            delay={0.9}
            hoverGradient="radial-gradient(ellipse at 85% 15%, rgba(234,67,53,0.08) 0%, transparent 60%)"
        >
            <div className="flex justify-between items-start mb-4 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <FolderOpen size={14} /> Projects
                </span>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>
            ) : projects.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">No projects yet.</div>
            ) : (
                <div className="flex-1 relative -mx-2 px-2 overflow-hidden flex items-center pt-4 pb-4">
                    <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] group/carousel">
                        {marqueeItems.map((project, i) => (
                            <a
                                key={`${project.id}-${i}`}
                                href={project.link && project.link !== '#' ? project.link : undefined}
                                target={project.link !== '#' ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="group relative flex-none w-[200px] h-[220px] sm:w-[240px] rounded-xl overflow-hidden border bg-card block shadow-sm transition-all duration-500 group-hover/carousel:opacity-60 group-hover/carousel:scale-[0.98] group-hover/carousel:blur-[1px] hover:!opacity-100 hover:!scale-105 hover:!blur-0 hover:shadow-md hover:!rounded-xl hover:z-30 transform-gpu"
                            >
                                <div className="absolute inset-0 bg-secondary/20 z-10 group-hover:bg-transparent transition-colors duration-300" />
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-32 object-cover object-center transition-transform duration-500"
                                />
                                <div className="p-4 bg-card shrink-0 flex flex-col justify-center h-[92px]">
                                    <h3 className="font-semibold text-foreground text-sm truncate pr-6">{project.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 truncate">{project.description}</p>
                                </div>
                                {project.link && project.link !== '#' && (
                                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-background rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <ExternalLink size={10} className="text-foreground" />
                                    </div>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </BentoCard>
    );
}
