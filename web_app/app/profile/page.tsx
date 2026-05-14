import LiquidGlassDemo from '@/demo/liquidglass-demo'

export default async function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <LiquidGlassDemo />
      <div className="mb-8 mt-20">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground mt-2">
          Authentication is temporarily disabled in this local setup. Replace env keys and re-enable Clerk to view your profile.
        </p>
      </div>
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Sign in is currently disabled. To enable, restore Clerk in middleware and layout, then revisit this page.
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Profile | Civic Issue Reporting',
  description: 'View and manage your account information',
}
