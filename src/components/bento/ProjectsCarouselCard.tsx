import { BentoCard } from "../BentoGrid";
import { FolderOpen, ExternalLink } from "lucide-react";

const projects = [
    {
        name: "Enterprise Service Portal",
        desc: "GenAI IT Support",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        link: "#"
    },
    {
        name: "Data Processing Pipeline",
        desc: "Python & Kafka",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
        link: "#"
    },
    {
        name: "Cloud Migration Strategy",
        desc: "AWS Architecture",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop",
        link: "#"
    },
    {
        name: "React Dashboard",
        desc: "Real-time analytics",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
        link: "#"
    }
];

/**
 * ProjectsCarouselCard displays a horizontally auto-scrolling carousel of project cards.
 * The marquee animation pauses on hover so users can interact with individual items.
 * Update the `projects` array with real project data, images, and links.
 */
export function ProjectsCarouselCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-12 lg:col-span-6 row-span-2 flex flex-col justify-start overflow-hidden" delay={0.9}>
            <div className="flex justify-between items-start mb-4 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <FolderOpen size={14} /> Projects
                </span>
            </div>

            {/* Auto Scrolling Marquee Container */}
            <div className="flex-1 relative -mx-2 px-2 overflow-hidden flex items-center pt-4 pb-4">
                <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] group/carousel">
                    {[...projects, ...projects].map((project, i) => (
                        <a
                            key={i}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex-none w-[200px] h-[220px] sm:w-[240px] rounded-xl overflow-hidden border bg-card block shadow-sm transition-all duration-500 group-hover/carousel:opacity-60 group-hover/carousel:scale-[0.98] group-hover/carousel:blur-[1px] hover:!opacity-100 hover:!scale-105 hover:!blur-0 hover:shadow-md hover:!rounded-xl hover:z-30 transform-gpu"
                        >
                            <div className="absolute inset-0 bg-secondary/20 z-10 group-hover:bg-transparent transition-colors duration-300" />
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-32 object-cover object-center transition-transform duration-500"
                            />
                            <div className="p-4 bg-card shrink-0 flex flex-col justify-center h-[92px]">
                                <h3 className="font-semibold text-foreground text-sm truncate pr-6">{project.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1 truncate">{project.desc}</p>
                            </div>
                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-background rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <ExternalLink size={10} className="text-foreground" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}
