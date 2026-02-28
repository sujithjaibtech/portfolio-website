import { BentoCard } from "../BentoGrid";
import { Github } from "lucide-react";
import GitHubCalendar from "react-github-calendar";

/**
 * GithubContributionCard displays the user's recent GitHub activity
 * using a calendar-style heatmap for visual engagement.
 */
export function GithubContributionCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-12 lg:col-span-4 row-span-2 flex flex-col justify-start overflow-hidden group cursor-pointer" delay={0.3}>
            <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Github size={14} /> GitHub
                </span>
            </div>

            <h2 className="text-2xl font-bold mt-4 mb-2">Contributions</h2>

            <div className="flex-1 flex items-center justify-center w-full mt-4">
                <div className="w-full max-w-full flex justify-center">
                    <GitHubCalendar
                        username="sujithjaibtech"
                        colorScheme="light"
                        blockSize={12}
                        blockMargin={4}
                        fontSize={12}
                        transformData={(data) => data.slice(-120)}
                    />
                </div>
            </div>
        </BentoCard>
    );
}
