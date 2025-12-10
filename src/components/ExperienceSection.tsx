"use client";

import { motion } from "framer-motion";

const experience = [
    {
        role: "Frontend Developer (Freelance)",
        company: "Self-Employed | Remote",
        period: "2024 – Present",
        description: [
            "Designed and deployed responsive React web apps for small businesses and startups.",
            "Collaborated with clients to translate requirements into clean, scalable UI components.",
            "Implemented API integration, routing, and performance optimization (30% faster load times).",
            "Ensured accessibility and mobile responsiveness across multiple screen sizes."
        ]
    },
    {
        role: "Frontend Developer Intern",
        company: "HNG Internship (Remote)",
        period: "2025 – Present",
        description: [
            "Built and refined reusable components using React and Tailwind CSS.",
            "Collaborated with a distributed team through Git and version control workflows.",
            "Participated in weekly code reviews, debugging sessions, and agile sprints.",
            "Developed mini-projects including a team task dashboard and an alert library (SweetAlert2 integration).",
            "Collaborated with peers to prototype a student dashboard UI, integrating React hooks and modular CSS."
        ]
    }
];

const education = [
    {
        degree: "B.Sc. Physics (Second Class)",
        school: "Ahmadu Bello University, Zaria",
        year: "2024"
    },
    {
        degree: "West African Senior School Certificate",
        school: "",
        year: "2017"
    }
];

const leadership = [
    "Vice President, RCCG Youth & Young Adults, 2025",
    "Sports Director, RCCG Youth & Young Adults, 2023–2024",
    "Level Coordinator, Fellowship of Christian Physics Students, 2022–2024",
    "Deputy Chapter Leader, Life Changers Club International (Zaria Chapter)"
];

const certifications = [
    "Global Leadership Summit – 2025",
    "Web Development (JavaScript, React)"
];

export function ExperienceSection() {
    return (
        <section id="resume" className="py-20 bg-gray-50">
            <div className="container-main">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="font-marcellus text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-gray-900 mb-4">
                        RESUME
                    </h2>
                    <div className="h-1 w-20 bg-gray-900" />
                </motion.div>

                {/* Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider text-gray-400">Experience</h3>
                    </motion.div>
                    <div className="lg:col-span-8 space-y-12">
                        {experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-xl font-bold text-gray-900">{job.role}</h4>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">{job.period}</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">{job.company}</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm leading-relaxed">
                                    {job.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider text-gray-400">Education</h3>
                    </motion.div>
                    <div className="lg:col-span-8 space-y-8">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b border-gray-200 pb-8 last:border-0 last:pb-0"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                                    <span className="text-sm text-gray-500">{edu.year}</span>
                                </div>
                                {edu.school && <p className="text-sm text-gray-600">{edu.school}</p>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Leadership & Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Leadership */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xl font-bold uppercase tracking-wider text-gray-400 mb-8"
                        >
                            Leadership
                        </motion.h3>
                        <div className="space-y-4">
                            {leadership.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                    <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xl font-bold uppercase tracking-wider text-gray-400 mb-8"
                        >
                            Certifications
                        </motion.h3>
                        <div className="space-y-4">
                            {certifications.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="h-2 w-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
