"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

interface ClerkProviderClientProps {
  children: ReactNode;
}

export default function ClerkProviderClient({ children }: ClerkProviderClientProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // Check if Clerk keys are properly configured
  if (!publishableKey || publishableKey.includes('placeholder') || publishableKey.includes('your_actual_key')) {
    console.warn('⚠️ Clerk publishable key not configured properly. Please create a .env.local file with your actual Clerk keys.');
    console.warn('📝 See README.md for setup instructions or visit: https://dashboard.clerk.com/last-active?path=api-keys');
    
    // Return children without ClerkProvider to prevent crashes
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}



