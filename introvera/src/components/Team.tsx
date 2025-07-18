"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image, { StaticImageData } from "next/image";

// Team Images
import nimesh from "../assets/team-photos/nimesh.png";
import sonal from "../assets/team-photos/sonal.jpeg";
import deeshana from "../assets/team-photos/deeshana.jpeg";
import malindu from "../assets/team-photos/malindu.jpeg";
import hasaru from "../assets/team-photos/hasaru.jpeg";
import sankaja from "../assets/team-photos/sankaja.jpeg";
import sandara from "../assets/team-photos/sandara.jpeg";
import nelith from "../assets/team-photos/nelith.jpeg";
import rasindu from "../assets/team-photos/rasindu.jpeg";
import kisara from "../assets/team-photos/kisara.jpeg";
import nithula from "../assets/team-photos/nithula.jpeg";

interface TeamMember {
  name: string;
  position: string;
  image: StaticImageData;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  { name: "Nimesh Deepamal", position: "Co-Founder", image: nimesh, linkedin: "https://linkedin.com/in/nimesh-deepamal" },
  { name: "Sonal Kethaka", position: "Co-Founder", image: sonal, linkedin: "https://www.linkedin.com/in/sonal-pathinayaka/" },
  { name: "Deeshana Liyanage", position: "Co-Founder", image: deeshana, linkedin: "https://www.linkedin.com/in/deeshanaliyanage/" },
  { name: "Malindu Bandara", position: "Co-Founder", image: malindu, linkedin: "https://www.linkedin.com/in/malindu-bandara-211223210/" },
  { name: "Hasaru Uyanahewa", position: "Co-Founder", image: hasaru, linkedin: "https://www.linkedin.com/in/hasaruuyanahewa/" },
  { name: "Sankaja Pandipperuma", position: "Developer", image: sankaja, linkedin: "https://www.linkedin.com/in/sankaja-pandipperuma-477a7b268/" },
  { name: "Sandara Apoorwa", position: "Developer", image: sandara, linkedin: "https://www.linkedin.com/in/sandara-hettiarachchi-830bb6202/" },
  { name: "Nelith Nethsanda", position: "Developer", image: nelith, linkedin: "https://www.linkedin.com/in/nelith-nethsanda/" },
  { name: "Rasindu Bandara", position: "Developer", image: rasindu, linkedin: "https://www.linkedin.com/in/rasindubandara/" },
  { name: "Kisara Nuwanga", position: "Developer", image: kisara, linkedin: "https://www.linkedin.com/in/kisara-bandara-a2826a296/" },
  { name: "Nithula Hansaja", position: "Developer", image: nithula, linkedin: "https://www.linkedin.com/in/nithula-hansaja/" },
];

const getCardsToShow = (): number => {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 1280) return 5;
    if (window.innerWidth >= 640) return 3;
  }
  return 3;
};

const Team = () => {
  const [start, setStart] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  // Combine refs for container and inView observer
  const setRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    const handleResize = () => setCardsToShow(getCardsToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStart((prev) => (prev + 1) % teamMembers.length);
    }, 2500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [start, cardsToShow]);

  useEffect(() => {
    if (containerRef.current && containerRef.current.firstChild instanceof HTMLElement) {
      const cardWidth = containerRef.current.firstChild.offsetWidth;
      containerRef.current.scrollTo({
        left: cardWidth * start,
        behavior: "smooth",
      });
    }
  }, [start, cardsToShow]);

  return (
    <div className="mt-16 mb-16 max-w-full" ref={setRefs}>
      <h2 className="text-3xl sm:text-5xl lg:text-5xl text-center my-8 tracking-wide">
        Meet Our{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
          Team
        </span>
      </h2>

      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex gap-2 sm:gap-4 xl:gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex-shrink-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-md flex flex-col items-center p-2 sm:p-4 xl:p-6 min-w-[90px] sm:min-w-[140px] md:min-w-[180px] xl:min-w-[220px] max-w-xs h-32 sm:h-44 md:h-52 xl:h-60 transition-all duration-500 hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-800 hover:border-4"
              style={{ scrollSnapAlign: "start" }}
            >
              <Image
                src={member.image}
                alt={member.name}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 object-cover rounded-full shadow mb-2 sm:mb-4"
                priority={true}
              />
              <div className="text-xs sm:text-sm md:text-base xl:text-lg font-semibold text-center">
                {member.name}
              </div>
              <div className="text-neutral-500 dark:text-neutral-300 text-[10px] sm:text-xs md:text-sm xl:text-base text-center">
                {member.position}
              </div>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs md:text-sm xl:text-base hover:underline"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          ))}
        </motion.div>
      ) : (
        <div style={{ height: "15rem" }} />
      )}
    </div>
  );
};

export default Team;
