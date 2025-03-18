
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Bell, BellOff, ExternalLink, Calendar as CalendarIcon } from "lucide-react";
import { Contest, Platform } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const today = new Date();
const mockContests: Contest[] = [
  {
    id: "1",
    title: "Weekly Contest 349",
    platform: "leetcode",
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 30),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 30),
    link: "https://leetcode.com/contest/",
    registered: true,
  },
  {
    id: "2",
    title: "Biweekly Contest 124",
    platform: "leetcode",
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 9, 0),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 11, 0),
    link: "https://leetcode.com/contest/",
    registered: false,
  },
  {
    id: "3",
    title: "CodeCraft-23 (Div. 1 + Div. 2)",
    platform: "codeforces",
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 19, 30),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 22, 30),
    link: "https://codeforces.com/contests",
    registered: false,
  },
  {
    id: "4",
    title: "Codeforces Round #889 (Div. 2)",
    platform: "codeforces",
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 19, 30),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 21, 30),
    link: "https://codeforces.com/contests",
    registered: true,
  },
  {
    id: "5",
    title: "GFG Weekly Coding Contest",
    platform: "gfg",
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 20, 0),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 22, 0),
    link: "https://practice.geeksforgeeks.org/contest/interview-series",
    registered: false,
  },
  {
    id: "6",
    title: "CodeChef Starters 80",
    platform: "custom",
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 21, 0),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 24, 0),
    link: "https://www.codechef.com/contests",
    registered: true,
  },
];

// Group contests by week (this week, next week, upcoming)
const groupContestsByTimeframe = (contests: Contest[]) => {
  const now = new Date();
  const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  
  const thisWeekEnd = new Date(now.getTime() + weekInMilliseconds);
  const nextWeekEnd = new Date(thisWeekEnd.getTime() + weekInMilliseconds);
  
  return {
    thisWeek: contests.filter(contest => contest.startTime >= now && contest.startTime < thisWeekEnd),
    nextWeek: contests.filter(contest => contest.startTime >= thisWeekEnd && contest.startTime < nextWeekEnd),
    upcoming: contests.filter(contest => contest.startTime >= nextWeekEnd),
  };
};

const ContestCalendar = () => {
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [activeTab, setActiveTab] = useState<"all" | "registered">("all");
  const { toast } = useToast();
  
  // Filter contests based on active tab
  const filteredContests = activeTab === "all" 
    ? contests 
    : contests.filter(contest => contest.registered);
  
  // Group contests by timeframe
  const groupedContests = groupContestsByTimeframe(filteredContests);
  
  const toggleRegistration = (id: string) => {
    setContests(contests.map(contest => 
      contest.id === id
        ? { ...contest, registered: !contest.registered }
        : contest
    ));
    
    const contest = contests.find(c => c.id === id);
    
    if (contest) {
      toast({
        title: contest.registered 
          ? "Unregistered from contest" 
          : "Registered for contest",
        description: contest.title,
      });
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const getPlatformColor = (platform: Platform): string => {
    switch (platform) {
      case "leetcode":
        return "bg-yellow-500";
      case "codeforces":
        return "bg-blue-500";
      case "gfg":
        return "bg-green-500";
      case "custom":
      default:
        return "bg-purple-500";
    }
  };
  
  const ContestCard = ({ contest }: { contest: Contest }) => (
    <Card className="hover-card overflow-hidden">
      <div className={`h-1 ${getPlatformColor(contest.platform)}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{contest.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <CalendarIcon className="h-3 w-3" />
              {formatDate(contest.startTime)}
            </CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {contest.platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Starts:</span>
              <span className="font-medium text-foreground">{formatTime(contest.startTime)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Ends:</span>
              <span className="font-medium text-foreground">{formatTime(contest.endTime)}</span>
            </div>
            <div className="text-muted-foreground">
              Duration: {Math.round((contest.endTime.getTime() - contest.startTime.getTime()) / (1000 * 60))} minutes
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={contest.registered ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={() => toggleRegistration(contest.id)}
            >
              {contest.registered ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Registered</span>
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4" />
                  <span>Register</span>
                </>
              )}
            </Button>
            
            <a
              href={contest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 px-3 border rounded-md hover:bg-accent"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const ContestSection = ({ title, contests }: { title: string; contests: Contest[] }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {contests.length > 0 ? (
        <div className="space-y-4">
          {contests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          No contests scheduled for this period.
        </Card>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Contest Calendar</h1>
        <p className="text-muted-foreground">
          Stay updated with upcoming coding competitions
        </p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "registered")}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Calendar className="h-4 w-4" />
              All Contests
            </TabsTrigger>
            <TabsTrigger value="registered" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Registered
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="space-y-8 mt-0">
          <ContestSection title="This Week" contests={groupedContests.thisWeek} />
          <ContestSection title="Next Week" contests={groupedContests.nextWeek} />
          <ContestSection title="Upcoming" contests={groupedContests.upcoming} />
        </TabsContent>
        
        <TabsContent value="registered" className="space-y-8 mt-0">
          <ContestSection title="This Week" contests={groupedContests.thisWeek.filter(c => c.registered)} />
          <ContestSection title="Next Week" contests={groupedContests.nextWeek.filter(c => c.registered)} />
          <ContestSection title="Upcoming" contests={groupedContests.upcoming.filter(c => c.registered)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContestCalendar;
