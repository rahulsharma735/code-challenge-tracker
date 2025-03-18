
import QuestionTracker from "@/components/QuestionTracker";
import Header from "@/components/Header";

const QuestionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl pt-24 pb-12 px-4 sm:px-6">
        <QuestionTracker />
      </main>
    </div>
  );
};

export default QuestionsPage;
