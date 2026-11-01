import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-2xl border border-input bg-white px-4 py-3 text-[1.0625rem] transition-[border-color,box-shadow] duration-150 placeholder:text-ink-soft hover:border-ink focus-visible:border-blue disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error aria-invalid:border-2",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
