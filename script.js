
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

let wantsTotal = 0;
let needsTotal = 0;
let savingsTotal = 0;
let spendingData = [];
      
function submitSpending() {
  let statement = document.getElementById("statement").value;
  let spending = parseFloat(document.getElementById("spending").value);
  let category = document.getElementById("category").value;
        
  if (category === "wants") {
    wantsTotal += spending;
  } else if (category === "needs") {
    needsTotal += spending;
  } else if (category === "savings") {
    savingsTotal += spending;
  }

  spendingData.push({statement: statement, spending: spending, category: category});
  updateSpendingSummary();
  updateSpendingTable();
}
      
function updateSpendingSummary() {
  let total = wantsTotal + needsTotal + savingsTotal;
  let wantsPercentage = (wantsTotal / total) * 100;
  let needsPercentage = (needsTotal / total) * 100;
  let savingsPercentage = (savingsTotal / total) * 100;
        
  document.getElementById("wants-total").innerHTML = wantsTotal.toFixed(2);
  document.getElementById("wants-percentage").innerHTML = wantsPercentage.toFixed(2);
  document.getElementById("needs-total").innerHTML = needsTotal.toFixed(2);
  document.getElementById("needs-percentage").innerHTML = needsPercentage.toFixed(2);
  document.getElementById("savings-total").innerHTML = savingsTotal.toFixed(2);
  document.getElementById("savings-percentage").innerHTML = savingsPercentage.toFixed(2);
}

function updateSpendingTable() {
  let tableBody = document.getElementById("spending-table-body");
  tableBody.innerHTML = "";
  spendingData.forEach(function(entry) {
    let row = tableBody.insertRow(-1);
    let statementCell = row.insertCell(0);
    let spendingCell = row.insertCell(1);
    let categoryCell = row.insertCell(2);
    statementCell.innerHTML = entry.statement;
    spendingCell.innerHTML = entry.spending.toFixed(2);
    categoryCell.innerHTML = entry.category;
  });
}
$(function() {

  $('button#nav-a').click(function(event) {
  localStorage.setItem("text", "nav-a");
  });

  $('button#nav-b').click(function(event) {
  localStorage.setItem("text", "nav-b");
  });


  var path = window.location.pathname;
  var pathSub = path.substring(path.lastIndexOf("/") + 1, path.length)

  if(pathSub == "AboutUs.html"){
      document.getElementById(localStorage.getItem('text')).click();
  }
  if(pathSub == "index.html"){
    document.getElementById(localStorage.getItem('text')).click();
  }
  if(pathSub == "Login.html"){
    document.getElementById(localStorage.getItem('text')).click();
  }
  if(pathSub == "FinancialChart.html"){
    document.getElementById(localStorage.getItem('text')).click();
  }
}) 
