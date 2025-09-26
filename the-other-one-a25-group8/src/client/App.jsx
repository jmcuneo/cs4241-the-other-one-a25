import React from "react"

class Hurricane extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <tbody>{this.props.name} : 
      <tr name={this.props.Name} year={this.props.year} windspeed={this.props.windspeed} airpressure={this.props.airpressure} />
    </tbody>
  }
  // call this method when the checkbox for this component is clicked
  // change(e) {
  //   this.props.onclick( this.props.name, e.target.checked )
  // }
}

class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { appdata:[] }
    this.load()
  }

  // load in our data from the server
  load() {
    fetch( '/read', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
         this.setState({ appdata:json }) 
      })
  }


  render() {
    return (
      <div>
      <form>
        <input type="text" id="stormname" placeholder="Storm name here"></input>
        <input type="text" id="year" placeholder="Year here"></input>
        <input type="text" id="windspeed" placeholder="Wind speed here (mph)"></input>
        <input type="text" id="airpressure" placeholder="Air pressure here (mbar)"></input>
        <button className="changer" >submit</button>
        <button id="delete" className="changer">delete</button>
      </form>
      <table id="dataset">
          <tbody>
          { this.state.appdata.map( (appdata, i) => <Hurricane key={i} Name={Hurricane.Name} Year={Hurricane.Year} Windspeed={Hurricane.Windspeed} Airpressure={Hurricane.Airpressure} /> ) }
          </tbody>
      </table>
      </div>
    )
  }
}

export default App