"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, RefreshCw, X, Globe, Code2 } from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Ripple hook
───────────────────────────────────────────── */
interface Ripple {
    id: number;
    x: number;
    y: number;
}

function useRipple() {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const counter = useRef(0);

    const addRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = counter.current++;
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    }, []);

    return { ripples, addRipple };
}

/* ─────────────────────────────────────────────
   Ripple Button
───────────────────────────────────────────── */
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "dark" | "outline" | "ghost";
    as?: "button" | "a";
    href?: string;
    target?: string;
    rel?: string;
}

function RippleButton({
    children,
    className = "",
    variant = "dark",
    as: Tag = "button",
    href,
    target,
    rel,
    onClick,
    ...rest
}: RippleButtonProps) {
    const { ripples, addRipple } = useRipple();

    const baseStyles = "relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium tracking-wider transition-all duration-200 select-none";
    const variantStyles = {
        dark: "bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97] shadow-md hover:shadow-lg",
        outline: "border border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white active:scale-[0.97]",
        ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:scale-[0.97]",
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(e);
        onClick?.(e);
    };

    if (Tag === "a") {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                className={`${baseStyles} ${variantStyles[variant]} ${className}`}
                onClick={(e) => addRipple(e as unknown as React.MouseEvent<HTMLButtonElement>)}
            >
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple"
                        style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80 }}
                    />
                ))}
                {children}
            </a>
        );
    }

    return (
        <button
            {...rest}
            onClick={handleClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {ripples.map((r) => (
                <span
                    key={r.id}
                    className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple"
                    style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80 }}
                />
            ))}
            {children}
        </button>
    );
}

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type Project = {
    title: string;
    subtitle: string;
    imageSrc: string;
    type: "web";
    stacks: string[];
    website?: string;
    year?: string;
};

const webProjects: Project[] = [
    {
        title: "CAIRO RESTAURANTS",
        subtitle: "RESTAURANT WEBSITE DESIGN",
        imageSrc: "/projects/Cairo.png",
        type: "web",
        stacks: ["HTML", "CSS", "JavaScript"],
        website: "cairo-restaurants.vercel.app",
        year: "2024",
    },
    {
        title: "BRILLO",
        subtitle: "CREATIVE WEB DESIGN",
        imageSrc: "/projects/brillo.png",
        type: "web",
        stacks: ["React", "Framer Motion", "Tailwind CSS", "Next"],
        website: "design-joey.vercel.app",
        year: "2024",
    },
    {
        title: "AMAKA",
        subtitle: "PORTFOLIO SHOWCASE",
        imageSrc: "/projects/Amaka.png",
        type: "web",
        stacks: ["Next.js", "TypeScript", "Vercel"],
        website: "amaka-fashion.vercel.app",
        year: "2024",
    },
];

/* ─────────────────────────────────────────────
   Project Card
───────────────────────────────────────────── */
interface ProjectCardProps {
    project: Project;
    index: number;
    onOpen: () => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
    const [hovered, setHovered] = useState(false);
    const { ripples, addRipple } = useRipple();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(e);
        onOpen();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group"
        >
            <button
                type="button"
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative overflow-hidden w-full text-left rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
                {/* Ripple layer */}
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        className="pointer-events-none absolute rounded-full bg-gray-900/10 animate-ripple z-20"
                        style={{ left: r.x - 60, top: r.y - 60, width: 120, height: 120 }}
                    />
                ))}

                {/* Image */}
                <div className="relative w-full h-72 overflow-hidden rounded-t-2xl bg-gray-100">
                    <motion.div
                        className="relative w-full h-full"
                        animate={{ scale: hovered ? 1.06 : 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={project.imageSrc}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </motion.div>

                    {/* Hover overlay */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent flex flex-col justify-end p-5 z-10"
                            >
                                <motion.div
                                    initial={{ y: 12, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 8, opacity: 0 }}
                                    transition={{ duration: 0.25, delay: 0.05 }}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-white text-xs font-semibold uppercase tracking-widest">
                                        View Project
                                    </span>
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg">
                                        <ArrowUpRight size={16} />
                                    </span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Year badge */}
                    {project.year && (
                        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold tracking-wider text-gray-700 shadow-sm">
                            {project.year}
                        </div>
                    )}
                </div>

                {/* Card body */}
                <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-0.5">
                                {project.title}
                            </h3>
                            <p className="text-[11px] uppercase tracking-wider text-gray-400">
                                {project.subtitle}
                            </p>
                        </div>
                        <motion.span
                            animate={{ rotate: hovered ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex-shrink-0 mt-0.5"
                        >
                            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                        </motion.span>
                    </div>

                    {/* Stack pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.stacks.map((s) => (
                            <span
                                key={s}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 tracking-wide"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </button>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Preview Modal
───────────────────────────────────────────── */
interface PreviewModalProps {
    project: Project | null;
    onClose: () => void;
}

function PreviewModal({ project, onClose }: PreviewModalProps) {
    const [iframeLoading, setIframeLoading] = useState(true);
    const [iframeKey, setIframeKey] = useState(0);
    const isOpen = Boolean(project);
    const fullUrl = project?.website
        ? project.website.startsWith("http")
            ? project.website
            : `https://${project.website}`
        : null;

    const handleRefresh = () => {
        setIframeLoading(true);
        setIframeKey((k) => k + 1);
    };

    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal — bottom sheet on mobile, centered dialog on md+ */}
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-2xl bg-white shadow-2xl overflow-hidden flex flex-col md:bottom-auto md:left-1/2 md:top-1/2 md:right-auto md:w-[95vw] md:max-w-5xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
                        style={{ maxHeight: "92vh" }}
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                            <div>
                                <h2 className="text-base font-bold uppercase tracking-wider text-gray-900">
                                    {project.title}
                                </h2>
                                <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-0.5">
                                    {project.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors active:scale-95"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Browser chrome URL bar */}
                        {fullUrl && (
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex-shrink-0">
                                {/* Traffic lights */}
                                <div className="flex items-center gap-1.5 mr-1">
                                    <div className="h-3 w-3 rounded-full bg-red-400" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                    <div className="h-3 w-3 rounded-full bg-green-400" />
                                </div>

                                {/* URL bar */}
                                <div className="flex flex-1 items-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs text-gray-500 min-w-0">
                                    <Globe size={12} className="flex-shrink-0 text-gray-400" />
                                    <span className="truncate">{fullUrl}</span>
                                </div>

                                {/* Refresh */}
                                <button
                                    onClick={handleRefresh}
                                    className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors active:scale-90"
                                    title="Refresh preview"
                                >
                                    <RefreshCw size={13} />
                                </button>

                                {/* Open external */}
                                <a
                                    href={fullUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors active:scale-90"
                                    title="Open in new tab"
                                >
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        )}

                        {/* iframe / image preview */}
                        <div className="relative flex-1 min-h-0 bg-gray-100" style={{ height: "clamp(200px, 45vh, 460px)" }}>
                            {fullUrl ? (
                                <>
                                    {iframeLoading && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 z-10">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-gray-900"
                                            />
                                            <p className="text-xs text-gray-400 tracking-wider">Loading preview…</p>
                                        </div>
                                    )}
                                    <iframe
                                        key={iframeKey}
                                        src={fullUrl}
                                        className="w-full h-full border-0"
                                        title={project.title}
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                        referrerPolicy="no-referrer"
                                        allowFullScreen
                                        onLoad={() => setIframeLoading(false)}
                                    />
                                </>
                            ) : (
                                <Image
                                    src={project.imageSrc}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
                            {/* Stacks */}
                            <div className="flex flex-wrap gap-1.5">
                                <Code2 size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                {project.stacks.map((s) => (
                                    <span
                                        key={s}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 tracking-wide"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            {fullUrl ? (
                                <RippleButton
                                    as="a"
                                    href={fullUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="dark"
                                    className="px-5 py-2.5 rounded-full text-xs flex-shrink-0"
                                >
                                    Visit Site
                                    <ArrowUpRight size={14} />
                                </RippleButton>
                            ) : (
                                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-xs font-medium text-gray-400 cursor-not-allowed">
                                    No live URL
                                </span>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export function FeaturedProjects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-24 bg-white overflow-hidden">
            <div className="container-main">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
                >
                    <h2 className="font-marcellus text-[clamp(2rem,5vw,3.5rem)] leading-tight">
                        <span className="italic text-gray-400">FEATURED </span>
                        <span className="text-gray-900">PROJECTS</span>
                    </h2>

                    {/* See all arrow button */}
                    <motion.a
                        href="https://github.com/AdeJoey"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-300 text-xs font-medium uppercase tracking-wider text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                    >
                        See all work
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 group-hover:bg-white/20 transition-colors">
                            <ArrowUpRight size={13} />
                        </span>
                    </motion.a>
                </motion.div>

                {/* Projects Grid — wider cards via 2-col on md */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {webProjects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            onOpen={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {/* Preview Modal */}
            <PreviewModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
