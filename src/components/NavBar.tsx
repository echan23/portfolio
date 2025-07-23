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

    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
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

      {/* Mobile Version */}
      <TabNavMobile
        items={navItems}
        selectedIndex={selectedIndex}
        onItemClick={handleItemClick}
      />
    </>
  );
};

const TabNavMobile = ({
  items,
  selectedIndex,
  onItemClick,
}: {
  items: { label: string; id: string }[];
  selectedIndex: number;
  onItemClick: (index: number, id: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-15 left-0 right-0 w-full flex justify-center z-50 md:hidden px-4">
      <div className="relative w-full max-w-sm">
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-gray-500/10 dark:bg-gray-700/10 backdrop-blur-sm rounded-3xl p-1"
          >
            <div className="grid grid-cols-2 gap-2 relative">
              <motion.div
                className="absolute bg-white/90 dark:bg-neutral-800/90 rounded-3xl shadow-sm"
                layoutId="mobile-navbar-indicator"
                initial={false}
                animate={{
                  x: (selectedIndex % 2) * (100 / 2) + "%",
                  y: Math.floor(selectedIndex / 2) * 52,
                  width: "calc(50% - 4px)",
                  height: 44,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  bounce: 0.4,
                }}
              />

              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onItemClick(index, item.id);
                    setOpen(false);
                  }}
                  className={`
                    relative z-10 flex items-center justify-center p-3 rounded-3xl
                    h-12 transition-colors duration-200
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

            <motion.button
              onClick={() => setOpen(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 dark:bg-neutral-700 text-white rounded-full flex items-center justify-center text-xs"
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-white/90 dark:bg-neutral-800/90 rounded-3xl shadow-sm"
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              {items[selectedIndex].label}
            </span>
            <IconLayoutNavbarCollapse className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
