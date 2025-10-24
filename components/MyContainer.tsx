import { cn } from "@/lib/utils";

interface MyContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function MyContainer({
  children,
  className,
}: MyContainerProps) {
  return (
    <div
      className={cn(
        "max-w-screen-xl mx-auto px-4",
        className
      )}
    >
      {children}
    </div>
  )
}
