"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "./ui/Accordion";

const services = [
    {
        id: "react-dev",
        title: "REACT DEVELOPMENT",
        description: "Building modern, scalable web applications using React with clean, reusable components and state management.",
    },
    {
        id: "responsive-design",
        title: "RESPONSIVE WEB DESIGN",
        description: "Creating beautiful, mobile-first websites that work flawlessly across all devices and screen sizes.",
    },
    {
        id: "api-integration",
        title: "API INTEGRATION",
        description: "Seamlessly connecting frontend applications with backend services and third-party APIs for dynamic functionality.",
    },
    {
        id: "ui-implementation",
        title: "UI/UX IMPLEMENTATION",
        description: "Translating design mockups into pixel-perfect, interactive user interfaces with smooth animations.",
    },
    {
        id: "performance",
        title: "PERFORMANCE OPTIMIZATION",
        description: "Optimizing web applications for speed and efficiency, achieving faster load times and better user experience.",
    },
];

export function ServicesSection() {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container-main">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="font-marcellus text-[clamp(2rem,5vw,3.5rem)] leading-tight">
                        <span className="text-gray-400 italic">THE SERVICES{" "}</span>
                        <span className="text-gray-400 italic">I</span>
                    </h2>
                    <h2 className="font-marcellus text-[clamp(2rem,5vw,3.5rem)] leading-tight">
                        PROVIDE
                    </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center text-xs uppercase tracking-wider text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    CREATING RESPONSIVE, USER-FOCUSED WEB APPLICATIONS USING REACT, JAVASCRIPT, AND MODERN UI FRAMEWORKS. DELIVERING CLEAN CODE AND OPTIMAL USER EXPERIENCES.
                </motion.p>

                {/* Services Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <Accordion type="single" defaultOpen={["react-dev"]}>
                        {services.map((service, index) => (
                            <AccordionItem key={service.id} value={service.id}>
                                <AccordionTrigger value={service.id} index={index + 1}>
                                    {service.title}
                                </AccordionTrigger>
                                <AccordionContent value={service.id}>
                                    <p className="text-sm text-gray-300 pl-16">
                                        {service.description}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section >
    );
}

