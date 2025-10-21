"use client";
import React from "react";
import { motion } from "framer-motion";
import { WavyBackground } from "../components/ui/wavy-background";

export function ModernHero() {
  return (
    <div className="relative w-full overflow-hidden" id="hero">
      <WavyBackground
        containerClassName="w-full min-h-screen"
        className="max-w-6xl mx-auto px-4 py-24"
      >
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
            Innovating Tomorrow,{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-700 text-transparent bg-clip-text">
              One Line of Code at a Time
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-3xl">
                      We build intelligent, scalable, and secure software solutions that drive success.
          Whether you&apos;re a startup or an enterprise, we bring your ideas to life with
          cutting-edge technology and clean design.
          </p>

          <motion.div
            className="flex flex-wrap justify-center mt-10 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="bg-gradient-to-r from-purple-500 to-blue-700 py-3 px-6 rounded-lg text-white font-medium shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Get Started
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="py-3 px-6 rounded-lg border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              View Our Work
            </motion.a>
          </motion.div>
        </motion.div>
      </WavyBackground>
    </div>
  );
}