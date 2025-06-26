"use client";

import { IKVideo } from "imagekitio-react";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isIKConfigured, setIsIKConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if ImageKit is properly configured
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    
    if (!urlEndpoint || !publicKey) {
      setIsIKConfigured(false);
      setError("ImageKit configuration is missing. Please check your environment variables.");
    }
  }, []);

  if (!isIKConfigured) {
    return (
      <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
        <div className="card-body p-4">
          <div className="text-red-500">
            {error || "Error loading video"}
          </div>
        </div>
      </div>
    );
  }

  // Extract the file path from the full URL
  const getVideoPath = (url: string) => {
    try {
      const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
      if (!urlEndpoint) return url;
      return url.replace(urlEndpoint, "");
    } catch (err) {
      console.error("Error processing video URL:", err);
      return url;
    }
  };

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={getVideoPath(video.videoUrl)}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={true}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {video.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}