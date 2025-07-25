"use client";
import React, { useState, useEffect } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

const Experience: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const experiences: ExperienceItem[] = [
    {
      company: "Headway Technologies",
      role: "Software Engineering Intern",
      period: "June 2025 - Present",
      description: [
        "Engineered and scaled robust data pipelines leveraging Elasticsearch, Logstash, and MS SQL to extract, transform, and load (ETL) metadata for over 10,000,000 images used in semiconductor manufacturing.",
        "Built a C# log monitoring service to parse Logstash logs and send real-time alerts, cutting incident response time by 50%.",
        "Developed an internal file search tool using React and Elasticsearch, enabling fast, precise retrieval of semiconductor image metadata and saving R&D teams over 50 hours of manual lookup time per quarter.",
        "Created a multithreaded C# application and Python scripts to automate file traversal, metadata extraction, and ingestion.",
      ],
    },
    {
      company: "Umee",
      role: "Software Development Intern",
      period: "October 2024 - January 2025",
      description: [
        "Developed backend user authentication system using AWS Amplify and Cognito, ensuring secure and seamless access for users in a Flutter-based social media application.",
        "Cut application load time and redundant API calls by 30% by implementing session-based caching via BLoC and GraphQL.",
        "Used AWS Lambda to generate pre-signed S3 URLs for secure file uploads, offloading transfers from the backend.",
        "Contributed in an Agile environment via stand-ups and retrospectives to enhance team communication and workflow.",
      ],
    },
    {
      company: "Internal Revenue Service",
      role: "Data Analyst Intern",
      period: "January 2024 - May 2024",
      description: [
        "Cleaned and normalized taxpayer data for over 60,000 individuals using SQL Server, ensuring consistency and accuracy.",
        "Automated Power BI dashboards, reducing audit team data prep time by 30% and improving discrepancy detection.",
        "Maintained 500+ intern records in SharePoint, ensuring data accuracy, consistency, and efficient access for HR teams.",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
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

    const elements = document.querySelectorAll(".experience-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="Experience"
      className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">
          Experience
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              data-index={index}
              className={`experience-item border-l-2 sm:border-l border-gray-200 pl-4 sm:pl-5 transition-all duration-700 ease-out transform ${
                visibleItems.has(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="absolute -left-[18px] sm:-left-[25px] top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full border-2 border-white"></div>

                <div className="mb-2">
                  <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1">
                    {exp.company}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded w-fit">
                      {index === 0 && "Milpitas, CA"}
                      {index === 1 && "Remote"}
                      {index === 2 && "Washington, D.C."}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1">
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">
                    {exp.role}
                  </p>
                  <span className="text-xs text-gray-500">{exp.period}</span>
                </div>

                <div className="mt-3 space-y-2 sm:space-y-1.5">
                  {exp.description.map((item, i) => (
                    <p
                      key={i}
                      className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
