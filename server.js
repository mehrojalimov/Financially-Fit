const express = require('express');
const mongoose = require('mongoose');

// create an instance of the Express application
const app = express();

// connect to the MongoDB database
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define a schema for the data
const spendingSchema = new mongoose.Schema({
  statement: String,
  spending: Number,
  category: String,
});

// create a model for the data based on the schema
const Spending = mongoose.model('Spending', spendingSchema);

// define an API endpoint to retrieve the data
app.get('/api/spending', async (req, res) => {
  try {
    // retrieve all the spending data from the database
    const spendingData = await Spending.find();

    // format the data for the pie chart
    const data = {
      labels: ['Entertainment', 'Shopping', 'Savings', 'Education', 'Needs'],
      datasets: [
        {
          label: 'The Money You Spent ($)',
          data: spendingData.reduce(
            (acc, spending) => {
              const categoryIndex = data.labels.indexOf(spending.category);
              if (categoryIndex !== -1) {
                acc[categoryIndex] += spending.spending;
              }
              return acc;
            },
            [0, 0, 0, 0, 0]
          ),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#2ECC71',
            '#FF9900',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#2ECC71',
            '#FF9900',
          ],
        },
      ],
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});