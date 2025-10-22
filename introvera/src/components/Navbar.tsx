"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../assets/logofull.png";

interface NavItem {
  label: string;
  href: string; // "#about"
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },     
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
];

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [activeSection, setActiveSection] = useState<string>("#");

  const toggleNavbar = () => setMobileDrawerOpen((v) => !v);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const observedIds = useMemo(
    () =>
      navItems
        .map((n) => n.href.startsWith("#") ? n.href.slice(1) : "")
        .filter(Boolean),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || observedIds.length === 0) return;

    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const id = `#${visible[0].target.id}`;
          setActiveSection(id);
        } else {

        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [observedIds]);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const target = id ? document.getElementById(id) : document.body;

      if (target) {
        const y =
          (target as HTMLElement).getBoundingClientRect().top +
          window.pageYOffset -
          72;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        window.location.hash = href;
      }
      setMobileDrawerOpen(false);
    }
  };

  const linkBase =
    "transition-colors duration-200";
  const linkInactive =
    "text-neutral-300 hover:text-white";
  const linkActive =
    "text-white font-medium underline underline-offset-8";

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80"
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Image
              className="w-25 mr-2"
              src={logo}
              alt="Logo"
              priority
            />
          </div>

          {/* Desktop nav */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                    className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-blue-800 py-2 px-3 rounded-md text-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              Talk to us
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Toggle menu">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="text-center">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={index} className="py-4">
                    <a
                      href={item.href}
                      onClick={handleNavClick(item.href)}
                      className={`${linkBase} ${isActive ? "text-white font-medium" : "text-neutral-300"}`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="flex space-x-6 mt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-800 text-white"
                onClick={() => setMobileDrawerOpen(false)}
              >
                Talk to us
              </motion.a>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;