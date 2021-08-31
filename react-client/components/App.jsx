import React from 'react';
import axios from 'axios';
//if App had children, this is where you would import them

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuote: '',
      value: ''
      // submittedQuote: false
    }
    this.onChange = this.onChange.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //bind happens because this is a class, attach methods to a particular instance of that class
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    axios.get('http://127.0.0.1:3001/quote/')
      .then(response => {
        // console.log('response received');
        this.setState({
          currentQuote: response.data //<whatever you've named it>.data
        });
      })
      .catch(err => {
        console.info('there was an error retrieving the quote');
      });
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
    // event.preventDefault(); //only need if you are passing in an event
    axios.post('http://127.0.0.1:3001/quote/', {quote: this.state.value})
    //in axios has to be an object with a key/value pair
      .then(response => {
        console.info('post successful');
        //change submittedquote to true
        //something will render on the p id element
      })
      .catch(err => {
        console.info('there was an error posting your quote');
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Kristin's Random Quote Generator</h1>
        <h2 id="quote">{this.state.currentQuote}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.onChange}></input>
          <button id="submit">Submit</button>
          <p id="response"></p>
        </form>
      </React.Fragment>
    )
  }
}

export default App;
