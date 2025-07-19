// "use client";
// import { cn } from "@/lib/utils";
// import React, { useEffect, useRef, useState } from "react";
// import { createNoise3D } from "simplex-noise";

// export const WavyBackground = ({
//   children,
//   className,
//   containerClassName,
//   colors,
//   waveWidth,
//   backgroundFill,
//   blur = 10,
//   speed = "fast",
//   waveOpacity = 0.5,
//   ...props
// }: {
//   children?: any;
//   className?: string;
//   containerClassName?: string;
//   colors?: string[];
//   waveWidth?: number;
//   backgroundFill?: string;
//   blur?: number;
//   speed?: "slow" | "fast";
//   waveOpacity?: number;
//   [key: string]: any;
// }) => {
//   const noise = createNoise3D();
//   let w: number,
//     h: number,
//     nt: number,
//     i: number,
//     x: number,
//     ctx: any,
//     canvas: any;
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const getSpeed = () => {
//     switch (speed) {
//       case "slow":
//         return 0.001;
//       case "fast":
//         return 0.002;
//       default:
//         return 0.001;
//     }
//   };

//   const init = () => {
//     canvas = canvasRef.current;
//     ctx = canvas.getContext("2d");
//     w = ctx.canvas.width = window.innerWidth;
//     h = ctx.canvas.height = window.innerHeight;
//     ctx.filter = `blur(${blur}px)`;
//     nt = 0;
//     window.onresize = function () {
//       w = ctx.canvas.width = window.innerWidth;
//       h = ctx.canvas.height = window.innerHeight;
//       ctx.filter = `blur(${blur}px)`;
//     };
//     render();
//   };

//   const waveColors = colors ?? [
//     "rgba(251,191,36,0.15)",  // amber-400
//   "rgba(249,115,22,0.15)",  // orange-500
//   "rgba(244,63,94,0.15)",   // rose-500
//   "rgba(236,72,153,0.15)",  // pink-500
//   "rgba(217,70,239,0.15)",  
//   ];
//   const drawWave = (n: number) => {
//     nt += getSpeed();
//     for (i = 0; i < n; i++) {
//       ctx.beginPath();
//       ctx.lineWidth = waveWidth || 50;
//       ctx.strokeStyle = waveColors[i % waveColors.length];
//       for (x = 0; x < w; x += 5) {
//         var y = noise(x / 800, 0.3 * i, nt) * 100;
//         ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
//       }
//       ctx.stroke();
//       ctx.closePath();
//     }
//   };

//   let animationId: number;
//   const render = () => {
//     ctx.fillStyle = backgroundFill || "black";
//     ctx.globalAlpha = waveOpacity || 0.5;
//     ctx.fillRect(0, 0, w, h);
//     drawWave(5);
//     animationId = requestAnimationFrame(render);
//   };

//   useEffect(() => {
//     init();
//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   const [isSafari, setIsSafari] = useState(false);
//   useEffect(() => {
//     // I'm sorry but i have got to support it on safari.
//     setIsSafari(
//       typeof window !== "undefined" &&
//         navigator.userAgent.includes("Safari") &&
//         !navigator.userAgent.includes("Chrome")
//     );
//   }, []);

//   return (
//     <div
//       className={cn(
//         "h-screen flex flex-col items-center justify-center",
//         containerClassName
//       )}
//     >
//       <canvas
//         className="absolute inset-0 z-0 "
//         ref={canvasRef}
//         id="canvas"
//         style={{
//           ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
//         }}
//       ></canvas>
//       <div className={cn("relative z-10", className)} {...props}>
//         {children}
//       </div>
//     </div>
//   );
// };

"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

type WavyBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
};

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number>(0);
  const [isSafari, setIsSafari] = useState(false);
  const noise = createNoise3D();

  const waveColors = colors ?? [
    "rgba(251,191,36,0.15)", // amber-400
    "rgba(249,115,22,0.15)", // orange-500
    "rgba(244,63,94,0.15)", // rose-500
    "rgba(236,72,153,0.15)", // pink-500
    "rgba(217,70,239,0.15)", // purple
  ];

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (ctx.canvas.width = window.innerWidth);
    let height = (ctx.canvas.height = window.innerHeight);
    let nt = 0;

    ctx.filter = `blur(${blur}px)`;

    const resizeCanvas = () => {
      width = ctx.canvas.width = window.innerWidth;
      height = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener("resize", resizeCanvas);

    const drawWave = (count: number) => {
      nt += getSpeed();
      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < width; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + height * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, width, height);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [blur, waveColors, waveOpacity, waveWidth, backgroundFill, speed]);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-full flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        id="canvas"
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      />
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};