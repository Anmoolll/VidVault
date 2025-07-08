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
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (urlEndpoint) {
    path = path.replace(urlEndpoint, "");
  }
  return path.startsWith("/") ? path.slice(1) : path;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectToDatabase();

    const videoId = params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    if (video.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to delete this video" }, { status: 403 });
    }

    const fileId = getImageKitFileId(video.videoUrl);

    if (fileId) {
      try {
        await imagekit.deleteFile(fileId);
      } catch (error) {
        console.error("Error deleting from ImageKit:", error);
      }
    }

    await Video.findByIdAndDelete(videoId);

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
