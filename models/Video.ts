import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
    width : 1080,
    heigth : 1920
} as const; 

export interface IVideo{
    _id? : mongoose.Types.ObjectId;
    title : string;
    description : string;
    videoUrl : string;
    thumbnailUrl : string;
    controls? : boolean;
    transformation? : {
        height? : number;
        width? : number;
        quality? : number;

    }
    userId: mongoose.Types.ObjectId;
    fileName: string;
    fileSize: number;
    fileType: string;
    views: number;
    likes: number;
}

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);