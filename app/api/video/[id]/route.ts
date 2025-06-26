import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Video } from "@/models/Video";
import { connectToDatabase } from "@/lib/db";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

// Helper function to extract ImageKit file ID from path
function getImageKitFileId(path: string) {
  // Remove the URL endpoint if it exists
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (urlEndpoint) {
    path = path.replace(urlEndpoint, "");
  }
  
  // Remove leading slash if exists
  path = path.startsWith("/") ? path.slice(1) : path;
  
  // Return the full path as the file ID
  return path;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Get the video ID from params
    const videoId = await Promise.resolve(params.id);

    // Find the video
    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 }
      );
    }

    // Check if the user owns the video
    if (video.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this video" },
        { status: 403 }
      );
    }

    // Get ImageKit file ID
    const fileId = getImageKitFileId(video.videoUrl);
    
    if (fileId) {
      try {
        // Delete from ImageKit
        await imagekit.deleteFile(fileId);
      } catch (error) {
        console.error("Error deleting from ImageKit:", error);
        // Continue with database deletion even if ImageKit deletion fails
      }
    }

    // Delete from database
    await Video.findByIdAndDelete(videoId);

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
} 