import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="bg-red-100">
      <AlertCircle className="h-4 w-4 text-red-700" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your email or password is incorrect. 
        <br/>Please try again.
      </AlertDescription>
    </Alert>
  )
}
