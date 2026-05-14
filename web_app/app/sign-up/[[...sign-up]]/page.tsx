import Image from "next/image"
import Link from "next/link"
import { SignUp } from "@clerk/nextjs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUpPage() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // Show configuration message if Clerk keys are not properly set up
  if (!publishableKey || publishableKey.includes('placeholder') || publishableKey.includes('your_actual_key')) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-white flex size-10 items-center justify-center rounded-md overflow-hidden">
                <Image
                  src="/menulogo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold">जनसेतु.</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-yellow-800 mb-2">⚠️ Authentication Setup Required</h2>
                <p className="text-yellow-700 mb-4">
                  Clerk authentication is not configured. To enable sign-up functionality:
                </p>
                <ol className="text-yellow-700 text-sm space-y-2 mb-4">
                  <li>1. Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in your project root</li>
                  <li>2. Add your Clerk keys from <a href="https://dashboard.clerk.com/last-active?path=api-keys" target="_blank" rel="noopener noreferrer" className="underline">Clerk Dashboard</a></li>
                  <li>3. Restart your development server</li>
                </ol>
                <div className="bg-yellow-100 p-3 rounded text-xs">
                  <strong>Required environment variables:</strong><br/>
                  <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...</code><br/>
                  <code>CLERK_SECRET_KEY=sk_test_...</code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <div className="absolute inset-0 w-full h-full">
            <video
              src="https://d1xarpci4ikg0w.cloudfront.net/fe197920-9149-4ad4-ad32-72725de071f4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-white flex size-10 items-center justify-center rounded-md overflow-hidden">
                <Image
                  src="/menulogo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold">जनसेतु.</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/" />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <div className="absolute inset-0 w-full h-full">
            <video
              src="https://d1xarpci4ikg0w.cloudfront.net/fe197920-9149-4ad4-ad32-72725de071f4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </>
  )
}
