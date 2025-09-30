import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

export default function UserGuide() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <BookOpen className="h-10 w-10 text-primary" />
            User Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to make the most of FinanciallyFit
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to begin your financial journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step-1">
                <AccordionTrigger>Step 1: Enter Your Monthly Income</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    Start by entering your monthly income on the Home page. This is the foundation
                    for all your budget calculations.
                  </p>
                  <p>
                    Include all sources of regular income: salary, freelance work, side hustles, etc.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-2">
                <AccordionTrigger>Step 2: Choose Your Budget Plan</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    <strong>50/30/20 Rule:</strong> A tried-and-true method where 50% goes to needs,
                    30% to wants, and 20% to savings.
                  </p>
                  <p>
                    <strong>Custom Plan:</strong> Create your own percentages based on your specific
                    financial situation and goals.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-3">
                <AccordionTrigger>Step 3: Track Your Spending</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    Use the Spending Tracker to record all your expenses. Categorize each expense
                    as Needs, Wants, or Savings to see how you're doing against your budget.
                  </p>
                  <p>
                    Regular tracking helps you stay accountable and identify areas where you might
                    be overspending.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-4">
                <AccordionTrigger>Step 4: Plan for Loans</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>
                    If you're considering a loan, use our Loan Calculator to understand what your
                    monthly and yearly payments would be.
                  </p>
                  <p>
                    This helps you make informed decisions and ensure loan payments fit within
                    your budget.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Understanding the 50/30/20 Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Needs (50%)</p>
                <p>Essential expenses like rent, utilities, groceries, insurance, and minimum debt payments.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Wants (30%)</p>
                <p>Discretionary spending like dining out, entertainment, hobbies, and subscriptions.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Savings (20%)</p>
                <p>Emergency fund, retirement contributions, investments, and extra debt payments.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Review your spending weekly to stay on track</p>
              <p>✓ Adjust your budget as your financial situation changes</p>
              <p>✓ Start small - even tracking 80% of expenses is progress</p>
              <p>✓ Be honest with yourself about needs vs wants</p>
              <p>✓ Celebrate small wins to stay motivated</p>
              <p>✓ Use the custom plan if 50/30/20 doesn't fit your life</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
