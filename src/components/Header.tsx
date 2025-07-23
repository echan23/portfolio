import React from "react";
import { Linkedin, Github, Download } from "lucide-react";

interface HeaderProps {
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  linkedinUrl = "https://linkedin.com/in/edchan23",
  githubUrl = "https://github.com/echan23",
  resumeUrl = "/assets/EdwardChanResume.pdf",
}) => {
  return (
    <header className="bg-white w-screen pl-4" id="header">
      <style>{`
        @keyframes dropDown {
          from {
            transform: translateY(-40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="flex items-center justify-start gap-4 m-3">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110 animate-[dropDown_0.6s_ease-out_forwards]"
          style={{
            transform: "translateY(-40px)",
            opacity: "0",
            animationDelay: "0ms",
          }}
        >
          <Linkedin className="w-5 h-5 transition-transform duration-300 hover:scale-105" />
        </a>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110 animate-[dropDown_0.6s_ease-out_forwards]"
          style={{
            transform: "translateY(-40px)",
            opacity: "0",
            animationDelay: "150ms",
          }}
        >
          <Github className="w-5 h-5 transition-transform duration-300 hover:scale-105" />
        </a>

        <a
          href={resumeUrl}
          download
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-105 animate-[dropDown_0.6s_ease-out_forwards]"
          style={{
            transform: "translateY(-40px)",
            opacity: "0",
            animationDelay: "300ms",
          }}
        >
          <Download className="w-4 h-4" />
          Resume
        </a>
      </div>
    </header>
  );
};

export default Header;
