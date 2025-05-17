// hooks/useResponsive.ts
"use client";
import { useState, useEffect } from "react";

type Device = "mobile" | "tablet" | "desktop";

export default function useResponsive(): Device {
  const [device, setDevice] = useState<Device>("desktop");

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice("mobile");
      else if (width < 1024) setDevice("tablet");
      else setDevice("desktop");
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  return device;
}
