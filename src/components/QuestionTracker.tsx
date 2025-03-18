
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Filter, Search, ExternalLink } from "lucide-react";
import { Question, Platform, DifficultyLevel } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const mockQuestions: Question[] = [
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
    title: "Valid Parentheses",
    link: "https://leetcode.com/problems/valid-parentheses/",
    platform: "leetcode",
    difficulty: "easy",
    tags: ["string", "stack"],
    completed: false,
  },
  {
    id: "3",
    title: "Merge Two Sorted Lists",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    platform: "leetcode",
    difficulty: "easy",
    tags: ["linked-list", "recursion"],
    completed: true,
  },
  {
    id: "4",
    title: "Maximum Subarray",
    link: "https://leetcode.com/problems/maximum-subarray/",
    platform: "leetcode",
    difficulty: "medium",
    tags: ["array", "divide-and-conquer", "dynamic-programming"],
    completed: false,
  },
  {
    id: "5",
    title: "Coin Change",
    link: "https://leetcode.com/problems/coin-change/",
    platform: "leetcode",
    difficulty: "medium",
    tags: ["dynamic-programming"],
    completed: false,
  },
  {
    id: "6",
    title: "Word Break",
    link: "https://leetcode.com/problems/word-break/",
    platform: "leetcode",
    difficulty: "medium",
    tags: ["dynamic-programming", "trie", "memoization"],
    completed: true,
  },
  {
    id: "7",
    title: "Trapping Rain Water",
    link: "https://leetcode.com/problems/trapping-rain-water/",
    platform: "leetcode",
    difficulty: "hard",
    tags: ["array", "two-pointers", "dynamic-programming", "stack"],
    completed: false,
  },
  {
    id: "8",
    title: "Median of Two Sorted Arrays",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    platform: "leetcode",
    difficulty: "hard",
    tags: ["array", "binary-search", "divide-and-conquer"],
    completed: false,
  },
  {
    id: "9",
    title: "DFS of Graph",
    link: "https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
    platform: "gfg",
    difficulty: "easy",
    tags: ["graph", "dfs"],
    completed: true,
  },
  {
    id: "10",
    title: "Detect cycle in a directed graph",
    link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
    platform: "gfg",
    difficulty: "medium",
    tags: ["graph", "dfs"],
    completed: false,
  },
];

const QuestionTracker = () => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlatform, setFilterPlatform] = useState<Platform | "all">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | "all">("all");
  const [filterCompleted, setFilterCompleted] = useState<"all" | "completed" | "pending">("all");
  const { toast } = useToast();

  // Apply filters to questions
  const filteredQuestions = questions.filter(question => {
    // Search filter
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Platform filter
    const matchesPlatform = filterPlatform === "all" || question.platform === filterPlatform;
    
    // Difficulty filter
    const matchesDifficulty = filterDifficulty === "all" || question.difficulty === filterDifficulty;
    
    // Completion filter
    const matchesCompletion = 
      filterCompleted === "all" || 
      (filterCompleted === "completed" && question.completed) ||
      (filterCompleted === "pending" && !question.completed);
    
    return matchesSearch && matchesPlatform && matchesDifficulty && matchesCompletion;
  });

  const toggleQuestionStatus = (id: string) => {
    setQuestions(questions.map(question => 
      question.id === id
        ? { ...question, completed: !question.completed }
        : question
    ));
    
    const question = questions.find(q => q.id === id);
    
    if (question) {
      toast({
        title: question.completed ? "Question marked as pending" : "Question marked as completed",
        description: question.title,
      });
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterPlatform("all");
    setFilterDifficulty("all");
    setFilterCompleted("all");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Question Tracker</h1>
        <p className="text-muted-foreground">
          Track your progress across various DSA problems
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>DSA Problems</CardTitle>
          <CardDescription>
            Manage and track your problem-solving progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search & Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by problem name or tag..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select
                value={filterPlatform}
                onValueChange={(value) => setFilterPlatform(value as Platform | "all")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="leetcode">LeetCode</SelectItem>
                  <SelectItem value="gfg">GeeksForGeeks</SelectItem>
                  <SelectItem value="codeforces">Codeforces</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filterDifficulty}
                onValueChange={(value) => setFilterDifficulty(value as DifficultyLevel | "all")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filterCompleted}
                onValueChange={(value) => setFilterCompleted(value as "all" | "completed" | "pending")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={resetFilters} title="Reset filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Questions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">Status</TableHead>
                  <TableHead>Problem</TableHead>
                  <TableHead className="hidden md:table-cell">Tags</TableHead>
                  <TableHead className="w-28">Difficulty</TableHead>
                  <TableHead className="w-28">Platform</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={question.completed}
                        onCheckedChange={() => toggleQuestionStatus(question.id)}
                        className={question.completed ? "bg-green-500 text-white border-0" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{question.title}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {question.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {question.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{question.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          question.difficulty === "easy" ? "bg-green-500" :
                          question.difficulty === "medium" ? "bg-yellow-500" :
                          "bg-red-500"
                        }
                      >
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {question.platform}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-8 w-8 border rounded-md hover:bg-accent"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredQuestions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No questions found matching the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination or Load More (simplified for now) */}
          <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
            <div>
              Showing {filteredQuestions.length} of {questions.length} questions
            </div>
            <div className="flex items-center gap-1">
              <span>
                {questions.filter(q => q.completed).length} completed
              </span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionTracker;
