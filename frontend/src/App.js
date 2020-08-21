import React from "react";
// import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false,
      },
      editing: false
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  componentWillMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/task-list/')
      .then(response => response.json())
      .then(data =>
        this.setState({
          todoList: data
        })
      )
  }

  handleChange(e) {
    var name = e.target.name
    var value = e.target.value
    console.log(name)
    console.log(value)

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value
      }
    })

  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.activeItem)
    var url = 'http://127.0.0.1:8000/api/task-create/'
    
    fetch(url , {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((res) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
        id: null,
        title: '',
        completed: false,
      },
      })
    }).catch((err) => console.log("Error: ", err))

}




  render() {
      var tasks = this.state.todoList
    return(
      <>
    <div>
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.activeItem.title} type="text" placeholder="Todo" name="title" />
        <input type="submit" value="add-todo" />
      </form>
    </div>
    <div>
      {tasks.map(function(task, index) {
        return (
          <div key={index}>
            <div>
              <span>{task.title}</span>
              <button>Add</button>
              <button>Edit</button>

            </div>

          </div>
        )
      })}
    </div>

      </>
    )
  }

}

export default App;
