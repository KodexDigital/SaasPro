import KpiCards from "@/components/charts/KpiCards";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import ActivityFeed from "@/components/charts/ActivityFeed";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <KpiCards />
      <AnalyticsChart />
      <ActivityFeed />
    </div>
  );
}