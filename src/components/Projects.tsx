"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ChevronDown, ExternalLink } from "lucide-react";

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
        "InterviewLab is a real-time technical interview platform built with a distributed architecture to support AI-assisted mock interviews. It uses Go channels for intra-server communication and Redis Pub/Sub for cross-server synchronization, enabling seamless collaboration even in a horizontally scaled environment. Shared code files are streamed in real time via WebSockets, allowing multiple users to edit concurrently. A Go-based REST API manages session routing and file persistence, storing all created files permanently in a PostgreSQL database. AI feedback is handled asynchronously by a FastAPI microservice deployed on AWS Lambda which calls GPT-4o. This service generates questions, provides hints, and explains code to enhance the interview experience. The backend is deployed on AWS ECS.",
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
      title: "CitySage.net",
      shortDescription:
        "Real-time urban intelligence dashboard for Washington, D.C.",
      fullDescription:
        "CitySage is a real-time urban intelligence dashboard that aggregates live traffic feeds, weather alerts, and metro data for Washington, D.C., serving 50+ users. Distributed inference workers deployed on AWS EC2 process over 10 traffic camera streams at 10 FPS using a custom-trained YOLOv8 model achieving 90%+ detection accuracy. The Flask backend handles distributed job routing and data aggregation, while the React frontend visualizes real-time detections and alerts. OpenAI API integration generates natural-language summaries of detected events from logs stored in Amazon RDS.",
      tags: [
        "Python",
        "YOLOv8",
        "Flask",
        "React",
        "Roboflow API",
        "OpenAI API",
        "AWS (EC2, RDS)",
      ],
      url: "https://citysage.net",
      github: "https://github.com/benli1003/CitySage",
    },
    {
      id: 3,
      title: "RAG-Powered Study Assistant",
      shortDescription:
        "AI powered CLI tool that answers questions using lecture PDFs",
      fullDescription:
        "I built this Retrieval-Augmented Generation (RAG) system to help me study by querying my class PDFs through a CLI interface. It parses and chunks documents with PyMuPDF, generates embeddings using Hugging Face transformers, and indexes them with FAISS. When I ask a question, it retrieves the most relevant chunks and generates a response locally using Ollama. The Python backend handles all parsing, embedding, and retrieval logic, while FastAPI powers the CLI and supporting functionality.",
      tags: ["Python", "FastAPI", "LangChain", "OpenAI API", "FAISS"],
      url: "https://github.com/echan23/ragbot",
      github: "https://github.com/echan23/ragbot",
    },
    {
      id: 4,
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
    <section className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8 text-center sm:text-left text-gray-800 font-bold">
          Projects
        </h2>

        <ul className="space-y-4 sm:space-y-6">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.id;

            return (
              <li
                key={project.id}
                data-index={index}
                className={`project-card transform transition-all duration-700 ease-out hover:bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-sm sm:hover:scale-[1.01] sm:hover:shadow-md sm:hover:-translate-y-1 ${
                  visibleProjects.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div
                  className={`transition-all duration-300 p-3 sm:p-4 ${
                    isExpanded ? "pb-2 sm:pb-3" : "pb-3 sm:pb-4"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="flex items-start flex-1 text-left focus:outline-none group w-full"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-medium text-gray-900 transition-all duration-300 line-clamp-1">
                            {project.title}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-300 ease-in-out flex-shrink-0 ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="text-xs text-gray-400">
                              +{project.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 sm:ml-4 self-start">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-300"
                        aria-label={`View ${project.title} live demo`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-300"
                        aria-label={`View ${project.title} on GitHub`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} />
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-96 opacity-100 mt-3 sm:mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-xs sm:text-sm text-gray-600 pb-2 sm:pb-3 leading-relaxed">
                        {project.fullDescription}
                      </p>
                      {project.tags.length > 4 && isExpanded && (
                        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-100">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
