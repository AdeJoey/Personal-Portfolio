"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
    value: string;
    numericValue: number;
    suffix: string;
    label: string;
    delay: number;
}

function StatItem({ value, numericValue, suffix, label, delay }: StatItemProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const stepValue = numericValue / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += stepValue;
                if (current >= numericValue) {
                    setCount(numericValue);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="text-center px-8 py-6"
        >
            <div className="font-marcellus text-[clamp(2.5rem,6vw,4rem)] leading-none">
                {count}
                {suffix}
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-gray-500">
                {label}
            </p>
        </motion.div>
    );
}

const stats = [
    { value: "20+", numericValue: 10, suffix: "+", label: "PROJECTS COMPLETED" },
    { value: "5+", numericValue: 5, suffix: "+", label: "HAPPY CLIENTS" },
    { value: "5+", numericValue: 1, suffix: "+", label: "YEARS EXPERIENCE" },
];

export function StatsSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200"
                >
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            {...stat}
                            delay={index * 0.2}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
