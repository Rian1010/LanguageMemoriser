class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        vocabList: [],
        activeItem: {
          id: null, 
          word: '',
          definition: '',
        }, 
        editing: false,
      }
      this.fetchWords = this.fetchWords.bind(this);
  
      this.handleChangeWord = this.handleChangeWord.bind(this);
      this.handleChangeDefinition = this.handleChangeDefinition.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
      this.getCookie = this.getCookie.bind(this);
  
      this.editingMode = this.editingMode.bind(this);
      this.deleteWord = this.deleteWord.bind(this);
    }
  
     getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  
    componentDidMount() {
      this.fetchWords();
    }
  
    fetchWords() {
      console.log("fetching...")
      fetch('http://127.0.0.1:8000/api/user-word-list/', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(response => response.json())
      .then(data => 
        this.setState({
          vocabList: data
        })  
      )
    }
  
    handleChangeWord(e) {
      let name = e.target.name
      let value = e.target.value
      console.log("Name", name)
      console.log("Value", value)
  
      this.setState({
        activeItem: {
          ...this.state.activeItem,
          word: value
        }
      })
    }
  
    handleChangeDefinition(e) {
      let name = e.target.name
      let value = e.target.value
      console.log("NAME DEF", name);
      console.log("VALUE DEF", value);
  
      this.setState({
        activeItem: {
          ...this.state.activeItem,
          definition: value
        }
      })
    }
  
    handleSubmit(e) {
      e.preventDefault();
      console.log("ITEM", this.state.activeItem);
  
      let csrftoken = this.getCookie('csrftoken');
  
  
      let url = "http://127.0.0.1:8000/api/user-word-create/";
  
      if(this.state.editing) {
        url = `http://127.0.0.1:8000/api/user-word-update/${ this.state.activeItem.id }/`;
        this.setState({
          editing: false
        })
      }
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(this.state.activeItem)
      })
      .then((response) => {
        this.fetchWords();
        this.setState({
          activeItem: {
            id: null, 
            word: '',
            definition: '',
          }
        })
      })
      .catch(function(error) {
        console.log('ERROR:', error)
      })
    }
  
    editingMode(item) {
      this.setState({
        activeItem: item,
        editing: true
      });
    }
  
    deleteWord(item) {
      let csrftoken = this.getCookie('csrftoken');
      
      fetch(`http://127.0.0.1:8000/api/user-word-delete/${ item.id }/`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
      }).then(response => this.fetchWords()) 
    }
  
    render () {
      let vocab = this.state.vocabList;
      let self = this
      return(
        <div>
        <Navbar />
        <div className="container my-5">
          <div className="row">
            <div className="col text-center">
              <h1>Korean Vocabulary List</h1>
            </div>
          </div>
          <form className="p-3 my-5 border" onSubmit={(event) => this.handleSubmit(event)} style={{backgroundColor: 'skyblue'}}>
            {/* <div className="flex-group"> */}
              <div className="list-container row">
                <div className="col-5">
                  <input onChange={(e) => this.handleChangeWord(e)} className="form-control" id="word" type="text" name="word" placeholder="Enter a word" value={this.state.activeItem.word || ""} required />
                </div>
                <div className="col-5">
                  <input onChange={(e) => this.handleChangeDefinition(e)} className="form-control" id="definition" type="text" name="definition" placeholder="Enter the definition" value={this.state.activeItem.definition || ""} required />
                </div>  
                <div className="col-2">
                  <input className="btn btn-warning" id="submit" type="submit" name="Add New Word" value="Add New Word" />
                </div>  
              </div>
            {/* </div> */}
          </form>
  
          {vocab.map((item, index) => {
            return(
              <div className="row py-3 border">
                <div className="col-5">
                  <div key={index} className="text-center">
                    <span>{ item.word }</span>
                  </div>
                </div>
                <div className="col-5">
                  <div key={index} className="text-center">
                    <span>{item.definition}</span>
                  </div>
                </div>
                <div className="col-1">
                  <button className="btn btn-primary" onClick={() => self.editingMode(item)} type="submit"><i class="fa fa-edit"></i></button>
                </div> 
                <div className="col-1">
                  <button className="btn btn-danger" onClick={() => self.deleteWord(item)} type="submit"><i class="fa fa-trash"></i></button>
                </div> 
              </div>
            )
          })}
            
        </div>
        </div>
      );
    }
  }
  
  export default App;
  