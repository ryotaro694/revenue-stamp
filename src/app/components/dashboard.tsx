import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
  { name: "Jun", value: 239 },
]

const recentActivities = [
  { id: 1, user: "Alice", action: "Created a new project", time: "2 hours ago" },
  { id: 2, user: "Bob", action: "Updated the dashboard", time: "4 hours ago" },
  { id: 3, user: "Charlie", action: "Completed a task", time: "1 day ago" },
]

export function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <a href="/revenue-stamp/new" className="flex items-center text-muted-foreground font-bold gap-2">
                収入印紙を登録する
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

