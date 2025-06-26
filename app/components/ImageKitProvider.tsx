"use client";

import { IKContext } from "imagekitio-react";
import { ReactNode } from "react";

export default function ImageKitProvider({ children }: { children: ReactNode }) {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !urlEndpoint) {
    console.error("ImageKit configuration is missing");
    return <>{children}</>;
  }

  return (
    <IKContext 
      publicKey={publicKey} 
      urlEndpoint={urlEndpoint}
      transformationPosition="path"
    >
      {children}
    </IKContext>
  );
} 