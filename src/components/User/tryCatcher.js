const ValidationError = require('../../error/ValidationError');
const UserValidation = require('./validation');

const apiCatcher = {
    findAll(fn) {
        return (req, res, next) => fn(req, res, next).catch((error) => {
            res.status(500).json({
                error: error.message,
                details: null,
            });
            next(error);
        });
    },
    findById(fn) {
        return (req, res, next) => {
            try {
                const { error } = UserValidation.findById(req.params);
                if (error) {
                    throw new ValidationError(error.details);
                }

                return fn(req, res, next);
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.status(422).json({
                        error: error.name,
                        details: error.message,
                    });
                }
                res.status(500).json({
                    message: error.name,
                    details: error.message,
                });
                return next(error);
            }
        };
    },
    create(fn) {
        return (req, res, next) => {
            try {
                const { error } = UserValidation.create(req.body);
                if (error) {
                    throw new ValidationError(error.details);
                }

                return fn(req, res, next);
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.status(422).json({
                        message: error.name,
                        details: error.message,
                    });
                }
                res.status(500).json({
                    message: error.name,
                    details: error.message,
                });
                return next(error);
            }
        };
    },
    updateById(fn) {
        return (req, res, next) => {
            try {
                const { error } = UserValidation.updateById(req.body);
                if (error) {
                    throw new ValidationError(error.details);
                }

                return fn(req, res, next);
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.status(422).json({
                        message: error.name,
                        details: error.message,
                    });
                }
                res.status(500).json({
                    message: error.name,
                    details: error.message,
                });
                return next(error);
            }
        };
    },
    deleteById(fn) {
        return (req, res, next) => {
            try {
                const { error } = UserValidation.deleteById(req.body);

                if (error) {
                    throw new ValidationError(error.details);
                }

                return fn(req, res, next);
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.status(422).json({
                        message: error.name,
                        details: error.message,
                    });
                }
                res.status(500).json({
                    message: error.name,
                    details: error.message,
                });
                return next(error);
            }
        };
    },
};

const uiCatcher = {
    index(fn) { return fn; },
};

module.exports = {
    api: (fn) => apiCatcher[fn.name](fn),
    ui: (fn) => uiCatcher[fn.name](fn),
};
