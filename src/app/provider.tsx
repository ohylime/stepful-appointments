import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider className="h-full">{children}</NextUIProvider>;
}
