import { supabase } from '../../lib/supabase';
import WorkExperienceEditor from './components/WorkExperienceEditor';
import TechStackEditor from './components/TechStackEditor';
import CertificationsEditor from './components/CertificationsEditor';
import ResumeEditor from './components/ResumeEditor';
import BooksEditor from './components/BooksEditor';
import ProjectsEditor from './components/ProjectsEditor';
import ContactConfigEditor from './components/ContactConfigEditor';

export default function Dashboard() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Portfolio Admin CMS</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors text-sm font-medium"
                    >
                        Log out
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Settings / General */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <ResumeEditor />
                            <ContactConfigEditor />
                        </div>
                        <div>
                            <BooksEditor />
                        </div>
                    </div>

                    {/* Active Editors */}
                    <WorkExperienceEditor />
                    <TechStackEditor />
                    <CertificationsEditor />
                    <ProjectsEditor />
                </div>
            </main>
        </div>
    );
}
