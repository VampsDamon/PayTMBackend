const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const accountSchema=new mongoose.Schema({
  userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true,
  },
  balance:{
    type:Number,
    required:true,
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};