"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const languages = [
    "Python",
    "Golang",
    "TypeScript",
    "Java",
    "JavaScript",
    "C#",
    "C",
    "SQL",
    "HTML/CSS",
    "OCaml",
    "Rust",
    "Swift",
  ];

  const frameworks = [
    "React",
    "Flask",
    "Node.js",
    "Express",
    "FastAPI",
    "Next.js",
    "Tailwind CSS",
    "Redux",
    "Pandas",
    "NumPy",
    "Selenium",
    "BeautifulSoup",
    "SwiftUI",
    "Flutter SDK",
  ];

  const tools = [
    "Git",
    "GitHub",
    "VSCode",
    "Eclipse",
    "IntelliJ",
    "Figma",
    "Notion",
    "WebSockets",
    "Elasticsearch",
  ];

  const databases = [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS S3",
    "AWS RDS",
    "AWS EC2",
    "AWS Lambda",
    "AWS DynamoDB",
    "AWS ECS",
  ];

  return (
    <div className="min-h-screen pb-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-6">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 transition-all duration-700 ease-out transform text-center ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          Hi, I&apos;m Edward!
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <div
          className={`flex gap-6 flex-col sm:flex-row max-w-3xl w-full transition-all duration-700 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="w-32 h-40 mx-auto sm:mx-0 rounded-lg overflow-hidden flex-shrink-0 transition duration-300 bg-gray-200">
            <Image
              src="/assets/me.JPG"
              alt="Profile"
              width={128}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="text-gray-700 flex-1 text-center sm:text-left">
            <h2 className="text-base font-bold mb-2 text-gray-800">about</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              I&apos;m a Computer Science student at the University of Maryland,
              College Park. My interests include backend infrastructure,
              full-stack development, AI/ML, distributed systems, cloud
              computing, and data engineering. I&apos;ve developed scalable,
              cloud-native applications using a variety of languages and
              frameworks, namely Python, Java, Go, C#, React, and TypeScript. I
              have extensive experience with the AWS cloud suite, ETL workflows,
              and tools such as Elasticsearch, Redis, and Docker.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`max-w-3xl mx-auto transition-all duration-700 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2 text-gray-800">languages</h2>
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {languages.map((lang, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-normal transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${400 + i * 30}ms` }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-base font-bold mb-2 text-gray-800">
            frameworks/libraries
          </h2>
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {frameworks.map((fw, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-normal transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${500 + i * 30}ms` }}
              >
                {fw}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-base font-bold mb-2 text-gray-800">
            tools & technologies
          </h2>
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {tools.map((tool, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-normal transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${550 + i * 30}ms` }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold mb-2 text-gray-800">
            databases & cloud
          </h2>
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {databases.map((db, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-normal transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${600 + i * 30}ms` }}
              >
                {db}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
