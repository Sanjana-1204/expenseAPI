const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (result.success) {
            req.body = result.data;
            next();
        } else {
            const errorMessages = result.error.errors.map((err) => err.message);
            res.status(400).json({
                status: 'fail',
                message: 'Validation Error',
                errors: errorMessages
            });
        }
    };
};

module.exports = validate;