"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

// Define the shape of each testimonial item
interface Testimonial {
  name: string;
  designation: string;
  quote: string;
  src: string;
}

// The testimonials data
const testimonials: Testimonial[] = [
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user2.jpg",
    name: "Brian Smith",
    designation: "Product Manager",
    quote:
      "Their attention to detail and delivery speed were impressive. Highly recommended!",
  },
  {
    src: "/assets/testimonials-photo/user3.jpg",
    name: "Carla De Silva",
    designation: "UX Designer",
    quote:
      "Introvera's design thinking approach brought our product to life beautifully.",
  },
  {
    src: "/assets/testimonials-photo/user4.jpg",
    name: "Daniel Perera",
    designation: "CTO, Fintech Co.",
    quote:
      "Solid architecture and scalable solutions. One of the best dev teams I've worked with.",
  },
  {
    src: "/assets/testimonials-photo/user5.jpg",
    name: "Emily Jayasuriya",
    designation: "Marketing Lead",
    quote: "Their brand awareness strategies helped us boost conversions by 40%!",
  },
  {
    src: "/assets/testimonials-photo/user6.jpg",
    name: "Farhan Malik",
    designation: "CEO, StartupX",
    quote:
      "They don't just build products — they build value. True partners from start to finish.",
  },
];

// Props for the component
interface AnimatedTestimonialsProps {
  testimonials?: Testimonial[];
  autoplay?: boolean;
}

const Testimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials: propsTestimonials,
  autoplay = false,
}) => {
  // Use passed testimonials or default to internal testimonials
  const items = propsTestimonials ?? testimonials;

  const [active, setActive] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  const handleNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay && inView) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, inView]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div
      ref={ref}
      className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12"
      style={{ minHeight: "600px" }}
    >
      {inView ? (
        <>
          <h2 className="text-3xl sm:text-5xl lg:text-5xl text-center my-8 tracking-wide">
            What People{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
              are saying...
            </span>
          </h2>

          <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
            {/* Left: Image */}
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {items.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : items.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="rounded-3xl object-cover object-center"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Text */}
            <div className="flex flex-col justify-between py-4">
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {items[active].name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  {items[active].designation}
                </p>
                <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                  {items[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                  aria-label="Previous testimonial"
                >
                  <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                  aria-label="Next testimonial"
                >
                  <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: 600 }} />
      )}
    </div>
  );
};

export default Testimonials;



