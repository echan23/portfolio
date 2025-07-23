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
    "Rust",
    "Swift",
    "HTML/CSS",
  ];

  const frameworks = [
    "React",
    "Flask",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Pandas",
    "NumPy",
    "Flutter SDK",
    "Selenium",
    "BeautifulSoup",
    "SwiftUI",
  ];

  return (
    <div className="pt-10 pb-20 bg-transparent">
      <div className="flex justify-center mb-6">
        <h1
          className={`text-5xl font-bold text-gray-800 transition-all duration-700 ease-out transform ${
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
          className={`flex gap-6 flex-wrap sm:flex-nowrap max-w-3xl w-full transition-all duration-700 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="w-32 h-40 rounded-lg overflow-hidden flex-shrink-0 transition duration-300">
            <Image
              src="/assets/me.JPG"
              alt="Profile"
              width={128}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="text-gray-700 flex-1">
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
          <div className="flex flex-wrap gap-1.5">
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

        <div>
          <h2 className="text-base font-bold mb-2 text-gray-800">
            frameworks & libraries
          </h2>
          <div className="flex flex-wrap gap-1.5">
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
      </div>
    </div>
  );
}
