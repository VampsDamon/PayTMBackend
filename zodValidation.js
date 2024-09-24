const zod=require("zod");

const userSchema = zod.object({
  username: zod.string().email("Invalid email address"),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(6, "Password should be minimum of 6 characters"),
});

const signInSchema = zod.object({
  username: zod.string().email("Invalid email address"),
  password: zod.string().min(6,"Password should minimum of 6 characters"),
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