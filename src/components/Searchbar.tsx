"use client";

import React, { useRef, useEffect } from "react";

interface SearchbarProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: () => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ input, setInput, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="flex-shrink-0 p-4 sm:p-6 bg-white w-full max-w-screen-md mx-auto text-gray-900">
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message..."
          className="w-full px-4 py-3 sm:py-4 pr-12 text-sm sm:text-base rounded-full bg-gray-100 border border-gray-200 focus:bg-white focus:border-gray-300 hover:bg-gray-50 transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-0"
        />
        <button
          onClick={onSubmit}
          disabled={!input.trim()}
          className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
            input.trim()
              ? "text-blue-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="sm:w-5 sm:h-5"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
