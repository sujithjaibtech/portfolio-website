import { BentoCard } from "../BentoGrid";
import { GraduationCap } from "lucide-react";

/**
 * EducationCard presents a vertical timeline of academic milestones,
 * using a list indicator with date and grade details.
 */
export function EducationCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-6 lg:col-span-3 row-span-2 flex flex-col justify-start" delay={0.4}>
            <div className="flex justify-between items-start mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <GraduationCap size={14} /> Education
                </span>
            </div>

            <div className="relative border-l-2 border-border/60 ml-3 pl-6 space-y-8 mt-6">
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-sm" />
                    <h3 className="font-semibold text-foreground text-sm xl:text-base leading-tight">Sri Sairam Institute of Technology <span className="text-muted-foreground text-xs xl:text-sm font-normal ml-1 whitespace-nowrap">(2022)</span></h3>
                    <p className="text-sm text-muted-foreground mt-1.5 font-medium">B.Tech Information Technology (8.2 CGPA)</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-muted border-2 border-muted-foreground/30 ring-4 ring-background shadow-sm" />
                    <h3 className="font-semibold text-foreground text-sm xl:text-base leading-tight">Zion Matric Hr. Sec. School, Chennai <span className="text-muted-foreground text-xs xl:text-sm font-normal ml-1 whitespace-nowrap">(2018)</span></h3>
                    <p className="text-sm text-muted-foreground mt-1.5 font-medium">HSC (80%)</p>
                </div>
            </div>
        </BentoCard>
    );
}
