const zod = require("zod");
const {
  userSchema,
  signInSchema,
  updateBodySchema,
} = require("../zodValidation");
const { User, Account } = require("../DB/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userController = {
  helloWorldController: (req, res) => {
    return res.send("Hello World");
  },
  signUp: async (req, res) => {
    try {
      const { username, firstName, lastName, password } = req.body;
      const parseData = userSchema.safeParse({
        username,
        firstName,
        lastName,
        password,
      });

      if (!parseData.success) {
        throw new Error("Incorrect inputs");
      }
      const userExist = await User.findOne({ username });
      if (userExist) {
        throw new Error("Incorrect inputs");
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

      const jwtToken = jwt.sign({ userId }, JWT_SECRET);

      return res.json({
        message: "User created successfully",
        token: jwtToken,
      });
    } catch (error) {
      return res.status(411).json({
        message: "Error on SignUp",
        error: error.message,
      });
    }
  },

  signIn: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    const { success } = signInSchema.safeParse({ username, password });

    if (!success)
      return res.status(411).json({
        message: "Incorrect username or password",
      });
    if (!user)
      return res.status(411).json({
        message: "User not Exist",
      });

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ token });
  },

  updateUserInfo: async (req, res) => {
    const { success } = updateBodySchema.safeParse(req.body);
    const userId = req.userId;
    try {
      if (!success) throw new Error("");
      await User.updateOne({ _id: userId }, req.body);
      return res.json({
        message: "Updated successfully",
      });
    } catch (error) {
      return res.status(411).json({
        message: "Error while updating information",
      });
    }
  },

  filterUser: async (req, res) => {
    const filter = req.query.filter || "";
    try {
      if (!filter) throw new Error("Filter must be provided");
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
