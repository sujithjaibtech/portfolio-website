import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/** Props for the DynamicTypist component. */
interface DynamicTypistProps {
    /** Array of strings to cycle through with the typewriter effect. */
    words: string[];
    /** Speed (ms) per character while typing. Default: 100ms. */
    typingSpeed?: number;
    /** Speed (ms) per character while deleting. Default: 50ms. */
    deletingSpeed?: number;
    /** Pause duration (ms) after a word is fully typed before deletion starts. Default: 3000ms. */
    delayBetweenWords?: number;
}

/**
 * DynamicTypist renders a typewriter-style animated text that cycles through
 * an array of words. It types character-by-character, pauses, then deletes
 * before moving to the next word. A blinking cursor is always visible.
 */
export function DynamicTypist({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenWords = 3000,
}: DynamicTypistProps) {
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const currentWordChars = Array.from(words[wordIndex]);
        let timeout: NodeJS.Timeout;

        if (isDeleting) {
            // Once fully deleted, move to the next word.
            if (charIndex === 0) {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            } else {
                timeout = setTimeout(() => {
                    setCharIndex((prev) => prev - 1);
                }, deletingSpeed);
            }
        } else {
            // Once fully typed, wait then begin deletion.
            if (charIndex === currentWordChars.length) {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, delayBetweenWords);
            } else {
                timeout = setTimeout(() => {
                    setCharIndex((prev) => prev + 1);
                }, typingSpeed);
            }
        }

        // Cleanup timeout on re-render to avoid stacking effects.
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

    // Reconstruct the visible portion of the current word up to charIndex.
    const currentText = Array.from(words[wordIndex]).slice(0, charIndex).join('');

    return (
        <span className="inline-block min-w-[20px] text-primary">
            {currentText}
            {/* Blinking cursor indicator */}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-middle -mt-1"
            />
        </span>
    );
}
