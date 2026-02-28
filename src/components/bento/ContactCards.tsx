import { BentoCard } from "../BentoGrid";
import { Github, Linkedin, Mail, Instagram, Youtube, Download, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export function ContactCard() {
    const [resumeUrl, setResumeUrl] = useState('/resume.pdf');
    const [email, setEmail] = useState('sujithjaibtech@gmail.com');
    const [socialLinks, setSocialLinks] = useState<any>({
        LinkedIn: '#',
        GitHub: '#',
        YouTube: '#',
        Instagram: '#',
        Medium: '#'
    });

    useEffect(() => {
        async function fetchSettings() {
            const { data, error } = await supabase
                .from('settings')
                .select('key, value');

            if (!error && data) {
                const map: any = {};
                data.forEach(item => {
                    map[item.key] = item.value;
                });

                if (map.resume_url) setResumeUrl(map.resume_url);
                if (map.contact_email) setEmail(map.contact_email);

                setSocialLinks({
                    LinkedIn: map.social_linkedin || '',
                    GitHub: map.social_github || '',
                    YouTube: map.social_youtube || '',
                    Instagram: map.social_instagram || '',
                    Medium: map.social_medium || ''
                });
            }
        }
        fetchSettings();
    }, []);

    const isExternalLink = resumeUrl.startsWith('http');

    const rawSocials = [
        { name: "LinkedIn", icon: <Linkedin size={18} />, link: socialLinks.LinkedIn },
        { name: "GitHub", icon: <Github size={18} />, link: socialLinks.GitHub },
        { name: "YouTube", icon: <Youtube size={18} />, link: socialLinks.YouTube },
        { name: "Instagram", icon: <Instagram size={18} />, link: socialLinks.Instagram },
        { name: "Medium", icon: <Newspaper size={18} />, link: socialLinks.Medium },
    ];

    // Only show the ones that have a link provided in settings
    const socials = rawSocials.filter(s => s.link && s.link.trim() !== '');

    return (
        <BentoCard
            className="col-span-1 md:col-span-12 lg:col-span-8 row-span-2 bg-primary text-primary-foreground flex flex-col justify-between p-8"
            delay={0.6}
            hoverGradient="radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 55%)"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Interested? Let's Connect.</h2>
                    <p className="text-primary-foreground/80 text-sm max-w-md">
                        Have a project in mind, an open role, or just want to chat? Reach out through any of these platforms or send me a direct email to my inbox.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end h-full">
                {/* Socials Grid */}
                <div className="flex flex-wrap gap-3">
                    {socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-1.5 p-3 min-w:[70px] flex-1 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors shadow-sm"
                        >
                            {social.icon}
                            <span className="text-[10px] font-semibold">{social.name}</span>
                        </a>
                    ))}
                </div>

                {/* Direct Contact & Resume */}
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
                    <a
                        href={`mailto:${email}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-background text-foreground rounded-full font-semibold hover:bg-background/90 transition-colors shadow-sm"
                    >
                        <Mail size={18} />
                        Email Me
                    </a>
                    <a
                        href={resumeUrl}
                        download={isExternalLink ? undefined : "Sujith_Jayachandran_Resume.pdf"}
                        target={isExternalLink ? "_blank" : undefined}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 rounded-full font-semibold transition-colors shadow-sm"
                    >
                        <Download size={18} />
                        Download Resume
                    </a>
                </div>
            </div>
        </BentoCard>
    );
}
