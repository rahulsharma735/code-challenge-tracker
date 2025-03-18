
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Code, BarChart2, CalendarDays, FileText, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
        <div className="animate-fade-in space-y-6 max-w-3xl">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <span>Ultimate DSA Tracker</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Master Your DSA Journey With <span className="text-primary">Precision</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your progress, create custom problem sets, and stay updated with coding contests - all in one beautiful dashboard.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/questions')}
            >
              Explore Problems
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-secondary/50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-lg p-6 hover-card animate-scale-in">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Visualize your DSA journey with elegant charts and detailed statistics.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 hover-card animate-scale-in [animation-delay:100ms]">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Problem Tracking</h3>
              <p className="text-muted-foreground">
                Keep track of problems you've solved across multiple platforms like LeetCode and GeeksForGeeks.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 hover-card animate-scale-in [animation-delay:200ms]">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Custom Sheets</h3>
              <p className="text-muted-foreground">
                Create personalized problem sets for targeted practice and revision.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 hover-card animate-scale-in [animation-delay:300ms]">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Contest Calendar</h3>
              <p className="text-muted-foreground">
                Never miss a coding contest with our comprehensive calendar for all major platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Level Up Your DSA Skills?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of developers who are mastering algorithms and data structures with our powerful tracking tools.
          </p>
          <Button 
            size="lg" 
            className="mt-4"
            onClick={() => navigate('/dashboard')}
          >
            Start Tracking Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
