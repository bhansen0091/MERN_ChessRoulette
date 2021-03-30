const GameController = require("../controllers/game.controller");

module.exports = (app) => {
    app.get('/api/games', GameController.index);
    app.post('/api/games', GameController.create);
    app.get('/api/games/:id', GameController.show);
    // app.put('/api/games/:id', GameController.update);
    app.put('/api/games/:gameId/addPlayer/:userId', GameController.addPlayer);
    app.put('/api/games/:gameId/removePlayer/:userId', GameController.removePlayer);
    app.delete('/api/games/:id', GameController.destroy);
}

