const zod=require("zod");

const userSchema=zod.object({
    username:zod.string().min(3).max(30),
    firstName:zod.string().max(50),
    lastName:zod.string().max(50),
    password:zod.string().min(6)
});

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string()
});

const updateBodySchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

module.exports = {
  userSchema,
  signInSchema,
  updateBodySchema,
};