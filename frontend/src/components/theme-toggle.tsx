import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "light") {
      return <Sun />
    } else if (theme === "dark") {
      return <Moon />
    } else {
      return <Monitor />
    }
  }

  const getLabel = () => {
    if (theme === "light") {
      return "Light"
    } else if (theme === "dark") {
      return "Dark"
    } else {
      return "System"
    }
  }

  return (
    <SidebarMenuButton
      onClick={cycleTheme}
      tooltip={`Theme: ${getLabel()}`}
      aria-label={`Switch theme, currently ${theme}`}
    >
      {getIcon()}
      <span>{getLabel()}</span>
    </SidebarMenuButton>
  )
}
