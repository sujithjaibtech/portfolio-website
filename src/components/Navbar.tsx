import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="text-2xl font-bold tracking-tighter">
                    Sujith<span className="text-muted-foreground">.</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-sm font-medium hover:text-foreground/80 transition-colors">About</a>
                    <a href="#projects" className="text-sm font-medium hover:text-foreground/80 transition-colors">Projects</a>
                    <a href="#contact" className="text-sm font-medium hover:text-foreground/80 transition-colors">Contact</a>
                    <a href="#contact" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                        Let's Talk
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 -mr-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-background border-b px-6 py-4 flex flex-col gap-4 shadow-lg"
                >
                    <a href="#about" onClick={() => setIsOpen(false)} className="text-sm font-medium py-2">About</a>
                    <a href="#projects" onClick={() => setIsOpen(false)} className="text-sm font-medium py-2">Projects</a>
                    <a href="#contact" onClick={() => setIsOpen(false)} className="text-sm font-medium py-2">Contact</a>
                    <a href="#contact" onClick={() => setIsOpen(false)} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium text-center mt-2">
                        Let's Talk
                    </a>
                </motion.div>
            )}
        </nav>
    );
}
