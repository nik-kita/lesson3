const UserService = require('./service');
const tryCatcher = require('./tryCatcher').ui;

async function index(req, res) {
    const users = await UserService.findAll();
    res.render('users', { title: 'Index', users });
}

module.exports = {
    index: tryCatcher(index),
};
