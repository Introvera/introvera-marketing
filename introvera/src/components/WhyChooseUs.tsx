// "use client";

// import React from "react";
// import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";
// import {
//   FileCode,
//   Cpu,
//   SmartphoneNfc,
//   Handshake,
//   Clock2,
//   Users,
// } from "lucide-react";

// interface ChooseUsItem {
//   icon: React.ReactNode;
//   text: string;
//   description: string;
// }

// export const chooseus: ChooseUsItem[] = [
//   {
//     icon: <FileCode className="w-5 h-5" />,
//     text: "Clean Code",
//     description: "We write readable, maintainable code that’s easy to scale.",
//   },
//   {
//     icon: <Cpu className="w-5 h-5" />,
//     text: "Agile Process",
//     description: "We work in fast, flexible sprints to deliver results quickly.",
//   },
//   {
//     icon: <SmartphoneNfc className="w-5 h-5" />,
//     text: "Clear Communication",
//     description: "We keep you updated every step of the way — no surprises.",
//   },
//   {
//     icon: <Handshake className="w-5 h-5" />,
//     text: "Business-Focused",
//     description: "Our solutions align with your goals, not just the tech.",
//   },
//   {
//     icon: <Clock2 className="w-5 h-5" />,
//     text: "On-Time Delivery",
//     description: "We respect your deadlines and deliver as promised.",
//   },
//   {
//     icon: <Users className="w-5 h-5" />,
//     text: "Skilled Team",
//     description: "Experienced developers, designers, and strategists on every project.",
//   },
// ];

// const WhyChooseUs: React.FC = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     rootMargin: "0px 0px -100px 0px",
//   });

//   return (
//     <div
//       ref={ref}
//       className="relative mt-20  min-h-[400px] px-4 mb-20 px-10"
//     >
//       {inView ? (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <div className="text-center">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
//               Why Choose{" "}
//               <span className="bg-gradient-to-r from-purple-500 to-blue-800 text-transparent bg-clip-text">
//                 Us
//               </span>
//             </h2>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 py-5">
//             {chooseus.map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-6 rounded-xl border border-neutral-800 shadow-md flex flex-col gap-3"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-8 w-8 p-1 items-center justify-center bg-neutral-800 rounded-full text-blue-500">
//                     {item.icon}
//                   </div>
//                   <h5 className="text-base font-semibold">{item.text}</h5>
//                 </div>
//                 <p className="text-sm text-neutral-400">{item.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       ) : (
//         <div style={{ height: "400px" }} />
//       )}
//     </div>
//   );
// };

// export default WhyChooseUs;
"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { HoverEffect } from "../components/ui/card-hover-effect";
import {
  FileCode,
  Cpu,
  SmartphoneNfc,
  Handshake,
  Clock2,
  Users,
} from "lucide-react";

const chooseus = [
  {
    icon: <FileCode className="w-5 h-5" />,
    title: "Clean Code",
    description: "We write readable, maintainable code that’s easy to scale.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Agile Process",
    description: "We work in fast, flexible sprints to deliver results quickly.",
  },
  {
    icon: <SmartphoneNfc className="w-5 h-5" />,
    title: "Clear Communication",
    description: "We keep you updated every step of the way — no surprises.",
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Business-Focused",
    description: "Our solutions align with your goals, not just the tech.",
  },
  {
    icon: <Clock2 className="w-5 h-5" />,
    title: "On-Time Delivery",
    description: "We respect your deadlines and deliver as promised.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Skilled Team",
    description: "Experienced developers, designers, and strategists on every project.",
  },
];

const WhyChooseUs: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  const items = chooseus.map((item) => ({
    title: (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 p-1 items-center justify-center bg-neutral-800 rounded-full text-blue-500">
          {item.icon}
        </div>
        <span>{item.title}</span>
      </div>
    ),
    description: item.description,
    link: "#",
  }));

  return (
    <div ref={ref} className="relative mt-20 px-4 mb-20 lg:px-10">
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-800 text-transparent bg-clip-text">
                Us
              </span>
            </h2>
          </div>

          <div className="mt-16 py-5">
            <HoverEffect items={items} />
          </div>
        </motion.div>
      ) : (
        <div style={{ height: "400px" }} />
      )}
    </div>
  );
};

export default WhyChooseUs;