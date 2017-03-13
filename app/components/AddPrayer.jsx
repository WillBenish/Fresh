var React = require("react");
var actions = require("../actions/PrayerActions");

module.exports = React.createClass({
    getInitialState:function(){
      return {
          name:"",
          tagline:"tester",
          clickcount:"1",
          pace:"7"
      }  
    },
    addPrayer:function(e){
        e.preventDefault();
        actions.addPrayer(this.state);
    },
    handleInputChange:function(e){
      //e.preventDefault();
      var name = e.target.name;
      var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
    },

    render:function(){
        return(
            <form className="form" onSubmit={this.addPrayer}>
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Prayer Name" />                    
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="tagline">Tagline:</label>
                    <input type="text" className="form-control" id="tagline" name="tagline" value={this.state.tagline} onChange={this.handleInputChange} placeholder="Tagline" />                    
                </div>

                <div className="radio">
                  <label>
                    <input type="radio" name="pace" value="1" checked={this.state.pace=== '1'} 
                      onChange={this.handleInputChange}/>
                    Daily
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="pace" value="7" checked={this.state.pace=== "7"}
                      onChange={this.handleInputChange}/>
                    Weekly
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="pace" value="30" checked={this.state.pace==="30"}
                      onChange={this.handleInputChange}
                      />
                    Monthly
                  </label>
                </div>


                <br/>
                <div className="form-group">
                    <button className="btn" type="submit">Add Prayer</button>
                </div>
                
            </form>

        )
    }
})