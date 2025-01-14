import React, { ReactNode } from "react";

// Tipando as props do componente Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"; // Tipando o tipo do botão
  variant?: "default" | "contained"; // Tipando o variant
  endIcon?: ReactNode; // endIcon pode ser qualquer coisa renderizável
  children: ReactNode; // children é um ReactNode
}

const Button = ({
  type = "button",
  variant = "default",
  endIcon,
  children,
  ...props
}: ButtonProps) => {
  // Classes de estilo básicas
  const baseClasses = "px-4 py-2 rounded focus:outline-none focus:ring-0"; // Remover o anel de foco
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
      <span className="flex items-center">{children}</span>
    </button>
  );
};

export default Button;
