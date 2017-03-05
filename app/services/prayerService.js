var $ = require("jquery");
var promise = require("es6-promise");
var resourceUrl = "http://localhost:7777/api/prayers";

module.exports = {
    addPrayer: function (prayer) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                data: JSON.stringify(prayer),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    getPrayers: function () {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    },
    deletePrayer: function (prayers) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/" + prayer._id,
                method: "DELETE",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    }
}