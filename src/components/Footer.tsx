"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(navigator.platform.toUpperCase().includes("MAC"));
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsOpen(false);
      setSearchQuery("");
      router.push(`/chat?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const suggestions = ["About", "Experience", "Projects", "Contact", "Resume"];

  return (
    <>
      <div className="bg-white">
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-2 text-xs sm:text-sm">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {!isMobile && <span className="hidden sm:inline">Press</span>}
              {!isMobile && (
                <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">
                  {isMac ? "⌘" : "Ctrl"} K
                </kbd>
              )}
              {!isMobile && <span className="hidden sm:inline">to search</span>}
              {isMobile && (
                <span className="inline sm:hidden py-2">Tap to search</span>
              )}
            </button>
          </div>
        </footer>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl mx-4 border border-gray-200 overflow-hidden">
            <div className="flex items-center px-4 py-3">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Ask me anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className="flex-1 outline-none text-gray-900 placeholder-gray-500"
              />
              {!isMobile && (
                <div className="hidden sm:flex items-center gap-1 text-gray-400 ml-3">
                  <span className="text-sm">{isMac ? "⌘" : "Ctrl"}</span>
                  <span className="text-sm">K</span>
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-gray-100">
              <ul className="space-y-1">
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      onClick={() => {
                        if (suggestion === "Resume") {
                          const link = document.createElement("a");
                          link.href = "/assets/EdwardChanResume.pdf";
                          link.download = "EdwardChanResume.pdf";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          const sectionId = suggestion.toLowerCase();
                          if (sectionId === "about") {
                            router.push("/");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            const element = document.getElementById(sectionId);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            } else {
                              router.push(`/#${sectionId}`);
                            }
                          }
                        }
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
              <span className="text-sm text-gray-500">
                Press{" "}
                <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">
                  Enter
                </kbd>{" "}
                to search
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
