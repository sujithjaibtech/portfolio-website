import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
    const projects = [
        {
            title: "Enterprise Service Portal",
            description: "A comprehensive ITSM portal for managing enterprise services with GenAI-powered ticket resolution.",
            tags: ["React", "Java", "GenAI", "ITSM"],
        },
        {
            title: "Data Processing Pipeline",
            description: "Scalable Python microservices for real-time data ingestion and analytics.",
            tags: ["Python", "Docker", "Kafka"],
        },
        {
            title: "AI Chat Assistant",
            description: "A GenAI-driven conversational agent integrated into customer workflows to automate support.",
            tags: ["React", "Python", "LLMs"],
        }
    ];

    return (
        <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Featured Projects</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A selection of recent work shaping digital experiences and optimizing enterprise operations.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative flex flex-col justify-between p-8 rounded-3xl bg-secondary hover:bg-secondary/70 border border-transparent hover:border-border transition-all h-full"
                    >
                        <div>
                            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-medium px-3 py-1 bg-background rounded-full border border-border/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a href="#" className="inline-flex items-center text-sm font-semibold hover:text-primary/80 transition-colors">
                                View Project <ArrowUpRight size={16} className="ml-1" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
