
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserProgress, Question, Contest } from "@/utils/types";
import { Calendar, CheckCircle, Award, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockUserProgress: UserProgress = {
  totalSolved: 158,
  easy: 72,
  medium: 63,
  hard: 23,
  byPlatform: {
    leetcode: 89,
    gfg: 42,
    codeforces: 19,
    custom: 8,
  },
  streakDays: 12,
  lastActive: new Date(),
};

const mockRecentQuestions: Question[] = [
  {
    id: "1",
    title: "Two Sum",
    link: "https://leetcode.com/problems/two-sum/",
    platform: "leetcode",
    difficulty: "easy",
    tags: ["array", "hash-table"],
    completed: true,
  },
  {
    id: "2",
    title: "Longest Substring Without Repeating Characters",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    platform: "leetcode",
    difficulty: "medium",
    tags: ["hash-table", "string", "sliding-window"],
    completed: false,
  },
  {
    id: "3",
    title: "Find Median from Data Stream",
    link: "https://leetcode.com/problems/find-median-from-data-stream/",
    platform: "leetcode",
    difficulty: "hard",
    tags: ["heap", "design"],
    completed: false,
  },
];

const mockUpcomingContests: Contest[] = [
  {
    id: "1",
    title: "Weekly Contest 349",
    platform: "leetcode",
    startTime: new Date(Date.now() + 86400000), // tomorrow
    endTime: new Date(Date.now() + 86400000 + 7200000), // tomorrow + 2 hours
    link: "https://leetcode.com/contest/",
    registered: true,
  },
  {
    id: "2",
    title: "CodeCraft-23 (Div. 1 + Div. 2)",
    platform: "codeforces",
    startTime: new Date(Date.now() + 172800000), // day after tomorrow
    endTime: new Date(Date.now() + 172800000 + 7200000), // day after tomorrow + 2 hours
    link: "https://codeforces.com/contests",
    registered: false,
  },
];

// Progress ring component
const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  label
}: { 
  progress: number; 
  size?: number; 
  strokeWidth?: number;
  label: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-secondary"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary progress-ring-circle"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">{progress}%</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate percentages for visualization
  const totalQuestions = 300; // Mock total number of questions available
  const percentComplete = Math.round((mockUserProgress.totalSolved / totalQuestions) * 100);
  
  // Difficult level breakdown
  const easyPercent = Math.round((mockUserProgress.easy / mockUserProgress.totalSolved) * 100);
  const mediumPercent = Math.round((mockUserProgress.medium / mockUserProgress.totalSolved) * 100);
  const hardPercent = Math.round((mockUserProgress.hard / mockUserProgress.totalSolved) * 100);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <Card className="hover-card flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">Overall Progress</CardTitle>
            <CardDescription>
              You've solved {mockUserProgress.totalSolved} problems
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <ProgressRing progress={percentComplete} label="Complete" />
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/questions')}
            >
              View All Questions
            </Button>
          </CardFooter>
        </Card>
        
        {/* Difficulty Breakdown */}
        <Card className="hover-card flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">Difficulty Breakdown</CardTitle>
            <CardDescription>
              Your progress across difficulty levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-500 font-medium">Easy</span>
                <span>{mockUserProgress.easy} solved</span>
              </div>
              <Progress value={easyPercent} className="h-2 bg-secondary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-yellow-500 font-medium">Medium</span>
                <span>{mockUserProgress.medium} solved</span>
              </div>
              <Progress value={mediumPercent} className="h-2 bg-secondary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-red-500 font-medium">Hard</span>
                <span>{mockUserProgress.hard} solved</span>
              </div>
              <Progress value={hardPercent} className="h-2 bg-secondary" />
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex items-center w-full justify-between text-sm text-muted-foreground">
              <span>Current streak:</span>
              <span className="flex items-center gap-1 font-medium text-foreground">
                {mockUserProgress.streakDays} days
                <Award className="h-4 w-4 text-yellow-500" />
              </span>
            </div>
          </CardFooter>
        </Card>
        
        {/* Platform Distribution */}
        <Card className="hover-card flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">Platform Distribution</CardTitle>
            <CardDescription>
              Your progress across different platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">LeetCode</span>
                <span>{mockUserProgress.byPlatform.leetcode} solved</span>
              </div>
              <Progress value={(mockUserProgress.byPlatform.leetcode / mockUserProgress.totalSolved) * 100} className="h-2 bg-secondary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">GeeksForGeeks</span>
                <span>{mockUserProgress.byPlatform.gfg} solved</span>
              </div>
              <Progress value={(mockUserProgress.byPlatform.gfg / mockUserProgress.totalSolved) * 100} className="h-2 bg-secondary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Codeforces</span>
                <span>{mockUserProgress.byPlatform.codeforces} solved</span>
              </div>
              <Progress value={(mockUserProgress.byPlatform.codeforces / mockUserProgress.totalSolved) * 100} className="h-2 bg-secondary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Custom</span>
                <span>{mockUserProgress.byPlatform.custom} solved</span>
              </div>
              <Progress value={(mockUserProgress.byPlatform.custom / mockUserProgress.totalSolved) * 100} className="h-2 bg-secondary" />
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/sheets')}
            >
              Manage Custom Sheets
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Recent Activity & Upcoming Contests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Questions */}
        <Card className="hover-card">
          <CardHeader>
            <CardTitle className="text-xl">Recent Questions</CardTitle>
            <CardDescription>
              Your recently attempted problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockRecentQuestions.map((question) => (
                <li key={question.id} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50">
                  <div className="mt-0.5">
                    {question.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <a 
                      href={question.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {question.title}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className={`px-2 py-0.5 rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                      <span className="capitalize">{question.platform}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/questions')}
            >
              View All Questions
            </Button>
          </CardFooter>
        </Card>
        
        {/* Upcoming Contests */}
        <Card className="hover-card">
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Contests</CardTitle>
            <CardDescription>
              Stay updated with upcoming coding competitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockUpcomingContests.map((contest) => (
                <li key={contest.id} className="space-y-2 p-3 rounded-md bg-secondary/50">
                  <div className="flex items-start justify-between">
                    <a 
                      href={contest.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {contest.title}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <span className="capitalize text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {contest.platform}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {contest.startTime.toLocaleDateString()} at {contest.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Duration: {Math.round((contest.endTime.getTime() - contest.startTime.getTime()) / (1000 * 60))} minutes
                    </span>
                    {contest.registered ? (
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Registered
                      </span>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Register
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/contests')}
            >
              View All Contests
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
