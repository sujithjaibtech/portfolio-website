import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

export function Hero() {
    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-6xl mx-auto flex flex-col justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-3xl"
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium px-3 py-1 bg-secondary rounded-full border">
                        Available for new opportunities
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                    Building digital products, brands, and experience.
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                    Hi, I'm <strong className="text-foreground">Sujith Jayachandran</strong>. A Full Stack Developer specializing in Java, Python, React, GenAI, and ITSM. I craft scalable and engaging web experiences.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase size={18} />
                        <span className="text-sm font-medium">Tata Consultancy Services</span>
                    </div>
                    <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border"></div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={18} />
                        <span className="text-sm font-medium">Chennai, India</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#projects" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:gap-3 group">
                        See My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 border transition-all">
                        Get In Touch
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
