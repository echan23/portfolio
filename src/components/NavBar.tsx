"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";

const NavBar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const handleItemClick = (index: number, id: string) => {
    setSelectedIndex(index);
    const el = document.getElementById(id);
    if (el) {
      if (id === "about") {
        document
          .getElementById("header")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-15 left-0 right-0 w-full justify-center z-50 hidden md:flex">
        <div className="relative bg-gray-500/10 dark:bg-gray-700/10 backdrop-blur-sm rounded-3xl p-1">
          <div className="flex relative">
            <motion.div
              className="absolute top-0 bottom-0 bg-white/90 dark:bg-neutral-800/90 rounded-3xl shadow-sm"
              layoutId="navbar-indicator"
              initial={false}
              animate={{
                x: selectedIndex * 110,
                width: 110,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                bounce: 0.4,
              }}
            />

            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(index, item.id)}
                className={`
                  relative z-10 flex items-center justify-center px-5 py-3 rounded-3xl
                  min-w-[110px] h-12 transition-colors duration-200
                  ${
                    selectedIndex === index
                      ? "text-gray-800 dark:text-neutral-200"
                      : "text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  }
                `}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
