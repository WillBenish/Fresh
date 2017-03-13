//main.jsx
var React = require("react");
var ReactDOM = require("react-dom");
var PrayersList = require("./components/PrayersList.jsx");
var prayersStore = require("./stores/prayersStore");
var _prayers = [];
var getPrayersCallback = function(prayers){
    _prayers = prayers;
    render();
};
prayersStore.onChange(getPrayersCallback);

function render(){
    ReactDOM.render(<PrayersList prayers={_prayers} />, document.getElementById("container"));    
}
