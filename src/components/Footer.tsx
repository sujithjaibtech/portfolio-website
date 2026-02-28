export function Footer() {
    return (
        <footer id="contact" className="py-12 px-6 border-t bg-secondary/30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Let's work together</h2>
                    <p className="text-muted-foreground">Available for new opportunities.</p>
                </div>

                <a href="mailto:sujith@example.com" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all text-lg shadow-sm">
                    Get in touch
                </a>
            </div>
            <div className="max-w-6xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Sujith Jayachandran. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-foreground transition-colors font-medium">LinkedIn</a>
                    <a href="#" className="hover:text-foreground transition-colors font-medium">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
