import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/config/site"

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-md bg-card p-8 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand">
            <span className="text-xl font-bold text-brand-foreground">S</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to {siteConfig.name}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="jane@company.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <button className="text-xs text-brand hover:underline">
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">
            Sign in
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button className="text-brand hover:underline font-medium">
            Contact your admin
          </button>
        </p>
      </div>
    </div>
  )
}
