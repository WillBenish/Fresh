var mongoose = require("mongoose");
var prayerSchema = mongoose.Schema({
    name: String,
    tagline: String
});

module.exports = mongoose.model("prayer", prayerSchema);