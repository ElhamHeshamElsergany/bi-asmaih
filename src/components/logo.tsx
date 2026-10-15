import { useId } from "react";

export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const bg = `logo-bg-${id}`;
  const gold = `logo-gold-${id}`;
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#23806a" />
          <stop offset="1" stopColor="#0d3f32" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3dca6" />
          <stop offset="1" stopColor="#c8994f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${bg})`} />
      <g fill="none" stroke={`url(#${gold})`} strokeLinejoin="round" strokeLinecap="round">
        <path d="M17 50V29.5C17 21 24.5 15.5 32 11.5C39.5 15.5 47 21 47 29.5V50" strokeWidth="2.6" />
        <path d="M22.5 50V30.5C22.5 24.5 27.5 20.5 32 18C36.5 20.5 41.5 24.5 41.5 30.5V50" strokeWidth="1.3" strokeOpacity="0.6" />      </g>
      <g fill={`url(#${gold})`} stroke="#0f4536" strokeWidth="0.9" strokeLinejoin="round">
        <path d="M32 34.6C29.6 33 26.8 32.8 24.7 33.5V43C26.8 42.2 29.6 42.5 32 44.1Z" />
        <path d="M32 34.6C34.4 33 37.2 32.8 39.3 33.5V43C37.2 42.2 34.4 42.5 32 44.1Z" />
      </g>
    </svg>
  );
}
