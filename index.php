<?php
session_start();
$_SESSION['error1'] = false;
$_SESSION['error2'] = false;
?>
<html>
<home>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>FinanciallyFit</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
  <script src="script.js" type="text/javascript"></script>
  
</head>

<body>
  <div class="tab">
    <button class="tablinks">
      <a id="nav-b" href="index.php">Home</a>
    </button>

    <button class="tablinks">
      <a id="nav-b" href="SpendingTracker.html">SpendingTracker</a>
    </button>

    <button class="tablinks">
      <a id="nav-b" href="AboutUs.html">About Us</a>
    </button>
    <button class="tablinks">
      <a id="nav-b" href="Login.php">Login</a>
    </button>        
    <button class="tablinks">
      <a id="nav-b" href="FinancialChart.php">Financial Chart</a>
    </button>
    <button class="tablinks">
      <a id="nav-b" href="LoanPayment.html">Loan Payment</a>
    </button>
    <button class="tablinks">
      <a id="nav-b" href="MoreInfo.html">More Information</a>
    </button>
    <button class="tablinks">
      <a id="nav-b" href="userguide.html">User Guide</a>
    </button>
  </div>
  

  <button id="showButton" class="custom-button">Welcome <?php echo $_SESSION["name"] ?>!</button>

  
  <div id="hiddenSection" style="display:none;">
  
  <img src="financiallyfit.png" alt="picture" class="center">
  <h2>FinanciallyFit</h2>
  
  <h1><p id="income"> Click the button to begin you savings journey.</p></h1>
  <button type="button" onclick="getIncome()">Click here to enter monthly income</button>
  
  <button onclick="catergories()">Click here to see the perfect breakdown of spending categories</button>
  
  <p id="neccessities">This is what you should spend on neccessities this month: $</p>
  <p id="wants">This is what you should spend on wants this month: $</p>
  <p id="savings">This is what you should put into your savings account this month: $</p>
  
  <h1><br>The 50.30.20 Rule</h2>
  <p>
    20 percent of your income should go to savings and retirement <br>
    50 percent going towards necessities, like rent and bills  <br>
    30 percent towards your wants <br>
  <br>
  
    Necessities: 50% of your paycheck <br>
    &emsp;This category of spending includes money spent on groceries, housing, transportation, insurance(Health/Car/etc), and minimum debt payments.
    <br>
    <br>
  
    Wants: 30% of your paycheck <br>
    &emsp;This category of spending includes money spent on take-out, hobbies, clothing/accessories, memberships/subscriptions, WiFi, travel, and extra debt payments. 
    <br>
    <br>
  
    Savings: 20% of your paycheck <br>
    &emsp;This category of spending includes money spent on savings plans, emergency funds, retirement accounts, and investments. 
    <br>
      
    </p>
  
  
  <h1><br>Customized Plan</h2>
  
  
  
  <h1><p id="custom"> Click the button to make a customized plan.</p></h1>
  <button type="button" onclick="customFunc()">Click here to make a customized plan.</button>
  
  <button onclick="customCatergories()">Click here to see your custom breakdown</button>
  
  <p id="monIncome">This is your monthly income: $</p>
  <p id="customNeccessities">This is what you should spend on necessities this month: $</p>
  <p id="customWants">This is what you should spend on wants this month: $</p>
  <p id="customSavings">This is what you should put into your savings account this month: $</p>
   
  </div>

 <script>
  document.getElementById("showButton").addEventListener("click", function() {
  var hiddenSection = document.getElementById("hiddenSection");
  var showButton=document.getElementById("showButton")

  if (hiddenSection.style.display === "none") {
    hiddenSection.style.display = "block";
  } else {
    hiddenSection.style.display = "none";
  }
  showButton.style.display="none";
});
  
  </script>



<style>

h2   {
  color: white;
  font-family:timesnewroman;
  font-size: 220%;
}

p    {
  color: white;
  font-family:timesnewroman;
  }
h1  {
  color:white;
  font-family:timesnewroman;
  font-size:150%;
}
label {
  color:white;
}
th{
  color:white;
}
option {
  color:white;
}
li {
  color:white;
}
form {
  color:white
}
</style>

<script>
  monthlyIncome=0
  function getIncome() {
    monthlyIncome = parseInt(prompt("Please enter your montly income: $", "0"));
    if (monthlyIncome != null) {
      document.getElementById("income").innerHTML =
      "This is your monthly income: $" + monthlyIncome;
    }
  }

  function catergories(){
    var necc = parseInt(.50*monthlyIncome)
    var wants = parseInt(.30*monthlyIncome)
    var savings = parseInt(.20*monthlyIncome)
    document.getElementById("neccessities").innerHTML =
    "This is what you should spend on neccessities this month: $"+necc;
    document.getElementById("wants").innerHTML =
    "This is what you should spend on wants this month: $" + wants;
    document.getElementById("savings").innerHTML =
    "This is what you should put into your savings account this month: $" + savings;
}
</script>

<script>
  customNec=0
  customWants=0
  customSav=0
  monthlyIncome=0
  
  function customFunc() {
    customNec = parseInt(prompt("Please enter the percentage you want to spend on necessities: %", "0"));
    left=100-customNec
    promptStringWan="You have "+left.toString()+"% left. Please enter the percentage you want to spend in wants: %"
    customWants = parseInt(prompt(promptStringWan, "0"));
    left=left-customWants
    promptStringSav="You have "+left.toString()+"% left. Please enter the percentage you want to spend in savings: %"
    customSav = parseInt(prompt(promptStringSav, "0"));

    if (monthlyIncome != null) {
      document.getElementById("custom").innerHTML =
      "This is your custom percentage breakdown: " + customNec+"% for necessities, "+customWants+"% for wants, "+customSav+"% for needs";
    }
  }

  function customCatergories(){
    monthlyIncomeCustom = parseInt(prompt("Please enter your montly income: $", "0"));
    if (monthlyIncomeCustom != null) {
      document.getElementById("monIncome").innerHTML =
      "This is your monthly income: $" + monthlyIncomeCustom;
    }
    var necc = parseInt(customNec/100*monthlyIncomeCustom)
    var wants = parseInt(customWants/100*monthlyIncomeCustom)
    var savings = parseInt(customSav/100*monthlyIncomeCustom)
    document.getElementById("customNeccessities").innerHTML =
    "This is what you should spend on neccessities this month: $"+necc;
    document.getElementById("customWants").innerHTML =
    "This is what you should spend on wants this month: $" + wants;
    document.getElementById("customSavings").innerHTML =
    "This is what you should put into your savings account this month: $" + savings;
}
</script>


<style>
  .custom-button{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #showButton {
    font-size: 24px;
    padding: 10px 20px
  }
  </style>





</body>
</home>
</html>
