import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { loansAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [yearlyPayment, setYearlyPayment] = useState<number | null>(null);
  const [savedLoans, setSavedLoans] = useState<any[]>([]);
  const { user } = useUser();
  const { toast } = useToast();

  // Load saved loans from database when component mounts or user changes
  useEffect(() => {
    if (user) {
      loadLoans();
    }
  }, [user]);

  const loadLoans = async () => {
    if (!user) return;
    
    try {
      const data = await loansAPI.getLoans(user.id);
      console.log('Loaded loans data:', data); // Debug log
      
      if (Array.isArray(data)) {
        setSavedLoans(data);
      }
    } catch (error) {
      console.error('Failed to load loans:', error);
    }
  };

  const calculateLoan = async () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanPeriod);

    if (isNaN(principal) || isNaN(rate) || isNaN(months) || principal <= 0 || months <= 0) {
      setMonthlyPayment(null);
      setYearlyPayment(null);
      return;
    }

    const x = Math.pow(1 + rate, months);
    const monthly = (principal * x * rate) / (x - 1);

    if (isFinite(monthly) && monthly > 0) {
      setMonthlyPayment(monthly);
      setYearlyPayment(monthly * 12);

      // Save loan to database if user is logged in
      if (user) {
        try {
          const totalPayment = monthly * months;
          await loansAPI.saveLoan(
            user.id,
            principal,
            parseFloat(interestRate),
            months,
            monthly,
            totalPayment
          );
          
          toast({
            title: "Loan Saved",
            description: "Your loan calculation has been saved to the database"
          });
          
          // Reload loans to show the new one
          loadLoans();
        } catch (error) {
          console.error('Failed to save loan:', error);
          toast({
            title: "Error",
            description: "Failed to save loan calculation",
            variant: "destructive"
          });
        }
      }
    } else {
      setMonthlyPayment(null);
      setYearlyPayment(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Loan Payment Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly and yearly loan payments
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Loan Details
              </CardTitle>
              <CardDescription>Enter your loan information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="25000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Total amount you plan to borrow
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  placeholder="5.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Annual interest rate as a percentage
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanPeriod">Loan Period (Months)</Label>
                <Input
                  id="loanPeriod"
                  type="number"
                  placeholder="60"
                  value={loanPeriod}
                  onChange={(e) => setLoanPeriod(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Total repayment time in months
                </p>
              </div>

              <Button onClick={calculateLoan} className="w-full">
                Calculate Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Results</CardTitle>
              <CardDescription>Your estimated loan payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {monthlyPayment !== null && yearlyPayment !== null ? (
                <>
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
                    <p className="text-4xl font-bold text-primary">
                      ${monthlyPayment.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Amount due each month
                    </p>
                  </div>

                  <div className="p-6 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Yearly Payment</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${yearlyPayment.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Total amount per year
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Loan Amount</span>
                      <span className="font-medium">${parseFloat(loanAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loan Period</span>
                      <span className="font-medium">{loanPeriod} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground font-medium">Total Paid</span>
                      <span className="font-bold">
                        ${(monthlyPayment * parseFloat(loanPeriod)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Enter your loan details and click "Calculate Payment" to see your results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Loans Section */}
          {savedLoans.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Loan Calculations</CardTitle>
                <CardDescription>Your previous loan calculations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedLoans.map((loan, index) => (
                    <div key={loan.id || index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold">${loan.loan_amount?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Interest Rate</p>
                          <p className="font-semibold">{loan.interest_rate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Period</p>
                          <p className="font-semibold">{loan.loan_period} months</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly Payment</p>
                          <p className="font-semibold text-primary">${loan.monthly_payment?.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Total Payment: ${loan.total_payment?.toLocaleString()} | 
                        Saved: {new Date(loan.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
