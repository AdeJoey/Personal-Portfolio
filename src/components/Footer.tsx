"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dialog } from "./ui/Dialog";
import { Checkbox } from "./ui/Checkbox";

const socialLinks = [
    { label: "LINKEDIN", href: "https://linkedin.com/in/adelaja-joseph-600787254" },
    { label: "GITHUB", href: "https://github.com" },
    { label: "EMAIL", href: "mailto:adelajajoseph10@gmail.com" },
];

const bottomLinks = [
    { label: "LINKEDIN", href: "https://linkedin.com/in/adelaja-joseph-600787254" },
    { label: "GITHUB", href: "https://github.com" },
];

export function Footer() {
    const [contactOpen, setContactOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    return (
        <>
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="container-main">
                    {/* Social Links Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16"
                    >
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="text-xs tracking-[0.15em] text-gray-400 hover:text-white transition-colors animated-underline"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Let's Talk Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-anton text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tight">
                            LET'S TALK
                        </h2>
                    </motion.div>

                    {/* Bottom Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        {bottomLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 text-xs tracking-wider text-gray-300 hover:bg-white hover:text-gray-900 hover:border-white transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="mailto:adelajajoseph10@gmail.com"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 text-xs tracking-wider text-gray-300 hover:bg-white hover:text-gray-900 hover:border-white transition-all"
                        >
                            EMAIL ME
                        </a>
                        <button
                            onClick={() => setContactOpen(true)}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-gray-900 text-xs tracking-wider font-medium hover:bg-gray-200 transition-all"
                        >
                            CONTACT ME
                        </button>
                    </motion.div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-4">
                        <p className="text-xs text-gray-500">
                            © <span className="font-semibold">ADELAJA JOSEPH.</span> ALL RIGHTS RESERVED
                        </p>
                        <p className="text-xs text-gray-500">
                            FRONTEND DEVELOPER | <span className="font-semibold">ZARIA, NIGERIA</span>
                        </p>
                    </div>
                </div>
            </footer>

            {/* Contact Dialog */}
            <Dialog
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                title="Get in Touch"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        I'd love to hear from you! You can reach me at <strong>adelajajoseph10@gmail.com</strong> or call <strong>+234 811 768 2654</strong>.
                    </p>

                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                        />
                    </div>

                    <Checkbox
                        checked={agreedToTerms}
                        onChange={setAgreedToTerms}
                        label="I agree to the terms and privacy policy"
                    />

                    <button
                        disabled={!agreedToTerms}
                        className="w-full py-3 rounded-full bg-gray-900 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                    >
                        Send Message
                    </button>
                </div>
            </Dialog>
        </>
    );
}

