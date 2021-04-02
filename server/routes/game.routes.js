const GameController = require("../controllers/game.controller");

module.exports = (app) => {
    app.get('/api/games', GameController.index);
    app.post('/api/games', GameController.create);
    app.get('/api/games/:id', GameController.show);
    app.put('/api/games/:id', GameController.update);
    app.put('/api/games/:gameId/addPlayerWhite/:userId', GameController.addPlayerWhite);
    app.put('/api/games/:gameId/addPlayerBlack/:userId', GameController.addPlayerBlack);
    app.put('/api/games/:gameId/removePlayerWhite/:userId', GameController.removePlayerWhite);
    app.put('/api/games/:gameId/removePlayerBlack/:userId', GameController.removePlayerBlack);
    app.delete('/api/games/:id', GameController.destroy);
}

