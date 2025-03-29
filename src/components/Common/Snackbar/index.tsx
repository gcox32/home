"use client";

import React from "react";
import dynamic from 'next/dynamic';

interface SnackbarProps {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
}

const SnackbarContent = ({ message, type, visible }: SnackbarProps) => {
  const baseClasses = "fixed bottom-8 left-8 min-w-[250px] text-center rounded-2xl p-4 text-white transition-all duration-500 z-50";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };
  const visibilityClasses = visible ? "opacity-100" : "opacity-0 invisible";

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${visibilityClasses}`}>
      {message}
    </div>
  );
};

// Disable SSR for the Portal wrapper
const SnackbarPortal = dynamic(
  () => import('./SnackbarPortal'),
  { ssr: false }
);

export default function Snackbar(props: SnackbarProps) {
  return (
    <SnackbarPortal>
      <SnackbarContent {...props} />
    </SnackbarPortal>
  );
}
