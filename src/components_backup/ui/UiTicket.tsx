"use client";
import React, { useEffect } from "react";

export function UiTicket() {
  useEffect(() => {
    import("ui-ticket-panel").catch(console.error);
  }, []);

  return React.createElement("review-panel", {
    "api-url": "http://localhost:3200/api",
  });
}
