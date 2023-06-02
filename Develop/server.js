const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const routes = require("./public/Routes/apiroutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// USING ROUTES 
app.use(routes) 

// 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);

// LISTENING ON LOCAL HOST
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);