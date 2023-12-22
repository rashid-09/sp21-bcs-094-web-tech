
require('dotenv').config();

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.post('/api/calculator', (req, res) => {
  try {
    const { operand1, operand2, operation } = req.body;
    let result;

    switch (operation) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case 'x':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }

    // Add the calculation to the cookies
    const calculations = req.cookies.calculations || [];
    calculations.push({ operand1, operand2, operation, result });
    res.cookie('calculations', calculations, { maxAge: 900000, httpOnly: true });

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})