import { OverviewCards } from "./components/OverviewCards"
import { RecentActivity } from "./components/RecentActivity"
import { QuickActions } from "./components/QuickActions"
import { StatsChart } from "./components/StatsChart"

export default function DashboardPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-500">Last updated: Today at 12:30 PM</p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <StatsChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <RecentActivity />
    </div>
  )
}

