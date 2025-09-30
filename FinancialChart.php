<?php
session_start();


require_once __DIR__ . '/vendor/autoload.php';
$client = new MongoDB\Client('mongodb+srv://savittumuluri:Savit123@savitdb1.x6zw2zv.mongodb.net/');
$collection = $client->FinanciallyFit->Users;
$document = $collection->findOne(['username' => $_SESSION['user']]);



?>
<html>
  <head>
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
      
    <title>Pie Chart</title>
    <style>
      canvas {
        width: 800px;
        height: 400px;
        /* Change the width and height values as per your requirement */
      }
      .chart-container {
        width: 60%;
        margin: auto;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Add Numbers to List</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>

  <body>
    <body class="financial-chart"></body>
  <h1>Your Financial Chart</h1>
  <form>
    <label for="label">Enter Spending Category:</label>
    <input type="text" id="label" name="label">
    <label for="number">Enter How Much You Spent:</label>
    <input type="number" id="number" name="number">
    <button type="button" onclick="addData()">Add to Chart</button>
    <button type="button" onclick="doThings()">Import to Chart from Database</button>

  </form>
  <div class="chart-container">
    <canvas id="myChart"></canvas>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
  <script src="script.js"></script>
  <script>


    // set the initial data
    var data = {
      labels: [],
      datasets: [
        {
          label: "The Money You Spent ($)",
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#2ECC71",
            "#FF9900",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#2ECC71",
            "#FF9900",
          ],
        },
      ],
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: data,
    });
    

    function doThings() {
        var moneyInfo = <?php echo json_encode($document["moneyInfo"]); ?>;

        for (i in moneyInfo) {
            addData2(moneyInfo[i][0], moneyInfo[i][1]);
        }
    }

    function addData2(label, num) {
        

    
      var number = Number(num);
      

      // update the data object
      var index = data.labels.indexOf(label);
      if (index !== -1) {
        data.datasets[0].data[index] += number;
      } else {
        data.labels.push(label);
        data.datasets[0].data.push(number);
        data.datasets[0].backgroundColor.push(getRandomColor());
        data.datasets[0].hoverBackgroundColor.push(getRandomColor());
      }

      // update the chart
      myChart.update();

    }
    function addData() {
      var numberInput = document.getElementById("number");
      var labelInput = document.getElementById("label");

      // get the data from the inputs
      var number = Number(numberInput.value);
      var label = labelInput.value;

      // update the data object
      var index = data.labels.indexOf(label);
      if (index !== -1) {
        data.datasets[0].data[index] += number;
      } else {
        data.labels.push(label);
        data.datasets[0].data.push(number);
        data.datasets[0].backgroundColor.push(getRandomColor());
        data.datasets[0].hoverBackgroundColor.push(getRandomColor());
      }

      // update the chart
      myChart.update();

      // reset the inputs
      numberInput.value = "";
      labelInput.value = "";
    }

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    </script>
  </body>
</html>
