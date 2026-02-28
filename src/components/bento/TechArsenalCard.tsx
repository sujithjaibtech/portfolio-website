import { BentoCard } from "../BentoGrid";
import { Database, Code2, Navigation, Brain, Headset } from "lucide-react";

export function TechArsenalCard() {
    const skills = [
        { name: "Java", icon: <Database size={18} /> },
        { name: "Python", icon: <Code2 size={18} /> },
        { name: "React", icon: <Navigation size={18} /> },
        { name: "GenAI", icon: <Brain size={18} /> },
        { name: "ITSM", icon: <Headset size={18} /> },
    ];

    return (
        <BentoCard className="row-span-2 md:col-span-2 lg:col-span-1" delay={0.2}>
            <div className="mb-4">
                <h3 className="font-semibold text-muted-foreground">Tech Arsenal</h3>
                <p className="text-sm text-muted-foreground/80">Languages & Tools</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium border border-transparent hover:border-border transition-colors cursor-default"
                    >
                        {skill.icon}
                        {skill.name}
                    </div>
                ))}
            </div>
        </BentoCard>
    );
}
