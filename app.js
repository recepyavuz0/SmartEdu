const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')

const app = express();

//Connect MongoDB
mongoose.connect('mongodb://localhost/smartedu-db').then(()=>{
  console.log("DB Connected")
});

// Template Engine
app.set("view engine","ejs")

app.use(express.static("public"))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
