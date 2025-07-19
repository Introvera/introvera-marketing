"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Projects, { projects, Card } from "@/components/Projects";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { ParallaxScrollTestimonials } from "@/components/Testi";
const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-0 px-5">
        <HeroSection />
        <AboutUs />
        <Services />
        <Projects
          items={projects.map((project, index) => (
            <Card key={index} card={project} index={index} />
          ))}
        />
        
        <WhyChooseUs />
        <Team />
        {/* <Testimonials autoplay={true} /> */}
        <ParallaxScrollTestimonials />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
