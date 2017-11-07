var React = require("react");
var PrayerInfo = require("./PrayerInfo.jsx")
var AddPrayer = require("./AddPrayer.jsx");

module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
                <div className="col-md-6">
                    <AddPrayer />
                    
                </div>
                <div className="col-md-6">
                    {
                        this.props.prayers.map(function(s,index){
                            return(
                                <PrayerInfo info={s} key={"prayer"+index} />
                            )         
                        })
                    }
                </div>
           </div>
       )
   } 
});

export default class PrayersList extends React.Component {
  constructor(props) {
    this.super();

    this.state = {
      prayers: [],
    };
  }

  render() {
    <h2>{this.state.prayers[0]}</h2>
  }
}

function blah() {
  const someArray = ['a', 'thing'];
}
////////////////////
var x;
function doBadStuff(){...}
var y;

x = 1;



const x = 1;

for(x; x < 10; x++) {
  y = x;
  doBadStuff();
}
myfunct(xcy)
const myfunct = function doBadStuff(thing) {
  while(1) {
    var z = 'suck it';
    let aa = 'nope';
    console.log('lol');
  }
}

console.log(z);
console.log(aa);
let y;