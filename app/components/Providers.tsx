"use client";

import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";
import { ThemeProvider } from "./ThemeProvider";
import ImageKitProvider from "./ImageKitProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <NotificationProvider>
          <ImageKitProvider>
            {children}
          </ImageKitProvider>
        </NotificationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}