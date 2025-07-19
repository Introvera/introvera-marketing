"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@heroui/react";

interface Testimonial {
  src: string;
  name: string;
  designation: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
  {
    src: "/assets/testimonials-photo/user1.jpg",
    name: "Alice Fernando",
    designation: "Software Engineer",
    quote:
      "Working with Introvera has been an incredible experience. Their tech expertise is unmatched.",
  },
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
    quote:
      "Their brand awareness strategies helped us boost conversions by 40%!",
  },
  {
    src: "/assets/testimonials-photo/user6.jpg",
    name: "Farhan Malik",
    designation: "CEO, StartupX",
    quote:
      "They don't just build products — they build value. True partners from start to finish.",
  },
];

export const ParallaxScrollTestimonials = ({
  className,
}: {
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const third = Math.ceil(testimonials.length / 3);
  const firstPart = testimonials.slice(0, third);
  const secondPart = testimonials.slice(third, 2 * third);
  const thirdPart = testimonials.slice(2 * third);

  return (
    <section className={cn("w-full", className)}>
      {/* ✅ Section heading */}
      <h2 className="text-3xl sm:text-5xl lg:text-5xl text-center sm:mt-32 mb-12 tracking-wide s">
        What People{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
          are saying...
        </span>
      </h2>

      {/* ✅ Scrollable testimonials */}
      <div
        className="h-[40rem] px-10 overflow-y-auto scrollbar-hide"
        ref={gridRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-10 py-10 px-6 items-start">
          {[firstPart, secondPart, thirdPart].map((group, i) => (
            <div key={i} className="grid gap-10">
              {group.map((t, idx) => (
                <motion.div
                  key={t.name + idx}
                  style={{
                    y:
                      i === 0
                        ? translateFirst
                        : i === 1
                        ? translateSecond
                        : translateThird,
                  }}
                >
                  <TestimonialCard {...t} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function TestimonialCard({
  src,
  name,
  designation,
  quote,
}: Testimonial) {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="lg" src={src} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-lg font-semibold leading-none text-default-600">{name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{designation}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-lg text-white opacity-85">
        <p>{quote}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex self-end justify-end gap-2">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src="/assets/start.png"
              alt="star"
              className="w-5 h-5"
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}