const mongoose = require('mongoose'),
    db = "chessDB";

mongoose.connect(`mongodb://localhost/${db}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log("You are now in the mainframe."))
    .catch(err => console.log("Melting down now...", err))