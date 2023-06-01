<html>
<body>

<head>
  <div class="tab">
    <button class="tablinks" onclick="openCity(event, 'Home')">
      <a id="nav-b" href="index.html">Home</a>
    </button>

    <button class="tablinks">
      <a id="nav-b" href="SpendingTracker.html">SpendingTracker</a>
    </button>

    <button class="tablinks" onclick="openCity(event, 'About Us')">
      <a id="nav-b" href="AboutUs.html">About Us</a>
    </button>
    <button class="tablinks" onclick="openCity(event, 'Login')">
      <a id="nav-b" href="Login.php">Login</a>
    </button>
    <button class="tablinks">
      <a id="nav-b" href="FinancialChart.html">Financial Chart</a>
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

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>FinanciallyFit</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
  <script src="script.js" type="text/javascript"></script>
</head>

<style>
body {background-color: powderblue;}

h2   {
  color: black;
  font-family:timesnewroman;
}

p    {
  color: black;
  font-family:timesnewroman;
  }
h1  {
  color:black;
  font-family:timesnewroman;
  font-size:150%;
}
</style>


  <h1>Login Page</h1>
    <form action="LoginValidation.php" method="post">
		  <label for="username">Username:</label>
		  <input type="text" id="username" name="username" required>
		  <label for="password">Password:</label>
		  <input type="password" id="password" name="password" required>
		  <input type="submit" value="Log In">
	  </form>
	<hr>
	<h1>Sign-Up Page</h1>
	  <form action="SignUp.php" method="post">
		  <label for="new_username">New Username:</label>
		  <input type="text" id="new_username" name="new_username" required>
      <label for="new_username">Full Name:</label>
		  <input type="text" id="new_name" name="new_name" required>
		  <label for="new_password">New Password:</label>
		  <input type="password" id="new_password" name="new_password" required>
		  <input type="submit" value="Sign Up">
	  </form>


</body>

<?php
session_start();
if ((array_key_exists('error1',$_SESSION)) && ($_SESSION['error1'])){
  echo "Sorry, this username was already taken. Please try again!";
}
if ((array_key_exists('error2',$_SESSION)) && ($_SESSION['error2'] == true)){
  echo  "Login failed, please try again.";
}
?>

</html>
