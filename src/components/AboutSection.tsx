"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { HoverCard } from "./ui/HoverCard";

export function AboutSection() {
    const handleDownloadResume = () => {
        // Create a link element and trigger download
        const link = document.createElement("a");
        link.href = "/resume.pdf"; // Update path to your resume file
        link.download = "Adelaja-Joseph-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
                >
                    {/* Left - Heading */}
                    <div className="flex flex-col gap-6">
                        <h2 className="font-marcellus text-[clamp(3rem,8vw,6rem)] leading-[0.9] flex items-end gap-4">
                            ABOUT
                            <motion.span
                                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300"
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <ArrowUpRight size={20} />
                            </motion.span>
                        </h2>

                        {/* Download Resume Button */}
                        <motion.button
                            onClick={handleDownloadResume}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold uppercase tracking-wider text-xs hover:bg-gray-800 transition-colors duration-300 w-fit shadow-lg hover:shadow-xl"
                        >
                            <Download size={16} />
                            Download Resume
                        </motion.button>
                    </div>

                    {/* Right - Description */}
                    <div className="flex items-end">
                        <div className="text-sm uppercase tracking-wider text-gray-600 leading-relaxed">
                            "
                            <HoverCard
                                trigger={
                                    <span className="font-semibold text-gray-900 cursor-pointer animated-underline">
                                        ADELAJA JOSEPH
                                    </span>
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">
                                        AJ
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Adelaja Olukayode Joseph</p>
                                        <p className="text-xs text-gray-500">Frontend Developer</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs text-gray-600">
                                    Based in Zaria, Nigeria. Skilled in React, JavaScript, and modern UI frameworks. Passionate about performance optimization.
                                </p>
                            </HoverCard>
                            {" "}IS AN ENTHUSIASTIC BUSINESS OWNER AND FRONTEND DEVELOPER SKILLED IN CREATING RESPONSIVE, USER-FOCUSED WEB APPLICATIONS USING REACT AND MODERN UI FRAMEWORKS.
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

