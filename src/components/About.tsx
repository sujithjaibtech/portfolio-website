import { motion } from "framer-motion";
import { Navigation, Code2, Database, Brain, Headset } from "lucide-react";

export function About() {
    const skills = [
        { name: "Java", icon: <Database size={16} /> },
        { name: "Python", icon: <Code2 size={16} /> },
        { name: "React", icon: <Navigation size={16} /> },
        { name: "GenAI", icon: <Brain size={16} /> },
        { name: "ITSM", icon: <Headset size={16} /> },
    ];

    return (
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-6 tracking-tight">About Me</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        I am a passionate Full Stack Developer with extensive experience in enterprise environments like Tata Consultancy Services. I specialize in bridging the gap between sophisticated backend logic and sleek, intuitive front-end interfaces.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        I thrive on tackling complex problems—whether it’s architecting robust Java/Python microservices, building interactive applications with React, integrating cutting-edge GenAI features, or streamlining processes with ITSM platforms.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold mb-6 tracking-tight">Tech Arsenal</h2>
                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all cursor-default border hover:border-border/80"
                            >
                                {skill.icon}
                                <span className="font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
