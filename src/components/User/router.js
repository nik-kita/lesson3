const { Router } = require('express');
const UserApiComponent = require('./apiController');
const UserUiComponent = require('./uiController');

/**
 * Express router to mount user api related functions on.
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

/**
 * Express router to mount user ui related functions on.
 * @type {Express.Router}
 * @const
 */
const uiRouter = new Router();

/**
 * Route serving 'All users' page
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
uiRouter.get('/', UserUiComponent.index);

/**
 * Route serving user delete by id
 * @name /v1/users/:id/delete
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
uiRouter.get('/:id/delete', UserUiComponent.deleteById);

/**
 * Route serving page for updating user
 * @name /v1/users/:id/update
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
uiRouter.get('/:id/update', UserUiComponent.updateById);

/**
 * Route serving update user's info and show actual users
 * @name /v1/users/:id/update
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
uiRouter.post('/:id/update', UserUiComponent.update);

/**
 * Route serving page for creating new user
 * @name /v1/users/create
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
uiRouter.get('/create', UserUiComponent.create);

/**
 * Route serving storing new user and display all users actual page
 * @name /v1/users/create
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
uiRouter.post('/create', UserUiComponent.store);

module.exports = {
    api: apiRouter,
    ui: uiRouter,
};
