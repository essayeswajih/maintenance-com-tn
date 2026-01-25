import { SignUp } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-0",
            },
          }}
        />
      </Card>
    </div>
  )
}
