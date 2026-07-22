"use client";

import React, { useEffect } from "react";

export function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable Right-Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable Keyboard Shortcuts (Copy, Inspect, View Source, Save)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      
      // Prevent Ctrl+C (Copy), Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print)
      if (e.ctrlKey && ["c", "u", "s", "p"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      // Prevent Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Select)
      if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    // Disable Dragging on the document
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <div className="select-none h-full w-full">
      {children}
    </div>
  );
}
