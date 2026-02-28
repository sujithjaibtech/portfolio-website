import { useState, useEffect } from "react";
import { BentoCard } from "../BentoGrid";
import { MapPin, Briefcase, Download } from "lucide-react";
import { DynamicTypist } from "../DynamicTypist";
import { supabase } from "../../lib/supabase";

export function ProfileCard() {
    const [resumeUrl, setResumeUrl] = useState('/resume.pdf');

    useEffect(() => {
        async function fetchResume() {
            const { data, error } = await supabase
                .from('settings')
                .select('value')
                .eq('key', 'resume_url')
                .single();
            if (!error && data) {
                setResumeUrl(data.value);
            }
        }
        fetchResume();
    }, []);


    return (
        <BentoCard
            className="col-span-1 md:col-span-6 lg:col-span-4 row-span-2 bg-secondary/50 flex flex-col justify-start"
            delay={0.1}
            hoverGradient="radial-gradient(ellipse at 15% 15%, rgba(66,133,244,0.11) 0%, transparent 65%)"
        >
            <div className="flex justify-between items-start">
                <span className="inline-flex items-center px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    About me
                </span>
                <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Open to Work
                </span>
            </div>

            <div className="mt-6">
                <h1 className="text-2xl lg:text-4xl font-bold tracking-tight mb-2">
                    Sujith Jayachandran
                </h1>

                <div className="text-lg md:text-xl font-medium mb-5 flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground">I am</span>
                    <DynamicTypist
                        words={["Tech Support Engineer 💻", "GenAI Enthusiast 🤖", "YouTuber 📹", "Dog lover 🐶"]}
                        delayBetweenWords={3000}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-background rounded-full border text-[11px] xl:text-xs font-medium">
                        <Briefcase size={12} className="text-muted-foreground" />
                        Tata Consultancy Services
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-background rounded-full border text-[11px] xl:text-xs font-medium">
                        <MapPin size={12} className="text-muted-foreground" />
                        Chennai, India
                    </div>
                </div>

                <div className="mt-auto pt-6">
                    <a
                        href={resumeUrl}
                        download="Sujith_Jayachandran_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-sm hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Download size={16} />
                        Download Resume
                    </a>
                </div>
            </div>
        </BentoCard>
    );
}
