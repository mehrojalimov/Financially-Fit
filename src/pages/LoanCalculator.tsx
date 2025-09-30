import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [yearlyPayment, setYearlyPayment] = useState<number | null>(null);

  const calculateLoan = () => {
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
        </div>
      </div>
    </div>
  );
}
