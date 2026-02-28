import { BentoCard } from "../BentoGrid";
import { ArrowUpRight, FolderOpen } from "lucide-react";

export function WorksCard() {
    return (
        <BentoCard className="md:col-span-12 lg:col-span-8 row-span-2 group cursor-pointer" delay={0.4}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2">
                        <FolderOpen size={16} /> Projects
                    </h3>
                    <h2 className="text-2xl font-bold mt-1">Works Gallery</h2>
                </div>
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </div>

            <div className="mt-auto space-y-4">
                {[
                    { name: "Enterprise Service Portal", desc: "GenAI IT Support" },
                    { name: "Data Processing Pipeline", desc: "Python & Kafka" }
                ].map((work, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-card/50 hover:bg-secondary/50 transition-colors">
                        <span className="font-medium text-foreground">{work.name}</span>
                        <span className="text-sm text-muted-foreground mt-1 sm:mt-0">{work.desc}</span>
                    </div>
                ))}
                <div className="w-full flex justify-center pt-2">
                    <span className="text-sm font-medium text-primary hover:underline">View All Projects →</span>
                </div>
            </div>
        </BentoCard>
    );
}
