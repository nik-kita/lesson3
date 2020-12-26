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

                return fn(req, res, next).catch((err) => {
                    res.status(500).json({
                        message: err.name,
                        details: err.message,
                    });
                });
            } catch (error) {
                return res.status(422).json({
                    error: error.name,
                    details: error.message,
                });
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

                return fn(req, res, next).catch((err) => {
                    res.status(500).json({
                        message: err.name,
                        details: err.message,
                    });
                });
            } catch (error) {
                return res.status(422).json({
                    message: error.name,
                    details: error.message,
                });
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

                return fn(req, res, next).catch((err) => {
                    res.status(500).json({
                        message: err.name,
                        details: err.message,
                    });
                });
            } catch (error) {
                return res.status(422).json({
                    message: error.name,
                    details: error.message,
                });
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

                return fn(req, res, next).catch((err) => {
                    res.status(500).json({
                        message: err.name,
                        details: err.message,
                    });
                });
            } catch (error) {
                return res.status(422).json({
                    message: error.name,
                    details: error.message,
                });
            }
        };
    },
};

const url = 'http://127.0.0.1:3000/v1/users/';

const uiCatcher = {
    index(fn) {
        return (req, res, next) => fn(req, res, next).catch((error) => {
            res.render('error', {
                status: 500,
                error: error.name,
                massage: error.mesage,
            });
            next(error);
        });
    },
    deleteById(fn) { return fn; },
    updateById(fn) { return fn; },
    update(fn) { return fn; },
    create(fn) { return fn; },
    store(fn) {
        return (req, res, next) => {
            try {
                const { error } = UserValidation.create(req.body);
                if (error) {
                    throw new ValidationError(error.details);
                }

                return fn(req, res, next).catch((err) => {
                    res.render('error', {
                        url,
                        title: 'Ooops...',
                        status: 500,
                        error: err.name,
                        message: err.message,
                    });
                    next(error);
                });
            } catch (error) {
                return res.status(422).render('error', {
                    url,
                    title: 'Error!',
                    status: 422,
                    error: error.name,
                    message: JSON.stringify(error.message),
                });
            }
        };
    },
};

module.exports = {
    api: (fn) => apiCatcher[fn.name](fn),
    ui: (fn) => uiCatcher[fn.name](fn),
};
