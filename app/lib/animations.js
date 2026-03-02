"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in and slide up animation for a single element
 */
export function fadeInUp(element, trigger, options = {}) {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger || element,
      start: options.start || "top 85%",
      toggleActions: "play none none none",
    },
  });
}

/**
 * Staggered fade-in for a collection of elements
 */
export function staggerFadeIn(elements, trigger, options = {}) {
  return gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger,
      start: options.start || "top 80%",
      toggleActions: "play none none none",
    },
  });
}

/**
 * Scale-in animation (for cards, badges)
 */
export function scaleIn(element, trigger, options = {}) {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: options.duration || 0.8,
    delay: options.delay || 0,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: trigger || element,
      start: options.start || "top 85%",
      toggleActions: "play none none none",
    },
  });
}

/**
 * Draw-in animation for SVG paths
 */
export function drawLine(element, trigger, options = {}) {
  const length = element.getTotalLength?.() || 300;
  gsap.set(element, { strokeDasharray: length, strokeDashoffset: length });
  return gsap.to(element, {
    strokeDashoffset: 0,
    duration: options.duration || 1.5,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: trigger || element,
      start: options.start || "top 80%",
      toggleActions: "play none none none",
    },
  });
}

/**
 * Counter animation for numbers
 */
export function animateCounter(element, target, trigger, options = {}) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: options.duration || 2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      element.textContent = Math.round(obj.val) + (options.suffix || "");
    },
  });
}

/**
 * Horizontal slide-in
 */
export function slideIn(element, trigger, direction = "left", options = {}) {
  const x = direction === "left" ? -80 : 80;
  return gsap.from(element, {
    x,
    opacity: 0,
    duration: options.duration || 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger || element,
      start: options.start || "top 85%",
      toggleActions: "play none none none",
    },
  });
}
