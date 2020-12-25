const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const tryCatcher = require('../../trifles/errorHof');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res) {
    const users = await UserService.findAll();
    res.status(200).json({
        data: users,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res) {
    const { error } = UserValidation.findById(req.params);
    if (error) {
        throw new ValidationError(error.details);
    }
    const user = await UserService.findById(req.params.id);
    return res.status(200).json({
        data: user,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res) {
    const { error } = UserValidation.create(req.body);
    if (error) {
        throw new ValidationError(error.details);
    }
    const user = await UserService.create(req.body);
    return res.status(200).json({
        data: user,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res) {
    const { error } = UserValidation.updateById(req.body);
    if (error) {
        throw new ValidationError(error.details);
    }
    const updatedUser = await UserService.updateById(req.body.id, req.body);
    return res.status(200).json({
        data: updatedUser,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res) {
    console.log('delete');
    const { error } = UserValidation.deleteById(req.body);
    if (error) {
        throw new ValidationError(error.details);
    }
    const deletedUser = await UserService.deleteById(req.body.id);
    return res.status(200).json({
        data: deletedUser,
    });
}

module.exports = {
    findAll: tryCatcher(findAll),
    findById: tryCatcher(findById),
    create: tryCatcher(create),
    updateById: tryCatcher(updateById),
    deleteById: tryCatcher(deleteById),
};
