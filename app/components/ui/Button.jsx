import { forwardRef } from "react";

const variants = {
  primary:
    "bg-green-800 text-white hover:bg-green-700 shadow-lg shadow-green-900/20 hover:shadow-green-800/30",
  outline:
    "border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white",
  ghost:
    "text-green-700 hover:text-green-900 underline-offset-4 hover:underline",
};

const sizes = {
  sm: "text-sm px-5 py-2.5",
  md: "text-base px-7 py-3",
  lg: "text-base px-9 py-3.5",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    href,
    className = "",
    onClick,
    icon,
    iconPosition = "right",
    ...props
  },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 cursor-pointer select-none";

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} onClick={onClick} {...props}>
        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} onClick={onClick} {...props}>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
});

export default Button;
