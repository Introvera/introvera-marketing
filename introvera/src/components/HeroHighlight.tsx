"use client";

import { useMotionValue, useSpring, motion } from "framer-motion";
import { useCallback } from "react";
import type { MouseEvent, ReactNode } from "react";

type HeroHighlightProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export const HeroHighlight = ({
  children,
  className = "",
  containerClassName = "",
}: HeroHighlightProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optional: smoother animations
  const smoothX = useSpring(mouseX, { damping: 15, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 15, stiffness: 200 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const createDotPattern = (fill: string) =>
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16'%3E%3Ccircle fill='${encodeURIComponent(
      fill
    )}' cx='10' cy='10' r='2.5'/%3E%3C/svg%3E")`;

  const lightDefault = createDotPattern("#d4d4d4");
  const lightHover = createDotPattern("#6366f1");
  const darkDefault = createDotPattern("#404040");
  const darkHover = createDotPattern("#8183f4");

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(200px circle at ${smoothX.get()}px ${smoothY.get()}px, black 0%, transparent 100%)`,
    maskImage: `radial-gradient(200px circle at ${smoothX.get()}px ${smoothY.get()}px, black 0%, transparent 100%)`,
  };

  return (
    <div
      className={`group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-black ${containerClassName}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none dark:hidden" style={{ backgroundImage: lightDefault }} />
      <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{ backgroundImage: darkDefault }} />

      {/* Hover Masks */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: lightHover,
          ...maskStyle,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage: darkHover,
          ...maskStyle,
        }}
      />

      {/* Foreground */}
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

type HighlightProps = {
  children: ReactNode;
  className?: string;
};

export const Highlight = ({ children, className = "" }: HighlightProps) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      className={`relative inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-1 pb-1 dark:from-indigo-900 dark:to-purple-900 ${className}`}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
    >
      {children}
    </motion.span>
  );
};
