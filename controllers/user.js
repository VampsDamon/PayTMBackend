const zod = require("zod");
const {
  userSchema,
  signInSchema,
  updateBodySchema,
} = require("../zodValidation");
const { User, Account } = require("../DB/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userController = {
  helloWorldController: (req, res) => {
    return res.send("Hello World");
  },
  signUp: async (req, res) => {
    try {
      const { username, firstName, lastName, password } = req.body;
       userSchema.parse({
        username,
        firstName,
        lastName,
        password,
      });

      
      const userExist = await User.findOne({ username });
      if (userExist) {
        throw new Error("Username already exist");
      }

      const user = await User.create({
        username,
        firstName,
        lastName,
        password,
      });

      const userId = user._id;

      await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10000 + 1),
      });

      const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET);

      return res.json({
        message: "User created successfully",
        token: jwtToken,
      });
    } catch (error) {
      
      let errorMessage
      if(error instanceof zod.ZodError )
      {
        errorMessage=error.errors[0].message;
      }
      else errorMessage = error.message;

      

      return res.status(411).json({
        message: "Error on SignUp",
        error: errorMessage,
      });
    }
  },

  signIn: async (req, res) => {
    try {
       const { username, password } = req.body;
       const user = await User.findOne({ username, password });

       signInSchema.parse({ username, password });

       if (!user)
         throw new Error("User not Exist");

       const userId = user._id;
       const token = jwt.sign({ userId }, process.env.JWT_SECRET);
       res.json({ token });
    } catch (error) {
      let errorMessage;
      if (error instanceof zod.ZodError) {
        errorMessage = error.errors[0].message;
      } else errorMessage = error.message;

      return res.status(411).json({
        message: "Error on SignIn",
        error: errorMessage,
      });
    }
    
  },

  updateUserInfo: async (req, res) => {
    try {
       updateBodySchema.parse(req.body);
      const userId = req.userId;
      if (!success) throw new Error("");
      await User.updateOne({ _id: userId }, req.body);
      return res.json({
        message: "Updated successfully",
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof zod.ZodError) {
        errorMessage = error.errors[0].message;
      } else errorMessage = error.message;

      return res.status(411).json({
        message: "Error while updating user Information",
        error: errorMessage,
      });
    }
  },

  filterUser: async (req, res) => {
    const filter = req.query.filter || "";
    try {
      const users = await User.find({
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
        ],
      });
      return res.json({
        users: users.map(({ username, firstName, lastName, _id }) => {
          return { username, firstName, lastName, _id };
        }),
      });
    } catch (error) {
      return res.status(411).json({
        message: "Error while filtering",
        error: error.message,
      });
    }
  },
};

module.exports = userController;
