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
    <div className="flex-shrink-0 p-6 bg-white w-full max-w-screen-md mx-auto">
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message..."
          className="w-full px-4 py-4 pr-12 text-base rounded-full bg-gray-50/80 backdrop-blur border-0 focus:bg-gray-100/80 hover:bg-gray-100/60 focus:outline-none focus:ring-0 transition-all duration-200 placeholder-gray-400"
        />
        <button
          onClick={onSubmit}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
            input.trim()
              ? "text-blue-500 hover:text-blue-600 hover:bg-blue-50"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
