// const UserController = require("../controllers/user.controller");
const LogRegController = require('../controllers/auth.controller'),
    UserController = require('../controllers/user.controller'),
    {authenticate} = require('../config/jwt.config');

// module.exports = (app) => {
//     app.get('/api/users', UserController.index);
//     // app.post('/api/users', UserController.create);
//     app.get('/api/users/:id', UserController.show);
//     app.put('/api/users/:id', UserController.update);
//     app.delete('/api/users/:id', UserController.destroy);
// }


module.exports = (app) => {
    app.post('/api/register', LogRegController.register);
    app.post('/api/login', LogRegController.login);
    app.get('/api/users', authenticate, UserController.index);
    app.get('/api/users/:id', authenticate, UserController.show);
    app.put('/api/users/:id', authenticate, UserController.update);
    app.delete('/api/users/:id',authenticate, UserController.destroy);
    app.get('/api/logout', authenticate, LogRegController.logout);
    app.post('/api/checkpassword', authenticate, LogRegController.checkPasswordBeforeChange);
}