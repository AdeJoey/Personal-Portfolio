"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Use requestAnimationFrame for smoother updates if needed, 
            // but Framer Motion's useSpring handles this well.
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Optimized hover detection using event delegation
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the target or its parents are hoverable
            const hoverable = target.closest("a, button, [data-cursor-hover], [data-cursor-text]");

            if (hoverable) {
                setIsHovering(true);
                const text = hoverable.getAttribute("data-cursor-text");
                if (text) setCursorText(text);
            } else {
                setIsHovering(false);
                setCursorText("");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        // Use mouseover for event delegation instead of attaching listeners to every element
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // Don't render on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 80 : 12,
                        height: isHovering ? 80 : 12,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-center rounded-full bg-white"
                    style={{
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {cursorText && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-medium text-black"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>

            {/* Trailing ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 100 : 40,
                        height: isHovering ? 100 : 40,
                        opacity: isVisible ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="rounded-full border border-gray-400"
                    style={{
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </motion.div>

            <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
        </>
    );
}
