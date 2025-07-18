"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/code.jpg";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";

interface ChecklistItem {
  title: string;
  description: string;
}

export const checklistItems: ChecklistItem[] = [
  {
    title: "Web App Development",
    description:
      " Fast, modern, and user-centric applications built for performance and scale.",
  },
  {
    title: "Mobile App Development",
    description:
      "Seamless native & cross-platform apps with clean UI and robust backends.",
  },
  {
    title: "UI/UX Design",
    description:
      "Human-centered design that turns ideas into intuitive experiences.",
  },
  {
    title: "Backend/API Development",
    description:
      "Secure, scalable APIs and systems using modern backend frameworks.",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Deployment, monitoring, and automation with cloud-native solutions.",
  },
  {
    title: "Consulting & Strategy",
    description:
      "Technical expertise to turn your product vision into a growth engine.",
  },
];

const Services: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="mt-20" id="services" ref={ref}>
      <motion.h2
        className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        At Introvera,{" "}
        <span className="bg-gradient-to-r from-purple-500 to-blue-800 text-transparent bg-clip-text">
          we provide...
        </span>
      </motion.h2>

      {/* <div className="flex flex-wrap justify-center">
        <motion.div
          className="mt-20 p-2 w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Image
            src={codeImg}
            alt="Coding"
            className="rounded-xl shadow-xl xl:mt-40"
            priority={true} 
            quality={80}   
            />
        </motion.div>

        <motion.div
          className="pt-12 w-full lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex mb-12 bg-gradient-to-r from-gray-900 to-gray-1000 rounded-2xl py-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
            >
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 flex justify-center items-center rounded-full shadow-md ">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl font-semibold text-white">{item.title}</h5>
                <p className="text-md text-neutral-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div> */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center h-[700px] mt-20" id="services" ref={ref}>
  {/* Sticky Image */}
  <motion.div
    className="p-2 w-full lg:w-1/2 sticky top-20 "
    initial={{ opacity: 0, x: -50 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    <Image
      src={codeImg}
      alt="Coding"
      className="rounded-xl shadow-xl"
      priority
      quality={80}
    />
  </motion.div>

  {/* Scrollable List */}
  <motion.div
    className="w-full lg:w-1/2 overflow-y-scroll hide-scrollbar px-4"
    style={{ maxHeight: "700px" }}
    initial={{ opacity: 0, x: 50 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    {checklistItems.map((item, index) => (
      <motion.div
        key={index}
        className="flex mb-12 bg-gradient-to-r from-gray-900 to-gray-1000 rounded-2xl py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
      >
        <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 flex justify-center items-center rounded-full shadow-md ">
          <CheckCircle2 />
        </div>
        <div>
          <h5 className="mt-1 mb-2 text-xl font-semibold text-white">{item.title}</h5>
          <p className="text-md text-neutral-400">{item.description}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>
    </div>
  );
};

export default Services;
