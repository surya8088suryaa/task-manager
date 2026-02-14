const validator = (schema) => (req, res, next)=> {
    const {error,value} = schema.validate(req.body, { abortEarly: true });

    if (Error) {
        error.status = 400;
        next(error);
    }

    req.body = value;
    next();
};

export default validator;