import { useState, useEffect } from "react";
import { BentoCard } from "../BentoGrid";
import { BriefcaseBusiness } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function WorkExperienceCard() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            const { data } = await supabase
                .from('work_experience')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setExperiences(data);
            setLoading(false);
        }
        fetchExperiences();
    }, []);

    return (
        <BentoCard
            className="col-span-1 md:col-span-6 lg:col-span-6 row-span-2 flex flex-col justify-start overflow-hidden"
            delay={0.5}
            hoverGradient="radial-gradient(ellipse at 10% 20%, rgba(3,169,244,0.10) 0%, transparent 60%)"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <BriefcaseBusiness size={14} /> Work Experience
                </span>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-3 -mr-3 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="flex flex-col gap-2 p-4 rounded-xl border bg-card/50">
                            <div className="flex justify-between items-start gap-4 mb-1">
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm xl:text-base leading-tight mb-1">{exp.title}</h3>
                                    <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                        {exp.company} | {exp.location}
                                    </span>
                                </div>
                                <span className="text-[10px] xl:text-xs text-muted-foreground font-medium whitespace-nowrap shrink-0 pt-1">{exp.period}</span>
                            </div>

                            <div className="space-y-4 pt-1">
                                <div>
                                    <h4 className="text-xs font-semibold text-foreground mb-1.5">Roles and responsibilities:</h4>
                                    <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 marker:text-muted-foreground/60">
                                        {exp.responsibilities.map((task: string, i: number) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </BentoCard>
    );
}
