import { BentoCard } from "../BentoGrid";
import { BriefcaseBusiness } from "lucide-react";

/**
 * WorkExperienceCard displays detailed professional history in a scrollable sub-card layout.
 * Each role includes a title, organisation badge, date range, and a bulleted responsibilities list.
 * The container uses a hidden scrollbar pattern identical to the CertificationsCard.
 */
export function WorkExperienceCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-6 lg:col-span-6 row-span-2 flex flex-col justify-start overflow-hidden" delay={0.5}>
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <BriefcaseBusiness size={14} /> Work Experience
                </span>
            </div>

            {/* Scrollable container with hidden scrollbar */}
            <div className="flex-1 overflow-y-auto pr-3 -mr-3 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card/50">
                    <div className="flex justify-between items-start gap-4 mb-1">
                        <div>
                            <h3 className="font-semibold text-foreground text-sm xl:text-base leading-tight mb-1">Production Technical Support Engineer</h3>
                            <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                TCS | Chennai
                            </span>
                        </div>
                        <span className="text-[10px] xl:text-xs text-muted-foreground font-medium whitespace-nowrap shrink-0 pt-1">July 2022 - Present</span>
                    </div>

                    <div className="space-y-4 pt-1">
                        <div>
                            <h4 className="text-xs font-semibold text-foreground mb-1.5">Roles and responsibilities:</h4>
                            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 marker:text-muted-foreground/60">
                                <li>Provided L2/L3 support for applications on Websphere, JBoss servers, and GCP Kubernetes.</li>
                                <li>Managed incidents via ServiceNow and consistently met SLAs.</li>
                                <li>Proven knowledge with ITSM process.</li>
                                <li>Worked with Linux servers for DB migration activities.</li>
                                <li>Deployed apps using Jenkins and Kubernetes, improved CI/CD cycles.</li>
                                <li>Assisted migration of legacy apps to GCP, analyzed integration points.</li>
                                <li>Collaborated with Dev, Infra, DBA and various teams to resolve issues and improved uptime.</li>
                                <li>Maintained documentation to reduce support tickets by ~20%.</li>
                                <li>Used GitHub for version control and Veracode for security scans.</li>
                                <li>Perform log analysis using ELK stack.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </BentoCard>
    );
}
