const z = require('zod');

const userSchema = z.object({
    email: z
        .email({ error: "Invalid email address" })
        .trim()
        .toLowerCase(),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { error: "Password must be at least 8 characters" })
})

module.exports = {
    userSchema
}