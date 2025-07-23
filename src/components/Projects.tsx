"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ChevronDown } from "lucide-react";

type Project = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  url: string;
  github: string;
};

export default function ProjectsSection(): React.ReactNode {
  const projects: Project[] = [
    {
      id: 1,
      title: "InterviewLab.dev",
      shortDescription:
        "Collaborative mock interview platform with AI assistance",
      fullDescription:
        "InterviewLab is a real-time technical interview platform built with a distributed architecture to support AI-assisted mock interviews. It uses Go channels for intra-server communication and Redis Pub/Sub for cross-server synchronization, enabling seamless collaboration even in a horizontally scaled environment. Shared code files are streamed in real time via WebSockets, allowing multiple users to edit concurrently. A Go-based REST API manages session routing and file persistence, storing all created files permanently in a PostgreSQL database. AI feedback is handled asynchronously by a FastAPI microservice deployed on AWS Lambda which calls GPT-4o. This service generates prompts, provides hints, and explains code to enhance the interview experience.",
      tags: [
        "Go",
        "Python",
        "React/Typescript",
        "PostgreSQL",
        "Redis",
        "WebSockets",
        "FastAPI",
        "OpenAI API",
        "Docker",
      ],
      url: "https://interviewlab.dev",
      github: "https://github.com/echan23/interviewlab",
    },
    {
      id: 2,
      title: "RAG-Powered Study Assistant",
      shortDescription:
        "AI powered CLI tool that answers questions using lecture PDFs",
      fullDescription:
        "I built this Retrieval-Augmented Generation (RAG) system to help me study by querying my class PDFs through a CLI interface. It parses and chunks documents with PyMuPDF, generates embeddings using OpenAI, and indexes them with FAISS. When I ask a question, it retrieves the most relevant chunks and generates a response locally using Ollama. The Python backend handles all parsing, embedding, and retrieval logic, while FastAPI powers the CLI and supporting functionality.",
      tags: ["Python", "FastAPI", "LangChain", "OpenAI API", "FAISS"],
      url: "https://github.com/echan23/ragbot",
      github: "https://github.com/echan23/ragbot",
    },
    {
      id: 3,
      title: "TerpBites.net",
      shortDescription: "Real-time nutrition data from UMD Dining Services",
      fullDescription:
        "I built TerpBites to simplify navigating UMD's dining hall menus and tracking calories—something the official site made difficult. It scrapes nutritional data using BeautifulSoup and stores it in a MySQL database on Amazon RDS. The frontend is built with React and TypeScript, while a Flask API deployed on AWS Lambda powers the dynamic search. Users can add food items, adjust serving sizes, and view total macros for their meals, making it easier to stay informed about their nutrition.",
      tags: [
        "React",
        "Python",
        "Flask",
        "MySQL",
        "BeautifulSoup",
        "AWS Lambda",
      ],
      url: "https://terpbites.net",
      github: "https://github.com/echan23/terpbites",
    },
  ];

  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(
    new Set()
  );
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleProjects((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index);
            }
          });
          return newSet;
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".project-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-medium mb-4 pl-4">Projects</h2>

      <ul className="space-y-6">
        {projects.map((project, index) => {
          const isExpanded = expandedProject === project.id;

          return (
            <li
              key={project.id}
              data-index={index}
              className={`project-card transform transition-all duration-700 ease-out rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 ${
                visibleProjects.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className={`transition-all duration-300 p-4 ${
                  isExpanded ? "pb-3" : "pb-4"
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex items-center flex-1 text-left focus:outline-none group"
                  >
                    <div className="flex-1">
                      <span className="text-lg font-medium text-gray-900 transition-all duration-300">
                        {project.title}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {project.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="text-xs text-gray-400">
                            {index > 0 && "•"} {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-300 ease-in-out ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div className="flex items-center ml-4">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-300"
                      aria-label={`View ${project.title} live demo`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-300"
                      aria-label={`View ${project.title} on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "max-h-40 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-600 pb-3">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
