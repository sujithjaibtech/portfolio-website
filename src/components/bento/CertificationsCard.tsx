import { useState, useRef } from "react";
import { BentoCard } from "../BentoGrid";
import { Award, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Static list of professional certifications.
 * Update this array to add, remove, or modify certification entries.
 * The `link` field should point to the credential verification page.
 */
const certifications = [
    {
        name: "Microsoft Github Copilot Certification",
        issuer: "Microsoft",
        year: "2026",
        tagline: "Mastered AI-assisted coding and advanced prompt engineering.",
        link: "#"
    },
    {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2025",
        tagline: "Architecting robust cloud applications.",
        link: "#"
    },
    {
        name: "Guidewire Certified Associate",
        issuer: "Guidewire",
        year: "2024",
        tagline: "Proficiency in Guidewire PolicyCenter and ClaimCenter.",
        link: "#"
    },
    {
        name: "ITIL 4 Foundation",
        issuer: "Axelos",
        year: "2023",
        tagline: "IT service management best practices.",
        link: "#"
    },
    {
        name: "GCP Associate Cloud Engineer",
        issuer: "Google Cloud",
        year: "2023",
        tagline: "Deploying and maintaining cloud projects.",
        link: "#"
    }
];

/**
 * CertificationsCard displays a vertically scrollable list of professional certifications.
 * It uses a hidden scrollbar for a clean look and shows a "Scroll down for more" hint
 * after the user hovers over the card for 3 seconds, guiding them to scroll.
 */
export function CertificationsCard() {
    const [showHint, setShowHint] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            setShowHint(true);
        }, 3000);
    };

    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setShowHint(false);
    };

    return (
        <BentoCard
            className="col-span-1 md:col-span-12 lg:col-span-6 row-span-2 flex flex-col justify-start overflow-hidden group"
            delay={0.8}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background rounded-full border shadow-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Award size={14} /> Certifications
                </span>

                <AnimatePresence>
                    {showHint && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[10px] font-medium text-primary flex items-center gap-1"
                        >
                            Scroll down for more <ChevronDown size={10} className="animate-bounce" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Scrollable container with hidden scrollbar */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {certifications.map((cert, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card/50 hover:bg-secondary/50 transition-colors group/item">
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">{cert.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-medium">{cert.year}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{cert.tagline}</p>
                        </div>
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-background border shadow-sm group-hover/item:bg-primary group-hover/item:text-primary-foreground group-hover/item:border-primary transition-colors">
                            <ExternalLink size={14} />
                        </a>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </BentoCard>
    );
}
