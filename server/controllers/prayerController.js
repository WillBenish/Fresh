var mongoose = require("mongoose");
var Prayer = require("../data/prayer");
var _ = require("underscore");

var router = require("express").Router();
router.route("/prayers/:id?").get(getPrayers).post(addPrayer).delete(deletePrayer);

function getPrayers(req, res) {
    Prayer.find(function (err, prayers) {
        if (err)
            res.send(err);
        else
            res.json(prayers);
    });
}

function addPrayer(req, res) {
    var prayer = new Prayer(_.extend({}, req.body));
    prayer.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(prayer);
    });
}

function deletePrayer(req, res) {
    var id = req.params.id;
    Prayer.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;