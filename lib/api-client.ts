import { IVideo } from "@/models/Video"
import ImageKit from "imagekit";

export type VideoFormData = Omit<IVideo, "_id">

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body? : any
    headers? : Record<string, string>
}

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ) : Promise<T>{
        const {method = "GET", body, headers = {}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        })

        if(!response.ok){
            throw new Error(await response.text()   );
        }

        return response.json();
    }

    async getVideos(){
        return this.fetch("/video") 
    }

    async createVideo(videoData : VideoFormData){
        return this.fetch("/video",{
            method: "POST",
            body: videoData,
        })
    }
}

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function uploadVideo(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const response = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${file.name}`,
      folder: "/videos",
    });

    return response.filePath;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw new Error("Failed to upload video to ImageKit");
  }
}

export const apiClient = new ApiClient();