const express = require("express");
const mainRouter=require("./routes");
const dotenv = require("dotenv").config();
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", mainRouter);


app.listen(process.env._PORT,()=>console.log('App listening on port '+process.env._PORT))

