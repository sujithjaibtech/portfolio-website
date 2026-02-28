import { BentoCard } from "../BentoGrid";
import { FolderGit2, CalendarDays } from "lucide-react";

export function StatCard({
    value,
    label,
    icon,
    delay
}: {
    value: string;
    label: string;
    icon: React.ReactNode;
    delay: number;
}) {
    return (
        <BentoCard className="flex flex-col justify-center items-center text-center row-span-1" delay={delay}>
            <div className="p-3 bg-secondary rounded-full mb-3">
                {icon}
            </div>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </BentoCard>
    );
}

export function StatsSection() {
    return (
        <>
            <StatCard
                value="10+"
                label="Projects Delivered"
                icon={<FolderGit2 size={24} className="text-primary" />}
                delay={0.3}
            />
            <StatCard
                value="5+"
                label="Years Experience"
                icon={<CalendarDays size={24} className="text-primary" />}
                delay={0.4}
            />
        </>
    );
}
