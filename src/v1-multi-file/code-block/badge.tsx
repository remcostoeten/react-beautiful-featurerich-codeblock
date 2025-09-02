import { cn } from "./cn";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "custom"
  | "outline";

type TProps =    {
  variant?: BadgeVariant;
  customColor?: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  customColor,
  children,
  className,
}: TProps) {
  const baseClasses =
    "px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-200";

  const variantClasses = {
    default:
      "border border-[#333333] bg-[#111111] text-zinc-400 hover:border-[#444444] hover:text-zinc-300",
    primary:
      "border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-400 hover:text-blue-300",
    secondary:
      "border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-400 hover:text-purple-300",
    success:
      "border border-green-500/30 bg-green-500/10 text-green-400 hover:border-green-400 hover:text-green-300",
    warning:
      "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300",
    danger:
      "border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-400 hover:text-red-300",
    outline:
      "border border-gray-500/30 bg-gray-500/10 text-gray-400 hover:border-gray-400 hover:text-gray-300",
    custom: customColor
      ? `border border-${customColor}-500/30 bg-${customColor}-500/10 text-${customColor}-400 hover:border-${customColor}-400 hover:text-${customColor}-300`
      : "",
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>{children}</span>
  );
}
