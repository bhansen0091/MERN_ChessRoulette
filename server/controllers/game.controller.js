const Game = require("../models/game.model");
const {User} = require("../models/user.model");


module.exports = {
    index : (req,res) => {
        Game.find()
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors: err.errors}))
    },
    create : (req,res) => {
        Game.create(req.body)
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors: err.errors}))
    },
    show : (req,res) => {
        Game.findOne({_id: req.params.id})
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors: err.errors}))
    },
    update : (req,res) => {
        Game.updateOne({_id:req.params.id}, req.body, {runValidators:true, new:true})
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors: err.errors}))
    },
    addPlayerWhite : (req, res) => {
        User.findOne({_id: req.params.userId})
            .then(data => {
                Game.findOneAndUpdate({_id: req.params.gameId},
                    {$push: {playerWhite: data}}, {new: true, useFindAndModify: false})
                    .then(data => res.json({results: data}))
                    .catch(err => res.status(404).json({errors: err.errors}));
            })
            .catch(err => res.status(404).json({errors: err.errors}));
    },
    addPlayerBlack : (req, res) => {
        User.findOne({_id: req.params.userId})
            .then(data => {
                Game.findOneAndUpdate({_id: req.params.gameId},
                    {$push: {playerBlack: data}}, {new: true, useFindAndModify: false})
                    .then(data => res.json({results: data}))
                    .catch(err => res.status(404).json({errors: err.errors}));
            })
            .catch(err => res.status(404).json({errors: err.errors}));
    },

    removePlayerWhite : (req, res) => {
        // Game.findOneAndUpdate({_id:req.params.gameId}, {$pull: {playerWhite: {_id: req.params.userId}}}, {runValidators:true, new:true, useFindAndModify: false})
        Game.findOneAndUpdate({_id:req.params.gameId}, {playerWhite: []}, {runValidators:true, new:true, useFindAndModify: false})
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors: err.errors}))
    },

    removePlayerBlack : (req, res) => {
        // Game.findOneAndUpdate({_id:req.params.gameId}, {$pull: {playerBlack: {_id: req.params.userId}}}, {runValidators:true, new:true, useFindAndModify: false})
        Game.findOneAndUpdate({_id:req.params.gameId}, {playerBlack: []}, {runValidators:true, new:true, useFindAndModify: false})
            .then(data => res.json({results:data}))
            .catch(err => res.status(404).json({errors: err.errors}))
    },

    destroy: (req,res) => {
        Game.deleteOne({_id:req.params.id})
            .then(data => res.redirect(303, '/api/Games'))
            .catch(err => res.status(404).json({errors: err.errors}))
    }
}