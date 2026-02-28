import { BentoCard } from "../BentoGrid";
import { Code2 } from "lucide-react";

/**
 * TechStackCard displays the user's core technology proficiencies as pill chips.
 * The container is scrollable (with a hidden scrollbar) to accommodate future additions.
 * Add new items to the `stack` array to expand the list.
 */
export function TechStackCard() {
    const stack = [
        "Java", "Springboot", "GenAI", "PromptEngineering",
        "Postgres", "GCP", "STRIIM", "Guidewire", "ITSM"
    ];

    return (
        <BentoCard className="col-span-1 md:col-span-6 lg:col-span-3 row-span-2 flex flex-col justify-start overflow-hidden" delay={0.5}>
            <div className="flex justify-between items-start mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Code2 size={14} /> Tech Stack
                </span>
            </div>

            {/* Scrollable container with hidden scrollbar */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="flex flex-wrap content-start items-center gap-2 mt-2 pb-6">
                    {stack.map((tech) => (
                        <div key={tech} className="px-3 py-1.5 rounded-full bg-secondary/80 border text-xs sm:text-sm font-medium text-secondary-foreground hover:bg-secondary cursor-default transition-colors shadow-sm">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </BentoCard>
    );
}
