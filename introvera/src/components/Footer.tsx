"use client";
import Image from "next/image";
import { FC } from "react";
import logo from "../assets/logofull.png";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type QuickLink = {
  text: string;
  href: string;
};

type SocialLink = {
  href: string;
  icon: IconDefinition;
  label: string;
};

const quickLinks: QuickLink[] = [
  { text: "Home", href: "#home" },
  { text: "About Us", href: "#about" },
  { text: "Projects", href: "#projects" },
  { text: "Services", href: "#services" },
];

const socialLinks: SocialLink[] = [
  { href: "https://www.linkedin.com/company/introvera/", icon: faLinkedin, label: "LinkedIn" },
  { href: "https://www.facebook.com/profile.php?id=61577711031531", icon: faFacebook, label: "Facebook" },
  { href: "#", icon: faInstagram, label: "Instagram" },
  { href: "https://github.com/Introvera-sl", icon: faGithub, label: "GitHub" },
];

const Footer: FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-neutral-300 px-6 md:px-12 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + Description */}
        <div className="md:col-span-1 text-center md:text-left">
          <div className="mb-4 flex justify-center md:justify-start">
            <Image src={logo} alt="Introvera Logo" className="w-32 h-auto" />
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto md:mx-0">
            Empowering businesses with intelligent, scalable, and secure software solutions.
            We build with passion and purpose for the digital future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-white transition">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-3">Social Media</h4>
          <ul className="space-y-2 text-sm">
            {socialLinks.map((link, idx) => (
              <li key={idx} className="flex items-center gap-2 justify-center md:justify-start">
                <FontAwesomeIcon icon={link.icon} className="text-lg" />
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm mb-2">📍 275/3, New Kandy Road, Biyagama.</p>
          <p className="text-sm mb-2">📞 +94 716782 225</p>
          <p className="text-sm mb-4">
            📧{" "}
            <a href="mailto:teamintrovera@gmail.com" className="hover:text-white">
              teamintrovera@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Divider & Bottom Bar */}
      <div className="border-t border-neutral-800 mt-12 pt-6 text-sm text-center text-neutral-500">
        &copy; {new Date().getFullYear()} Introvera. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
