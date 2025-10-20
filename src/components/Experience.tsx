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
    company: "VetsEZ Inc",
    role: "Software Development Intern",
    period: "September 2025 - Present",
    description: [
      "Migrated a MUMPS/ObjectScript service to Java Spring Boot using OData and Apache Olingo, implementing RESTful design patterns to improve modularity and reusability.",
      "Integrated automated testing and deployment workflows into Jenkins and GitHub Actions CI/CD pipelines, enhancing reliability and release consistency.",
    ],
  },
  {
    company: "Headway Technologies",
    role: "Software Engineering Intern",
    period: "June 2025 - August 2025",
    description: [
      "Built ETL pipelines using Elasticsearch, Logstash, and MS SQL to process over 30 million image metadata records, enabling real-time defect analysis in semiconductor manufacturing.",
      "Developed an internal React + Elasticsearch search tool for instant defect image lookup, eliminating 50+ hours of manual research per quarter.",
      "Created multithreaded C# and Python (pandas/numpy) workflows to automate data ingestion and transformation, improving throughput and reducing human intervention.",
      "Implemented a C# log monitoring service to parse Logstash logs and trigger real-time alerts, cutting incident response time by 50%.",
    ],
  },
  {
    company: "Umee",
    role: "Software Development Intern",
    period: "October 2024 - January 2025",
    description: [
      "Implemented a secure file-upload pipeline on AWS Lambda using pre-signed S3 URLs, reducing backend overhead by 70%.",
      "Architected new GraphQL APIs and re-engineered legacy services on AWS AppSync + DynamoDB, leveraging BLoC caching to cut redundant requests by 30% and boost content delivery speed.",
      "Built end-to-end authentication with AWS Amplify and Cognito for secure user access in a Flutter social media app.",
    ],
  },
  {
    company: "Internal Revenue Service",
    role: "Data Analyst Intern",
    period: "January 2024 - May 2024",
    description: [
      "Cleaned and standardized 60K+ taxpayer records in SQL Server to ensure accuracy and data integrity.",
      "Developed Power BI dashboards to replace manual Excel workflows, improving data turnaround by 40% for 10+ stakeholders.",
      "Maintained 500+ intern records in SharePoint, ensuring consistency and accessibility for HR operations.",
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
                      {index === 0 && "Remote"}
                      {index === 1 && "Milpitas, CA"}
                      {index === 2 && "Remote"}
                      {index === 3 && "Washington, D.C."}
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
