const express = require('express');
const app = express();



// Template Engine
app.set("view engine","ejs")

app.use(express.static("public"))




// Routes
app.get(['/','/index'], (req, res) => {
  res.status(200).render('index',
  {page_name : "index"}
  )
});

app.get('/about', (req, res) => {
  res.status(200).render('about',
  {page_name : "about"}
  )
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
