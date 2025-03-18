
import ContestCalendar from "@/components/ContestCalendar";
import Header from "@/components/Header";

const ContestsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl pt-24 pb-12 px-4 sm:px-6">
        <ContestCalendar />
      </main>
    </div>
  );
};

export default ContestsPage;
