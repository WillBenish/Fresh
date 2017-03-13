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
        console.log('prayerStore deletePrayer');
        prayerService.deletePrayer(prayer).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function updatePrayer(prayer) {
        console.log('prayerStore updatePrayer');
        prayerService.updatePrayer(prayer).then(function (res) {
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
                    console.log('PrayerStore dispatch deletePrayer');
                    deletePrayer(payload.prayer);
                    break;
                case "updatePrayer":
                    console.log('PrayerStore dispatch updatePrayer');
                    updatePrayer(payload.prayer);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = PrayerStore();
