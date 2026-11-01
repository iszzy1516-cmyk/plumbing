import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full min-w-0 rounded-2xl border border-input bg-white px-4 text-[1.0625rem] transition-[border-color,box-shadow] duration-150 placeholder:text-ink-soft hover:border-ink focus-visible:border-blue disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-error aria-invalid:border-2",
        className
      )}
      {...props}
    />
  )
}

export { Input }
