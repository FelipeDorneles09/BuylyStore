import React from "react";

const Button = ({
  type = "button",
  variant = "default",
  endIcon,
  children,
  ...props
}) => {
  // Classes de estilo básicas
  const baseClasses = "px-4 py-2 rounded focus:outline-none focus:ring";
  const variantClasses =
    variant === "contained"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {endIcon && <span>{endIcon}</span>}
      </span>
    </button>
  );
};

export default Button;
