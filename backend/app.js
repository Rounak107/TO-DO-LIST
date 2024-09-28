require("dotenv").config();
require("./Config/database").ToDoDataBase();
const express = require("express");
const app = express();
const cors = require('cors');
const todoRouters = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");


 
app.use(cors({
  credentials : true,
  origin: 'https://to-do-list-bq4jg7ty1-rounak107s-projects.vercel.app/', // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true,
  
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", todoRouters);
app.use("/", userRoutes);
// app.use("/", userRoutes);


module.exports =app;