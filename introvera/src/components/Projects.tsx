"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useInView } from "react-intersection-observer";
import Image, { ImageProps, StaticImageData } from "next/image";
import { Link as HeroLink } from "@heroui/react";

// Static imports for images
import vivahaPlansImg from "@/assets/projects/wedding.jpg";
import ceylonTrails from "@/assets/projects/travel.jpg";
import schoolify from "@/assets/projects/schoolify.jpg";
import dreamAuto from "@/assets/projects/dream.jpg";
import weNeighbour from "@/assets/projects/weneighbour.jpg";

interface Project {
  title: string;
  category: string;
  description: string;
  src: StaticImageData;
  content: ReactNode;
  link?: string; // ✅ added link field
}

export const projects: Project[] = [
  {
    title: "Vivaha Plans",
    category: "Web & Mobile App",
    description: "An amazing project about web applications.",
    src: vivahaPlansImg,
    content: <div>Details about Project One here...</div>,
    link: "https://vivahaplans.com",
  },
  {
    title: "Ceylon Trails",
    category: "Mobile App and Web",
    description:
      "Discover Sri Lanka like never before! Personalized, Immersive, and Truly Local.",
    src: ceylonTrails,
    content: (
      <div>
        Our travel guide platform is your ultimate trip-planning companion,
        designed for both local and international travelers exploring Sri Lanka.
        We offer personalized itineraries based on your interests and budget,
        featuring everything from nature hikes and cultural sites to surfing,
        whale watching, and culinary experiences. Discover hidden gems, local
        festivals, and authentic spots with insider tips from locals. Build
        interactive itineraries, access real-time weather and event updates,
        and book transport, accommodations, and activities — all in one place.
        Whether you&apos;re seeking spiritual healing, adventure, or food tastings,
        our platform connects you with unforgettable experiences. Travel
        smarter, deeper, and more meaningfully, with safety, accessibility, and
        personalization at the core.
      </div>
    ),
    link: "https://youtube.com",
  },
  {
    title: "Schoolify",
    category: "Web App",
    description:
      "Your all-in-one learning companion, making studying smarter, not harder!",
    src: schoolify,
    content: (
      <div>
        Schoolify is a unified digital platform designed to bridge the
        communication and management gaps in Sri Lankan schools, especially in
        rural and public education sectors. By centralizing essential school
        operations, Schoolify empowers teachers, students, and parents to stay
        connected, informed, and engaged — all from one place. With features
        like real-time notifications, digital attendance tracking, assignment
        and grade management, and a centralized school calendar, Schoolify
        ensures that no student or parent misses critical academic updates. It
        reduces the administrative burden on educators while increasing parental
        involvement and student accountability. Through its intuitive interface
        and resource-sharing capabilities, Schoolify supports high-quality,
        accessible education by enabling remote access to study materials,
        progress reports, and school announcements. By streamlining
        communication and administration, Schoolify helps foster a more
        inclusive, collaborative, and effective educational ecosystem in Sri
        Lanka.
      </div>
    ),
    link: "https://facebook.com",
  },
  {
    title: "Dream Auto",
    category: "Web App",
    description: "Smarter Car Choices, Made Simple.",
    src: dreamAuto,
    content: (
      <div>
        Our vehicle recommendation platform is built to transform the way people
        buy vehicles — especially those who feel overwhelmed by the complexity
        of choosing the right car. Whether you&apos;re a first-time buyer, a busy
        professional, or someone simply unsure of how to navigate loans and
        insurance, our intelligent and user-friendly progressive web app is
        designed with you in mind.
        <br />
        Using machine learning, we provide smart, personalized vehicle
        suggestions tailored to your budget, lifestyle, and driving needs. From
        fuel economy to loan compatibility, our system considers every factor
        that matters — and gets smarter with every use. Alongside this, our
        integrated chatbot breaks down finance and insurance options
        step-by-step, so even those with no prior knowledge can make confident
        decisions.
        <br />
        But we don&apos;t stop there. The app includes powerful features like
        real-time price prediction, a vehicle comparison tool, availability
        tracking, and even test drive booking. Buyers can browse or sell through
        our built-in marketplace, while our insights into new and used vehicle
        trends help users find value and make informed choices.
        <br />
        Whether you&apos;re looking for a budget car, a sustainable EV, or a
        high-end investment vehicle, our platform is built to make the process
        smarter, faster, and easier for everyone — no expertise required.
      </div>
    ),
    link: "https://www.dreamautomart.com/",
  },
  {
    title: "We Neighbour",
    category: "Mobile App",
    description: "Managing Communities with Ease and Trust.",
    src: weNeighbour,
    content: (
      <div>
        We Neighbour is a modern, free community management platform designed
        specifically for apartment residents. Our mission is to build safer,
        more connected, and resourceful communities by simplifying daily living
        and encouraging meaningful engagement among neighbours. Whether it&apos;s
        borrowing a tool, reporting a maintenance issue, or planning a community
        event, We Neighbour brings all essential apartment functions into one
        smart platform.
        <br />
        Residents gain verified access to a secure environment through
        manager-approved profiles, ensuring privacy and safety. From real-time
        safety alerts and maintenance tracking to event calendars, amenity
        bookings, and visitor check-ins with QR codes, every feature is designed
        to improve communication and convenience within your building. Our
        platform also offers a trusted directory of service providers, a
        community forum for open discussion, and wellness programs that promote
        both physical and social wellbeing.
        <br />
        By supporting local businesses and making it easier for residents to
        connect, collaborate, and care for their shared spaces, We Neighbour
        transforms apartment living into a truly communal experience — safer,
        smarter, and more engaging for everyone.
      </div>
    ),
    link: "https://www.weneighbour.live/",
  },
];


interface CarouselContextType {
  onCardClose: (index: number) => void;
  currentIndex: number;
}

export const CarouselContext = createContext<CarouselContextType>({
  onCardClose: () => {},
  currentIndex: 0,
});

interface CarouselProps {
  items: ReactNode[];
  initialScroll?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  initialScroll = 0,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  const setRefs = (node: HTMLDivElement | null) => {
    carouselRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const isMobile = (): boolean =>
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full px-10" id="projects" ref={setRefs}>
        <h2 className="text-3xl sm:text-5xl lg:text-5xl text-center my-2 tracking-wide">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
            Projects
          </span>
        </h2>

        {inView ? (
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
            onScroll={checkScrollability}
          >
            <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />
            <div className={cn("flex flex-row justify-start gap-4 pl-4", "mx-auto max-w-7xl")}>
              {items.map((item, index) => (
                <motion.div
                  key={"card" + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" },
                  }}
                  className="rounded-3xl "
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ height: "300px" }} />
        )}
      </div>
    </CarouselContext.Provider>
  );
};

interface CardProps {
  card: Project;
  index: number;
  layout?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10 space-y-4">
                {card.content}

                {card.link && (
                  <HeroLink
                    isBlock
                    showAnchorIcon
                    color="primary"
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium"
                  >
                    Visit Project
                  </HeroLink>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p className="text-left font-sans text-sm font-medium text-white md:text-base">
            {card.category}
          </motion.p>
          <motion.p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white md:text-3xl">
            {card.title}
          </motion.p>
          <p className="mt-1 max-w-xs text-left font-sans text-sm text-white/80 md:text-base">
            {card.description}
          </p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};

interface BlurImageProps
  extends Omit<ImageProps, "placeholder" | "blurDataURL" | "alt"> {
  className?: string;
  alt: string;
}

export const BlurImage: React.FC<BlurImageProps> = ({
  className,
  alt,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...rest}
      alt={alt}
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoadingComplete={() => setLoading(false)}
      placeholder="blur"
      fill
    />
  );
};

export default Carousel;