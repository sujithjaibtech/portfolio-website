import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    /** Delay (in seconds) before the card's fade-in-up animation starts. */
    delay?: number;
    /**
     * Optional CSS gradient string applied as a full-bleed overlay on hover.
     * Example: "radial-gradient(ellipse at 10% 10%, rgba(66,133,244,0.10) 0%, transparent 65%)"
     * Keep opacity values between 0.05–0.12 for a subtle, elegant look.
     */
    hoverGradient?: string;
}

/**
 * BentoCard is the base card component for the bento grid layout.
 * It applies a consistent rounded card shell with a subtle entry animation.
 * All HTML div attributes (including event handlers) are forwarded via spread props.
 * When a `hoverGradient` is supplied, a soft color wash fades in on mouse-over.
 */
export function BentoCard({ children, className, delay = 0, hoverGradient, ...props }: BentoCardProps) {
    return (
        <div
            {...props}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card border shadow-sm p-6 hover:shadow-md transition-shadow duration-300",
                className
            )}
            style={{
                animation: `fade-in-up 0.5s ease-out ${delay}s both`,
            }}
        >
            {/* Gradient hover overlay — fades in on card hover */}
            {hoverGradient && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none rounded-3xl z-0"
                    style={{ background: hoverGradient }}
                />
            )}
            {/* Card content sits above the gradient overlay */}
            <div className="relative z-10 flex flex-col h-full">
                {children}
            </div>
        </div>
    );
}


/**
 * BentoGrid is the responsive 12-column grid container that wraps all bento cards.
 * Each row height is fixed at 160px. Cards can span multiple rows and columns 
 * to create an asymmetric, magazine-style layout.
 */
export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 auto-rows-[160px] gap-4 max-w-7xl mx-auto p-4 md:p-8",
                className
            )}
        >
            {children}
        </div>
    );
}
