
import CustomSheet from "@/components/CustomSheet";
import Header from "@/components/Header";

const SheetsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl pt-24 pb-12 px-4 sm:px-6">
        <CustomSheet />
      </main>
    </div>
  );
};

export default SheetsPage;
