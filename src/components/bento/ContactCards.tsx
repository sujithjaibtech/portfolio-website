import { BentoCard } from "../BentoGrid";
import { Github, Linkedin, Mail, Instagram, Youtube, Download, Newspaper } from "lucide-react";

/**
 * SocialsCard renders a 2-column grid of social platform links.
 * LinkedIn, GitHub are on the first row, YouTube and Instagram on the second,
 * and Medium spans the full width on the third row.
 * Update the `link` field for each social to point to real profile URLs.
 */
export function SocialsCard() {
    const socials = [
        { name: "LinkedIn", icon: <Linkedin size={20} />, link: "#" },
        { name: "GitHub", icon: <Github size={20} />, link: "#" },
        { name: "YouTube", icon: <Youtube size={20} />, link: "#" },
        { name: "Instagram", icon: <Instagram size={20} />, link: "#" },
        { name: "Medium", icon: <Newspaper size={20} />, link: "#" },
    ];

    return (
        <BentoCard className="col-span-1 md:col-span-5 lg:col-span-4 row-span-2" delay={0.6}>
            <h3 className="font-semibold text-muted-foreground mb-4">Online Presence</h3>
            <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
                {socials.map((social, index) => (
                    <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors shadow-sm ${index === 4 ? "col-span-2" : ""
                            }`}
                    >
                        {social.icon}
                        <span className="text-xs font-semibold">{social.name}</span>
                    </a>
                ))}
            </div>
        </BentoCard>
    );
}

/**
 * ContactCard is the "Hire Me" call-to-action card.
 * It provides a Download Resume button (pointing to /resume.pdf in /public)
 * and an Email Me mailto link.
 */
export function ContactCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-7 lg:col-span-5 row-span-2 bg-primary text-primary-foreground flex flex-col justify-center items-center text-center p-8" delay={0.7}>
            <h2 className="text-2xl font-bold mb-2">Hire Me</h2>
            <p className="text-primary-foreground/80 mb-6 text-sm">Have a project in mind or an open role? Let's make it happen!</p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                    href="/resume.pdf"
                    download="Sujith_Jayachandran_Resume.pdf"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-colors text-sm shadow-sm"
                >
                    <Download size={16} />
                    Download Resume
                </a>
                <a
                    href="mailto:sujithjaibtech@gmail.com"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-background text-foreground rounded-full font-medium hover:bg-background/90 transition-colors text-sm shadow-sm"
                >
                    <Mail size={16} />
                    Email Me
                </a>
            </div>
        </BentoCard>
    );
}
