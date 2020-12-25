const ValidationError = require('../error/ValidationError');

const catcher = {
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
        return (req, res, next) => fn(req, res, next).catch((error) => {
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
        });
    },
    create(fn) {
        return (req, res, next) => fn(req, res, next).catch((error) => {
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
        });
    },
    updateById(fn) {
        return this.create(fn);
    },
    deleteById(fn) {
        return this.create(fn);
    },
};

module.exports = (fn) => catcher[fn.name](fn);
