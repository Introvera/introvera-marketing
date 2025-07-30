"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Projects, { projects, Card } from "@/components/Projects";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { ParallaxScrollTestimonials } from "@/components/Testi";
import { ModernHero } from "@/components/ModernHero";
const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mx-0 pt-0 overflow-hidden">
      
        <div className="relative overflow-x-hidden">
          <ModernHero />
        </div>        
        <AboutUs />
        <Services />
        <Projects
          items={projects.map((project, index) => (
            <Card key={index} card={project} index={index} />
          ))}
        />
        <WhyChooseUs />
        <Team />
        <ParallaxScrollTestimonials />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
