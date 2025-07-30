"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Avatar } from "@heroui/react";
import { Linkedin } from "lucide-react";

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
  image: { src: string };
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

const Team = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay
  useEffect(() => {
    const slide = async () => {
      const width = containerRef.current?.scrollWidth || 0;
      const scrollDistance = width / 2;
      await controls.start({
        x: -scrollDistance,
        transition: {
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    if (!isHovered) {
      slide();
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <div className="w-full pb-10 overflow-hidden bg-white dark:bg-neutral-950">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-14 mb-6 text-center">
        Meet Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">
          Team
        </span>
      </h2>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="overflow-hidden cursor-grab active:cursor-grabbing py-5" 
      >
        <motion.div
          className="flex gap-8 px-4"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.1}
        >
          {[...teamMembers, ...teamMembers].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-6 rounded-xl shadow-lg w-64 md:w-72 flex flex-col items-center text-center transition-all duration-300"
            >
              <Avatar isBordered src={member.image.src} size="lg" className="w-24 h-24" />
              <div className="mt-4 font-semibold  text-lg">{member.name}</div>
              <div className="text-md text-neutral-500 dark:text-neutral-300">{member.position}</div>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md text-blue-500 mt-2 inline-flex items-center gap-1 hover:underline"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Team;