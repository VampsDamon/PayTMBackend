const { request } = require("express");
const { Account } = require("../DB/db");
const { default: mongoose } = require("mongoose");

const accountController = {
  getBalance: async (req, res) => {
    try {
      const account = await Account.findOne({ userId: req.userId });
      return res.json({
        balance: account.balance,
      });
    } catch (error) {
      return res.status(411).json({
        message: "Error to get balance",
        error: error.message,
      });
    }
  },
  moneyTransfer: async (req, res) => {
    try {
      //   const session = await mongoose.startSession();
      const { amount, to } = req.body;
      if (!to && !amount) {
        // await session.abortTransaction();
        throw new Error("Send receiver Id and amount");
      }

      const account = await Account.findOne({
        userId: req.userId,
      });
      //   .session(session);

      const toAccount = await Account.findOne({
        userId: to,
      });
      //   .session(session);

      if (!toAccount) {
        // await session.abortTransaction();
        throw new Error("Invalid account ");
      }

      if (account.balance < amount) {
        // await session.abortTransaction();
        throw new Error("Insufficient Balance");
      }

      await Account.updateOne(
        {
          userId: req.userId,
        },
        {
          $inc: {
            balance: -amount,
          },
        }
      );
      //   .session(session);

      await Account.updateOne(
        {
          userId: to,
        },
        {
          $inc: {
            balance: amount,
          },
        }
      );
      //   .session(session);

      //   await session.commitTransaction();

      res.json({
        message: "Transfer successful",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error to transfer money",
        error: error.message,
      });
    }
  },
};

module.exports = accountController;
