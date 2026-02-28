import { BentoGrid } from "./components/BentoGrid";
import { ProfileCard } from "./components/bento/ProfileCard";
import { CareerSummaryCard } from "./components/bento/CareerSummaryCard";
import { GithubContributionCard } from "./components/bento/GithubContributionCard";
import { SocialsCard, ContactCard } from "./components/bento/ContactCards";

import { EducationCard } from "./components/bento/EducationCard";
import { TechStackCard } from "./components/bento/TechStackCard";
import { BooksCard } from "./components/bento/BooksCard";
import { WorkExperienceCard } from "./components/bento/WorkExperienceCard";
import { CertificationsCard } from "./components/bento/CertificationsCard";
import { ProjectsCarouselCard } from "./components/bento/ProjectsCarouselCard";

/**
 * Main application component that defines the overall layout using a Bento Grid system.
 * Organizes the portfolio cards into logical rows for a balanced single-page experience.
 */
function App() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10 pt-10 pb-20">
            <main>
                <BentoGrid>
                    {/* Row 1 */}
                    <ProfileCard />
                    <CareerSummaryCard />
                    <GithubContributionCard />

                    {/* Row 2 */}
                    <EducationCard />
                    <WorkExperienceCard />
                    <TechStackCard />

                    {/* Row 3 */}
                    <CertificationsCard />
                    <ProjectsCarouselCard />

                    {/* Row 4 */}
                    <SocialsCard />
                    <BooksCard />
                    <ContactCard />
                </BentoGrid>
            </main>
        </div>
    )
}

export default App
