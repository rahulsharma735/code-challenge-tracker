
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl pt-24 pb-12 px-4 sm:px-6">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
