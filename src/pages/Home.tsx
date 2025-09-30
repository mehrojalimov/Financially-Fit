import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, PiggyBank, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [customNeeds, setCustomNeeds] = useState<number>(50);
  const [customWants, setCustomWants] = useState<number>(30);
  const [customSavings, setCustomSavings] = useState<number>(20);
  const { toast } = useToast();

  const calculate503020 = () => {
    if (monthlyIncome <= 0) {
      toast({
        title: "Invalid Income",
        description: "Please enter a valid monthly income",
        variant: "destructive"
      });
      return { needs: 0, wants: 0, savings: 0 };
    }
    return {
      needs: Math.floor(monthlyIncome * 0.5),
      wants: Math.floor(monthlyIncome * 0.3),
      savings: Math.floor(monthlyIncome * 0.2),
    };
  };

  const calculateCustom = () => {
    if (monthlyIncome <= 0) {
      toast({
        title: "Invalid Income",
        description: "Please enter a valid monthly income",
        variant: "destructive"
      });
      return { needs: 0, wants: 0, savings: 0 };
    }
    
    const total = customNeeds + customWants + customSavings;
    if (total !== 100) {
      toast({
        title: "Invalid Percentages",
        description: "Percentages must add up to 100%",
        variant: "destructive"
      });
      return { needs: 0, wants: 0, savings: 0 };
    }
    
    return {
      needs: Math.floor(monthlyIncome * (customNeeds / 100)),
      wants: Math.floor(monthlyIncome * (customWants / 100)),
      savings: Math.floor(monthlyIncome * (customSavings / 100)),
    };
  };

  const standard = calculate503020();
  const custom = calculateCustom();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to FinanciallyFit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take control of your finances with smart budgeting tools and personalized insights
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Monthly Income
            </CardTitle>
            <CardDescription>Enter your monthly income to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 max-w-md">
              <div className="flex-1">
                <Label htmlFor="income">Amount ($)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="5000"
                  value={monthlyIncome || ""}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="standard">50/30/20 Rule</TabsTrigger>
            <TabsTrigger value="custom">Custom Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>The 50/30/20 Budgeting Rule</CardTitle>
                <CardDescription>
                  A simple and effective way to manage your money
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        Needs (50%)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        ${standard.needs.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Essentials like rent, groceries, utilities, insurance
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Wants (30%)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        ${standard.wants.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Entertainment, dining out, hobbies, subscriptions
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PiggyBank className="h-5 w-5 text-primary" />
                        Savings (20%)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        ${standard.savings.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Emergency fund, retirement, investments
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Custom Budget</CardTitle>
                <CardDescription>
                  Adjust percentages to fit your financial goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="custom-needs">Needs (%)</Label>
                    <Input
                      id="custom-needs"
                      type="number"
                      value={customNeeds}
                      onChange={(e) => setCustomNeeds(Number(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-wants">Wants (%)</Label>
                    <Input
                      id="custom-wants"
                      type="number"
                      value={customWants}
                      onChange={(e) => setCustomWants(Number(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-savings">Savings (%)</Label>
                    <Input
                      id="custom-savings"
                      type="number"
                      value={customSavings}
                      onChange={(e) => setCustomSavings(Number(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Needs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        ${custom.needs.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {customNeeds}% of income
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Wants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        ${custom.wants.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {customWants}% of income
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        ${custom.savings.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {customSavings}% of income
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
