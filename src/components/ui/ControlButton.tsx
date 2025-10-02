import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  round?: boolean;
};

export default function ControlButton({ round, className = "", children, ...rest }: Props) {
  const base = round ? "rounded-full" : "rounded-xl";
  return (
    <button
      type="button"
      {...rest}
      className={`${base} bg-gray-600 text-white flex items-center justify-center select-none active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
