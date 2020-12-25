const { Router } = require('express');
const UserApiComponent = require('./apiController');
const UserUiComponent = require('./uiController');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const apiRouter = Router();

/**
 * Route serving list of users.
 * @name /v1/api/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
apiRouter.get('/', UserApiComponent.findAll);

/**
 * Route serving a user
 * @name /v1/api/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
apiRouter.get('/:id', UserApiComponent.findById);

/**
 * Route serving a new user
 * @name /v1/api/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
apiRouter.post('/', UserApiComponent.create);

/**
 * Route serving a new user
 * @name /v1/api/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
apiRouter.put('/', UserApiComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/api/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
apiRouter.delete('/', UserApiComponent.deleteById);

const uiRouter = new Router();

uiRouter.get('/', UserUiComponent.index);
uiRouter.get('/:id/delete', UserUiComponent.deleteById);
uiRouter.get('/:id/update', UserUiComponent.updateById);

module.exports.api = apiRouter;
module.exports.ui = uiRouter;
