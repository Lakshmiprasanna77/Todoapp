import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      inputVaue: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/todolist").then((res) => {
      let data = res.data;
      let todoList = [...this.state.todoList];
      for (let i = 0; i < data.length; i++) {
        todoList[i] = {};
        todoList[i].text = data[i].text;
        todoList[i].id = i;
      }
      this.setState({ todoList });
    });
  }
  InputChange = (text) => {
    this.setState({ inputVaue: text });
  };
  TodoItemInsertion = () => {
    if (this.state.inputVaue !== "") {
      axios
        .post("http://localhost:5000/insert", { text: this.state.inputVaue })
        .then(() => {
          let todoList = { ...this.state.todoList, text: this.state.inputVaue };
          this.setState({ inputVaue: "" });
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 className="display-4 text-center py-1">To-Do App</h1>

          <div className="jumbotron p-3 shadow-sm">
            <form>
              <div className="d-flex align-items-center">
                <input
                  autoFocus
                  autoComplete="off"
                  className="form-control mr-3"
                  type="text"
                  style={{ flex: "1" }}
                  placeholder="enter text"
                  value={this.state.inputVaue}
                  onChange={(e) => {
                    console.log(e.target);
                    this.InputChange(e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    this.TodoItemInsertion();
                  }}
                  className="btn btn-primary"
                >
                  Add New Item
                </button>
              </div>
            </form>
          </div>
          <ul className="list-group pb-5">
            {this.state.todoList.map((item) => {
              return (
                <li
                  key={item.id}
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                >
                  <span className="item-text">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
