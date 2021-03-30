const Game = require("../models/game.model");


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
    destroy: (req,res) => {
        Game.deleteOne({_id:req.params.id})
            .then(data => res.redirect(303, '/api/Games'))
            .catch(err => res.status(404).json({errors: err.errors}))
    }
}