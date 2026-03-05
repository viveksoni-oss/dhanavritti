"use client";

import React from "react";

/**
 * A reusable button component with a premium glow effect.
 * Supports both button and anchor tag behavior.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content inside the button
 * @param {string} [props.href] - If provided, renders as an <a> tag
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.type] - Button type (default: "button")
 */
export default function GlowButton({ 
  children, 
  href, 
  className = "", 
  onClick, 
  type = "button",
  ...props 
}) {
  const baseClasses = `btn-glow inline-block text-center transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClasses} 
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={baseClasses} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
