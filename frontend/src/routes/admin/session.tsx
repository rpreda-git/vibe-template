import { createFileRoute, Link } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/session')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!session || !session.user || !session.session) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Session Information</h1>
          <p className="text-muted-foreground">
            View your current session details and user information
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>No Active Session</CardTitle>
            <CardDescription>
              You need to be logged in to view session information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please sign in to your account to access session details and user information.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { user, session: sessionData } = session

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString()
  }

  const formatRelativeTime = (date: Date | string | null | undefined) => {
    if (!date) return 'N/A'
    const now = new Date()
    const then = new Date(date)
    const diffMs = then.getTime() - now.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMs < 0) return 'Expired'
    if (diffMins < 60) return `in ${diffMins} minutes`
    if (diffHours < 24) return `in ${diffHours} hours`
    return `in ${diffDays} days`
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Session Information</h1>
        <p className="text-muted-foreground">
          View your current session details and user information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Name</div>
              <div className="text-base">{user.name}</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Email</div>
              <div className="text-base">{user.email}</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">User ID</div>
              <div className="text-base font-mono text-sm">{user.id}</div>
            </div>
            {user.role && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Role</div>
                  <div className="text-base">{user.role}</div>
                </div>
              </>
            )}
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Email Verified
              </div>
              <div className="text-base">
                {user.emailVerified ? (
                  <span className="text-green-600 dark:text-green-400">✓ Verified</span>
                ) : (
                  <span className="text-yellow-600 dark:text-yellow-400">
                    Not verified
                  </span>
                )}
              </div>
            </div>
            {user.createdAt && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Account Created
                  </div>
                  <div className="text-base">{formatDate(user.createdAt)}</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>Current session information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Session ID</div>
              <div className="text-base font-mono text-sm break-all">{sessionData.id}</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Expires At
              </div>
              <div className="text-base">
                {formatDate(sessionData.expiresAt)}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({formatRelativeTime(sessionData.expiresAt)})
                </span>
              </div>
            </div>
            {sessionData.createdAt && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Created At
                  </div>
                  <div className="text-base">{formatDate(sessionData.createdAt)}</div>
                </div>
              </>
            )}
            {sessionData.updatedAt && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </div>
                  <div className="text-base">{formatDate(sessionData.updatedAt)}</div>
                </div>
              </>
            )}
            {sessionData.ipAddress && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    IP Address
                  </div>
                  <div className="text-base font-mono text-sm">
                    {sessionData.ipAddress}
                  </div>
                </div>
              </>
            )}
            {sessionData.userAgent && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    User Agent
                  </div>
                  <div className="text-base text-sm break-all">
                    {sessionData.userAgent}
                  </div>
                </div>
              </>
            )}
            {sessionData.impersonatedBy && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Impersonated By
                  </div>
                  <div className="text-base font-mono text-sm">
                    {sessionData.impersonatedBy}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
