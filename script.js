monthlyIncome=0
function getIncome() {
  monthlyIncome = parseInt(prompt("Please enter your montly income: $", "0"));
  if (monthlyIncome != null) {
    document.getElementById("inc").innerHTML =
    "This is your monthly income: $" + monthlyIncome;
  }
}



function catergories(){
  var necc = parseInt(.50*monthlyIncome)
  var wants = parseInt(.30*monthlyIncome)
  var savings = parseInt(.20*monthlyIncome)
  document.getElementById("cat").innerHTML =
    "This is what you should spend on neccessities this month: $"+necc;
  document.getElementById("cat2").innerHTML =
    "This is what you should spend on wants this month: $" + wants;
  document.getElementById("cat3").innerHTML =
    "This is what you should put into your savings account this month: $" + savings;
}
