
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Plus, ArrowRight, Edit, Trash2, Copy, FileText } from "lucide-react";
import { CustomSheet as CustomSheetType } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const mockSheets: CustomSheetType[] = [
  {
    id: "1",
    title: "Arrays & String Algorithms",
    description: "Essential array and string manipulation problems for interviews",
    questions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    progress: 70,
  },
  {
    id: "2",
    title: "Graph Algorithms",
    description: "Common graph traversal and pathfinding problems",
    questions: ["11", "12", "13", "14", "15"],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    progress: 40,
  },
  {
    id: "3",
    title: "Dynamic Programming",
    description: "Classic DP problems for advanced interviews",
    questions: ["16", "17", "18", "19", "20", "21", "22"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    progress: 15,
  },
];

const CustomSheetCreator = ({ onCreateSheet }: { onCreateSheet: (sheet: Omit<CustomSheetType, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your sheet",
        variant: "destructive",
      });
      return;
    }
    
    onCreateSheet({
      title,
      description,
      questions: [],
    });
    
    // Reset form and close dialog
    setTitle('');
    setDescription('');
    setOpen(false);
    
    toast({
      title: "Sheet Created",
      description: "Your new DSA sheet has been created successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Create New Sheet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Custom DSA Sheet</DialogTitle>
            <DialogDescription>
              Create a personalized practice sheet for your DSA preparation
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Google Interview Prep"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Sheet description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Sheet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CustomSheetItem = ({ sheet }: { sheet: CustomSheetType }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Sheet Duplicated",
      description: `Created a copy of "${sheet.title}"`,
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Sheet Deleted",
      description: `"${sheet.title}" has been deleted`,
    });
  };

  return (
    <Card 
      className="hover-card cursor-pointer transition-all"
      onClick={() => navigate(`/sheets/${sheet.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{sheet.title}</CardTitle>
            <CardDescription className="mt-1">
              {sheet.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>{sheet.questions.length} questions</span>
          <span className="flex items-center gap-1">
            {sheet.progress}% complete
            {sheet.progress === 100 && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </span>
        </div>
        <Progress value={sheet.progress} className="h-2" />
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Updated {new Date(sheet.updatedAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDuplicate}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/90" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 flex gap-1">
            View <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const CustomSheet = () => {
  const [sheets, setSheets] = useState<CustomSheetType[]>(mockSheets);
  const { toast } = useToast();

  const handleCreateSheet = (newSheet: Omit<CustomSheetType, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => {
    const sheet: CustomSheetType = {
      ...newSheet,
      id: (sheets.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 0,
    };
    
    setSheets([sheet, ...sheets]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Custom DSA Sheets</h1>
          <p className="text-muted-foreground">
            Create and manage your personalized DSA practice sheets
          </p>
        </div>
        <CustomSheetCreator onCreateSheet={handleCreateSheet} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sheets.map((sheet) => (
          <CustomSheetItem key={sheet.id} sheet={sheet} />
        ))}
      </div>
      
      {sheets.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No custom sheets yet</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            Create your first custom DSA sheet to organize your practice
          </p>
          <CustomSheetCreator onCreateSheet={handleCreateSheet} />
        </div>
      )}
    </div>
  );
};

export default CustomSheet;
