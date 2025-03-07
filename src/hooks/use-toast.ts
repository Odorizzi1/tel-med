import { useState } from "react"

interface ToastProps {
  title?: string
  description?: string
  duration?: number
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])
    if (props.duration) {
      setTimeout(() => {
        setToasts((prev) => prev.slice(1))
      }, props.duration)
    }
  }

  return { toast, toasts }
} 