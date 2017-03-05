var dispatcher = require("../dispatcher");
var prayerService = require("../services/prayerService");

function PrayerStore() {
    var listeners = [];

    function onChange(listener) {
        getPrayers(listener);
        listeners.push(listener);
    }
    
    function getPrayers(cb){
        prayerService.getPrayers().then(function (res) {
            cb(res);
        });
    }

    function addPrayer(prayer) {
        prayerService.addPrayer(prayer).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deletePrayer(prayer) {
        prayerService.deletePrayer(prayer).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners() {
        getPrayers(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "prayer") {
            switch (split[1]) {
                case "addPrayer":
                    addPrayer(payload.prayer);
                    break;
                case "deletePrayer":
                    deletePrayer(payload.prayer);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = PrayerStore();
