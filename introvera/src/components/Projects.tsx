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

// Static imports for images so Next.js can auto generate blurDataURL
import vivahaPlansImg from "@/assets/projects/vivahaplans.jpg";
import project2Img from "@/assets/projects/project2.jpg";

interface Project {
  title: string;
  category: string;
  description: string;
  src: StaticImageData; // changed from string to StaticImageData
  content: ReactNode;
}

export const projects: Project[] = [
  {
    title: "Vivaha Plans",
    category: "Web & Mobile App",
    description: "An amazing project about web applications.",
    src: vivahaPlansImg,
    content: <div>Details about Project One here...</div>,
  },
  {
    title: "Project Two",
    category: "Mobile App",
    description: "A cool mobile app project description.",
    src: vivahaPlansImg,
    content: <div>Details about Project Two here...</div>,
  },
  {
    title: "Project Three",
    category: "Mobile App",
    description: "A cool mobile app project description.",
    src: vivahaPlansImg,
    content: <div>Details about Project Three here...</div>,
  },
  {
    title: "Project Four",
    category: "Mobile App",
    description: "Another cool mobile app project.",
    src: vivahaPlansImg,
    content: <div>Details about Project Four here...</div>,
  },
];

// Context type
interface CarouselContextType {
  onCardClose: (index: number) => void;
  currentIndex: number;
}

export const CarouselContext = createContext<CarouselContextType>({
  onCardClose: () => {},
  currentIndex: 0,
});

// Props types
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

  // Intersection Observer for lazy loading
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  // Combine refs for carousel container
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
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // md:w-96
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = (): boolean => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full px-10" id="projects" ref={setRefs}>
        {/* Heading above the carousel */}
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

            <div
              className={cn(
                "flex flex-row justify-start gap-4 pl-4",
                "mx-auto max-w-7xl"
              )}
            >
              {items.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                    },
                  }}
                  key={"card" + index}
                  className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Placeholder for layout stability before in view
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
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

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
              <div className="py-10">{card.content}</div>
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
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.title}
          </motion.p>
          {/* Description added below title */}
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
  alt: string; // Required string to satisfy next/image
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
