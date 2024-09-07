import React from "react";
import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "primary",
  size = "medium",
  loading = false,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = () => {
    if (onClick && !isLoading && !disabled) {
      setIsLoading(true);
      onClick();
    }
  };

  const buttonClasses = `
    ${
      type === "primary"
        ? "bg-blue-500 hover:bg-blue-700 text-white"
        : type === "secondary"
        ? "bg-gray-500 hover:bg-gray-700 text-white"
        : type === "tertiary"
        ? "bg-green-500 hover:bg-green-700 text-white"
        : type === "ghost"
        ? "bg-transparent hover:bg-gray-200 text-gray-800"
        : ""
    }
    ${size === "small" ? "px-4 py-2 text-sm" : ""}
    ${size === "medium" ? "px-6 py-3 text-base" : ""}
    ${size === "large" ? "px-8 py-4 text-lg" : ""}
    rounded-md font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out
    ${isLoading ? "opacity-50 cursor-wait" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <button className={buttonClasses} onClick={handleClick} disabled={disabled}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;