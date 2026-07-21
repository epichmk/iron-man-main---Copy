"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export function ScrambleText({ text, active, speed = 30 }: { text: string; active: boolean; speed?: number }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => setDisplayText(text), 0);
      return () => clearTimeout(timer);
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            // Ignore spaces to keep word structure
            if (letter === " ") return " ";
            
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Decoding speed
    }, speed);

    return () => clearInterval(interval);
  }, [text, active, speed]);

  return <span className="font-mono">{displayText}</span>;
}
