"use client";

import { IKVideo } from "imagekitio-react";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useNotification } from "./Notification";
import { useRouter } from "next/navigation";

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isIKConfigured, setIsIKConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    // Check if ImageKit is properly configured
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    
    if (!urlEndpoint || !publicKey) {
      setIsIKConfigured(false);
      setError("ImageKit configuration is missing. Please check your environment variables.");
    }
  }, []);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this video?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/video/${video._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      showNotification("Video deleted successfully", "success");
      router.refresh(); // Refresh the page to update the video list
    } catch (err) {
      console.error("Error deleting video:", err);
      showNotification("Failed to delete video", "error");
    } finally {
      setIsDeleting(false);
    }
  };

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
        <div className="flex justify-between items-start">
          <Link
            href={`/videos/${video._id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {video.title}
            </h2>
          </Link>
          
          {session?.user?.id === video.userId?.toString() && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Delete video"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}