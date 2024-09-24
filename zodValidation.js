const zod=require("zod");

const userSchema = zod.object({
  username: zod.string().email("Invalid email address"),
  firstName: zod
    .string()
    .max(50)
    .min(1, "First name must contain at least 1 character(s)"),
  lastName: zod
    .string()
    .max(50)
    .min(1, "Last name must contain at least 1 character(s)"),
  password: zod.string().min(6, "Password must contain at least 1 character(s)"),
});

const signInSchema = zod.object({
  username: zod.string().email("Invalid email address"),
  password: zod
    .string()
    .min(6, "Password must contain at least 1 character(s)"),
});

const updateBodySchema = zod.object({
  password: zod
    .string()
    .min("Password must contain at least 1 character(s)")
    .optional(),
  firstName: zod
    .string()
    .min(1, "First Name must contain at least 1 character(s)")
    .optional(),
  lastName: zod
    .string()
    .min(1, "Last Name must contain at least 1 character(s)")
    .optional(),
});

module.exports = {
  userSchema,
  signInSchema,
  updateBodySchema,
};