import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col gap-4 w-1/4 mx-auto mt-40">
        <Button asChild>
            <Link to="/admin">Admin</Link>
        </Button>
        <Button asChild>
            <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
            <Link to="/sign-up">Sign Up</Link>
        </Button>
    </div>
  )
}
