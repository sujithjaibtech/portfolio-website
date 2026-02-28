import { BentoCard } from "../BentoGrid";

/**
 * CareerSummaryCard provides a high-level professional introduction
 * highlighting core skills, experience, and value propositions.
 */
export function CareerSummaryCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-6 lg:col-span-4 row-span-2 flex flex-col justify-start" delay={0.2}>
            <div className="flex justify-start items-start mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Career Summary
                </span>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
                Customer-focused Product & Application Support Specialist with 3+ years of experience in SaaS support, L2/L3 troubleshooting, and SLA-driven incident management. Strong track record of supporting high-value enterprise customers, preparing accurate SLA/incident reports, and authoring knowledge base articles. Flexible to work in rotational shifts.
            </p>
        </BentoCard>
    );
}
