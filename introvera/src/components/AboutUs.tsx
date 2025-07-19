"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <div
      ref={ref}
      id="about"
      className="relative mt-20 min-h-[400px]"
    >
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
              About{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-800 text-transparent bg-clip-text">
                Us
              </span>
            </h2>
          </div>
          <p className="mt-10 text-lg text-neutral-700 dark:text-neutral-300 mb-8 justify-center">
            At{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-800 text-transparent bg-clip-text">
              Introvera
            </span>
            , we are passionate about building innovative digital solutions that
            empower businesses and individuals to thrive in a connected world.
            Our team combines creativity, technology, and strategy to deliver
            products and services that make a real difference.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-blue-600">
                Our Mission
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                To drive digital transformation by providing cutting-edge
                technology solutions that are reliable, scalable, and
                user-friendly. We strive to help our clients achieve their
                goals through innovation, collaboration, and excellence.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-600">Our Vision</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                To be a global leader in tech innovation, recognized for our
                commitment to quality, creativity, and customer success.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div style={{ height: "400px" }} />
      )}
    </div>
  );
};

export default AboutUs;
