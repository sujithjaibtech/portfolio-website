import { useState, useRef, useEffect } from "react";
import { BentoCard } from "../BentoGrid";
import { Award, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";

export function CertificationsCard() {
    const [showHint, setShowHint] = useState(false);
    const [certifications, setCertifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        async function fetchCertifications() {
            const { data } = await supabase
                .from('certifications')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setCertifications(data);
            setLoading(false);
        }
        fetchCertifications();
    }, []);

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
            hoverGradient="radial-gradient(ellipse at 10% 85%, rgba(63,81,181,0.10) 0%, transparent 60%)"
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

            {loading ? (
                <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="flex gap-4 p-4 rounded-xl border bg-card/50 hover:bg-secondary/50 transition-colors group/item">
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
                            </div>
                            {cert.link && cert.link !== '#' && (
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-background border shadow-sm group-hover/item:bg-primary group-hover/item:text-primary-foreground group-hover/item:border-primary transition-colors">
                                    <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </BentoCard>
    );
}
