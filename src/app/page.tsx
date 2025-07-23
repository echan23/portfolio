"use client";
import AboutMe from "../components/AboutMe";
import Experience from "../components/Experience";
import NavBar from "../components/NavBar";
import Projects from "../components/Projects";
import ContactSection from "@/components/ContactMe";

export default function Home() {
  return (
    <div>
      <main className=" sm:pt-10 sm:px-20 flex flex-col gap-y-60">
        <div id="about">
          <AboutMe />
        </div>
        <div id="experience" className="scroll-mt-20">
          <Experience />
        </div>
        <div id="projects" className="scroll-mt-20">
          <Projects />
        </div>
        <div id="contact" className="scroll-mt-20">
          <ContactSection />
        </div>

        <NavBar />
      </main>
    </div>
  );
}
