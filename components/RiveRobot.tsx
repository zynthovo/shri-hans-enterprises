"use client";

import { useEffect, useRef } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import { useInView } from "@/components/useInView";
import { useIsMobile } from "@/components/useIsMobile";

const SRC = "/assets/6925-13315-cat-robot.riv";

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center text-white/70">
      <i className="bi bi-robot animate-pulse text-7xl drop-shadow-[0_0_30px_rgba(0,93,237,0.6)]" />
    </div>
  );
}

function RiveStage() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const { rive, RiveComponent } = useRive({
    src: SRC,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  // Phones: drive the robot with the gyroscope by synthesizing pointer moves
  // over the canvas from device tilt (desktop already works with the mouse).
  useEffect(() => {
    if (!isMobile || !rive) return;
    const el = containerRef.current;
    const canvas = el?.querySelector("canvas");
    if (!canvas) return;

    const onOrient = (e: DeviceOrientationEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const gamma = e.gamma ?? 0; // left/right tilt  (-90..90)
      const beta = e.beta ?? 0; //   front/back tilt (-180..180)
      const nx = Math.min(1, Math.max(0, (gamma + 35) / 70));
      const ny = Math.min(1, Math.max(0, (beta - 15) / 65));
      const clientX = rect.left + nx * rect.width;
      const clientY = rect.top + ny * rect.height;
      canvas.dispatchEvent(
        new MouseEvent("mousemove", { clientX, clientY, bubbles: true })
      );
      canvas.dispatchEvent(
        new PointerEvent("pointermove", { clientX, clientY, bubbles: true })
      );
    };

    let attached = false;
    const attach = () => {
      if (attached) return;
      window.addEventListener("deviceorientation", onOrient);
      attached = true;
    };

    // iOS 13+ requires requesting permission from a user gesture.
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const requestOnTap = async () => {
      try {
        if (DOE && typeof DOE.requestPermission === "function") {
          const res = await DOE.requestPermission();
          if (res === "granted") attach();
        }
      } catch {
        /* ignore */
      }
    };

    if (DOE && typeof DOE.requestPermission === "function") {
      el?.addEventListener("pointerdown", requestOnTap);
    } else {
      attach(); // Android / non-iOS: no permission gate
    }

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      el?.removeEventListener("pointerdown", requestOnTap);
    };
  }, [isMobile, rive]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {!rive && <Placeholder />}
      <RiveComponent className="h-full w-full" />
    </div>
  );
}

export function RiveRobot({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  return (
    <div ref={ref} className={className}>
      {inView ? <RiveStage /> : <Placeholder />}
    </div>
  );
}
