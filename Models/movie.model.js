
const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean,

})
const Moviemodel = mongoose.model("dummies", movieSchema)

module.exports = { Moviemodel };



