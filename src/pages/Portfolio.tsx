import { BentoGrid } from "../components/BentoGrid";
import { ProfileCard } from "../components/bento/ProfileCard";
import { CareerSummaryCard } from "../components/bento/CareerSummaryCard";
import { EducationCard } from "../components/bento/EducationCard";
import { GithubContributionCard } from "../components/bento/GithubContributionCard";
import { ProjectsCarouselCard } from "../components/bento/ProjectsCarouselCard";
import { ContactCard } from "../components/bento/ContactCards";
import { WorkExperienceCard } from "../components/bento/WorkExperienceCard";
import { TechStackCard } from "../components/bento/TechStackCard";
import { CertificationsCard } from "../components/bento/CertificationsCard";
import { BooksCard } from "../components/bento/BooksCard";

/**
 * Portfolio page component.
 * Renders the full bento grid with public components.
 */
export default function Portfolio() {
    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/10">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[#f8fafc] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

            <main className="py-12 md:py-24 relative overflow-hidden">
                <BentoGrid>
                    {/* Row 1: Profile and Summary */}
                    <ProfileCard />
                    <CareerSummaryCard />
                    <GithubContributionCard />

                    {/* Row 2: Education, Work Experience, Tech Stack */}
                    <EducationCard />
                    <WorkExperienceCard />
                    <TechStackCard />

                    {/* Row 3: Certifications and Projects */}
                    <CertificationsCard />
                    <ProjectsCarouselCard />

                    {/* Row 4: Books and Contact */}
                    <BooksCard />
                    <ContactCard />
                </BentoGrid>
            </main>
        </div>
    );
}
