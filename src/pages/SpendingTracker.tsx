import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { expensesAPI } from "@/services/api";

interface SpendingEntry {
  id: string;
  statement: string;
  amount: number;
  category: "wants" | "needs" | "savings";
}

export default function SpendingTracker() {
  const [statement, setStatement] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<"wants" | "needs" | "savings">("wants");
  const [entries, setEntries] = useState<SpendingEntry[]>([]);
  const { toast } = useToast();
  const { user } = useUser();

  // Load expenses from database when component mounts or user changes
  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    if (!user) return;
    
    try {
      const data = await expensesAPI.getExpenses(user.id);
      console.log('Loaded expenses data:', data); // Debug log
      
      if (Array.isArray(data)) {
        const formattedEntries = data.map((expense: any) => ({
          id: expense.id.toString(),
          statement: expense.description,
          amount: expense.amount,
          category: expense.category
        }));
        setEntries(formattedEntries);
      }
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  };

  const totals = entries.reduce(
    (acc, entry) => {
      acc[entry.category] += entry.amount;
      acc.total += entry.amount;
      return acc;
    },
    { wants: 0, needs: 0, savings: 0, total: 0 }
  );

  const percentages = {
    wants: totals.total > 0 ? (totals.wants / totals.total) * 100 : 0,
    needs: totals.total > 0 ? (totals.needs / totals.total) * 100 : 0,
    savings: totals.total > 0 ? (totals.savings / totals.total) * 100 : 0,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!statement.trim() || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Entry",
        description: "Please provide a valid description and amount",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Not Logged In",
        description: "Please log in to add expenses",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Adding expense:', { userId: user.id, description: statement.trim(), amount: parseFloat(amount), category });
      
      const newEntry = await expensesAPI.addExpense(
        user.id,
        statement.trim(),
        parseFloat(amount),
        category,
        new Date().toISOString()
      );

      console.log('API response:', newEntry);

      // Add to local state
      const formattedEntry: SpendingEntry = {
        id: newEntry.expenseId.toString(),
        statement: statement.trim(),
        amount: parseFloat(amount),
        category
      };

      setEntries([...entries, formattedEntry]);
      setStatement("");
      setAmount("");
      setCategory("wants");

      toast({
        title: "Expense Added",
        description: "Your expense has been saved to the database"
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: `Failed to save expense: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast({
      title: "Entry Deleted",
      description: "The spending entry has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Spending Tracker
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your expenses and see how they align with your budget
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
              <CardDescription>Record a new spending entry</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="statement">Description</Label>
                  <Input
                    id="statement"
                    placeholder="e.g., Grocery shopping"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wants">Wants</SelectItem>
                      <SelectItem value="needs">Needs</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Add Entry
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spending Summary</CardTitle>
              <CardDescription>Your spending breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Wants</p>
                    <p className="text-sm text-muted-foreground">
                      {percentages.wants.toFixed(1)}% of total
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    ${totals.wants.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Needs</p>
                    <p className="text-sm text-muted-foreground">
                      {percentages.needs.toFixed(1)}% of total
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    ${totals.needs.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Savings</p>
                    <p className="text-sm text-muted-foreground">
                      {percentages.savings.toFixed(1)}% of total
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    ${totals.savings.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                  <p className="font-bold text-lg">Total Spending</p>
                  <p className="text-2xl font-bold text-primary">
                    ${totals.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Spending History</CardTitle>
            <CardDescription>All your recorded expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No entries yet. Add your first expense above!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.statement}</TableCell>
                      <TableCell className="font-medium">
                        ${entry.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                          {entry.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
