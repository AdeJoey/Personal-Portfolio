"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    delay: number;
    type: "mobile" | "web";
}

function ProjectCard({ title, subtitle, imageSrc, delay, type }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="h-full"
            data-cursor-text="View"
        >
            {/* Project Image - Clean, Full Display */}
            <motion.div
                className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 mb-4 shadow-lg"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover w-full h-full"
                        priority={false}
                    />
                </motion.div>
            </motion.div>

            {/* Project Info */}
            <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                    {title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    );
}

const mobileProjects = [
    {
        title: "5G SQUARE",
        subtitle: "RESTAURANT & ENTERTAINMENT WEB APP",
        imageSrc: "/projects/webApp15Gsquare.jpg",
        type: "mobile" as const,
    },
];

const webProjects = [
    {
        title: "CAIRO RESTAURANTS",
        subtitle: "RESTAURANT WEBSITE DESIGN",
        imageSrc: "/projects/Cairo.png",
        type: "web" as const,
    },
    {
        title: "SOMMY",
        subtitle: "CREATIVE WEB DESIGN",
        imageSrc: "/projects/Sommy.png",
        type: "web" as const,
    },
    {
        title: "AMAKA",
        subtitle: "PORTFOLIO SHOWCASE",
        imageSrc: "/projects/Amaka.png",
        type: "web" as const,
    },
];

export function FeaturedProjects() {
    return (
        <section id="projects" className="py-20 bg-white overflow-hidden">
            <div className="container-main">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-marcellus text-[clamp(2rem,5vw,3.5rem)] leading-tight italic tracking-tight text-gray-400">
                        FEATURED{" "}
                        <span className="text-gray-900 not-italic">PROJECT</span>
                    </h2>
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-col items-center">
                    <Tabs defaultValue="web" className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center justify-center gap-4 mb-12"
                        >
                            <TabsList>
                                <TabsTrigger value="mobile">MOBILE APP</TabsTrigger>
                                <TabsTrigger value="web">WEB DESIGN</TabsTrigger>
                            </TabsList>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="circle-button"
                            >
                                <ArrowUpRight size={18} />
                            </motion.button>
                        </motion.div>

                        <TabsContent value="mobile">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                {mobileProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.title}
                                        {...project}
                                        delay={index * 0.1}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="web">
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.15,
                                            delayChildren: 0.2,
                                        },
                                    },
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {webProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        variants={{
                                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                                transition: {
                                                    duration: 0.5,
                                                    ease: "easeOut",
                                                },
                                            },
                                        }}
                                    >
                                        <ProjectCard
                                            {...project}
                                            delay={index * 0.1}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    );
}

