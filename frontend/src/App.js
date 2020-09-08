import React from 'react';
import './App.css';

class App extends React.Component {
  render () {
    return(
      <div className="container my-5">
        <form>
          {/* <div className="flex-group"> */}
            <div className="list-container form-row">
              <div className="col-5">
                <input className="form-control" id="word" type="text" name="word" placeholder="Enter a word" />
              </div>
              <div className="col-5">
                <input className="form-control" id="definition" type="text" name="definition" placeholder="Enter the definition" />
              </div>  
              <div className="col-2">
                <input className="btn btn-warning" id="submit" type="submit" name="Add New Word" value="Add New Word" />
              </div>  
            </div>
          {/* </div> */}
        </form>
      </div>
    );
  }
}

export default App;
