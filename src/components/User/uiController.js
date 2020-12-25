const UserService = require('./service');
const tryCatcher = require('./tryCatcher').ui;
const url = 'http://127.0.0.1:3000/v1/users/';

async function index(req, res) {
    const users = await UserService.findAll();
    res.render('users', { title: 'Index', users, url });
}

async function deleteById(req, res) {
    await UserService.deleteById(req.params.id);
    const users = await UserService.findAll();
    res.render('users', { title: 'Index', users, url });
}

async function updateById(req, res) {
    const user = await UserService.findById(req.params.id);
    res.render('updateUser', { user, url, title: 'Update User' });
}

async function update(req, res) {
    await UserService.updateById(req.params.id, req.body);
    const users = await UserService.findAll();
    res.render('users', { title: 'Index', users, url });
}

async function create(req, res) {
    res.render('createUser', { title: 'Create User', url });
}

async function store(req, res) {
    await UserService.create(req.body);
    const users = await UserService.findAll();
    res.render('users', { title: 'Index', users, url });
}

module.exports = {
    index: tryCatcher(index),
    deleteById: tryCatcher(deleteById),
    updateById: tryCatcher(updateById),
    update: tryCatcher(update),
    create: tryCatcher(create),
    store: tryCatcher(store),
};
