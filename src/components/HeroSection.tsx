"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Tooltip } from "./ui/Tooltip";

const skills = [
    "REACT",
    "JAVASCRIPT",
    "TAILWIND CSS",
    "UI/UX DESIGN",
    "RESPONSIVE DESIGN",
];

export function HeroSection() {
    return (
        <section id="home" className="relative pt-24 pb-8 bg-white overflow-hidden">
            <div className="container-main flex flex-col">
                {/* Main heading - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center relative z-10"
                >
                    <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.95] tracking-tight">
                        <span className="font-marcellus font-bold text-gradient-metallic">EXPLORE </span>
                        <span className="font-marcellus font-bold text-gradient-gray">MY</span>
                    </h1>
                    <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.95] tracking-tight font-marcellus font-bold text-gradient-metallic">
                        PORTFOLIO
                    </h1>
                </motion.div>

                {/* Three column layout - Image overlaps heading */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 -mt-8 lg:-mt-16 relative z-20">
                    {/* Left content - Tagline & Scroll */}
                    <div className="lg:col-span-3 flex flex-col items-end hidden lg:flex pr-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-24 text-left"
                        >
                            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-800 mb-8">
                                FRONTEND DEVELOPER & GRAPHIC DESIGNER .EST 2020

                            </p>

                            <Tooltip content="Scroll down">
                                <motion.button
                                    className="flex items-center justify-center h-14 w-14 rounded-full border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-colors ml-auto"
                                    animate={{ y: [0, 6, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    onClick={() => {
                                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    <ArrowDown size={20} strokeWidth={1.5} />
                                </motion.button>
                            </Tooltip>
                        </motion.div>
                    </div>

                    {/* Center content - Profile Image */}
                    <div className="lg:col-span-6 flex justify-center items-end relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="relative w-[390px] h-[420px] md:w-[380px] md:h-[520px] lg:w-[480px] lg:h-[620px]">
                                <Image
                                    src="/ProfilePic.png"
                                    alt="Adelaja Olukayode Joseph"
                                    fill
                                    className="object-cover object-center "
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right content - Description & Skills */}
                    <div className="lg:col-span-3 flex flex-col justify-between py-8 hidden lg:flex pl-8">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-right mt-20"
                        >
                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-800 leading-[1.8] max-w-[180px] text-right">
                                I CREATE RESPONSIVE, USER-FOCUSED WEB APPLICATIONS THAT STAND OUT.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-col items-start gap-4 mb-8"
                        >
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600 text-right"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

