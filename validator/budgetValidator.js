const z = require('zod');

const budgetSchema = z.object({
    category: z
        .enum(["Groceries", "Rent", "Transportation", "Activities", "Shopping", "Subscriptions", "Essentials", "Leisure", "Health"],
            {
                required_error: "Please enter a category",
                invalid_type_error: "Invalid category selected"
            }
        )
    ,
    limit: z.coerce
        .number({ required_error: "Please enter a limit for the budget!" })
        .min(1, "Limit should not be empty or negative")
})

module.exports = {
    budgetSchema
};