"use client";

import VideoFeed from "./components/VideoFeed";
import { useTheme } from "./components/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import Header from "./components/Header";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode</span>
              </>
            ) : (
              <>
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Light mode</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Welcome to VidVault
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your personal space for sharing and discovering amazing videos. Upload,
            watch, and connect with others through the power of video content.
          </p>
        </div>

        {/* Video Feed Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Latest Videos
          </h2>
          <VideoFeed />
        </div>
      </div>
    </div>
  );
}