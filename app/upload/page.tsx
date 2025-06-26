"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Upload New Video
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Share your amazing content with the world
          </p>
        </div>
        <VideoUploadForm />
      </div>
    </div>
  );
}