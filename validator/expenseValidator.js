const z = require('zod');

const expenseSchema = z.object({
    amount: z.coerce
        .number({ required_error: "Please enter an amount!" })
        .min(1, "Please enter amount more than 1")
        .positive("Amount must be positive number"),
    category: z
        .enum(["Groceries", "Rent", "Transportation", "Activities", "Shopping", "Subscriptions", "Essentials", "Leisure", "Health"],
            {
                required_error: "Please enter a category",
                invalid_type_error: "Invalid category selected"
            }
        )
    ,
    description: z
        .string()
        .trim()
        .optional(),

    date: z.coerce
        .date()
        .default(() => new Date())
});

module.exports = {
    expenseSchema
}