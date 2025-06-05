"use client";

import { useEffect } from "react";

export default function Logout() {
  const logoutProcess = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    logoutProcess();
  }, []);

  return <div>Logging out...</div>;
}
