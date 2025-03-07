import { Toaster as ToastProvider } from "sonner"

export function Toaster() {
  return (
    <ToastProvider 
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  )
} 