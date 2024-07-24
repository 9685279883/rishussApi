// const express = require('express');
// const dotenv = require('dotenv');
// const DB = require('./config/dbConfig');
// const employeeRoute = require("./views/employee");
// const cors = require('cors');
// const hrRoute = require("./views/hr");

// dotenv.config();

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 8000;  // default port

// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('API is Running');
// });

// app.use('/', employeeRoute);
// app.use('/hr', hrRoute);

// app.listen(PORT, () => {
//     console.log(`Server Running at http://localhost:${PORT}`);
// });



// new code 

// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const DB= require('./config/dbConfig');
const employeeRoute = require('./views/employee');
const hrRoute = require('./views/hr')
const app = express();
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 8000


app.get('/api', (req,res)=>{
  res.send('Api is runing on port 8000')
})

app.use('/employe', employeeRoute);
app.use('/hrroute', hrRoute);

app.listen(PORT, async () => {
  console.log('Server is running on port 8000');
});
