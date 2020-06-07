import React, {Component} from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import { AddTodo } from './components/AddTodo';
import {v4 as uuid} from 'uuid'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import About from './components/pages/About';
import axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  getTodos = async ()=>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3');
    this.setState({todos: res.data})
  }

  componentDidMount(){
    this.getTodos();
  }


  addTodo = (title)=>{
    const newTodo= {
      id:uuid(),
      title:title,
      completed:false
    }


    this.setState({todos: [...this.state.todos,newTodo]});
  } 

  delTodo = (id) =>{
    console.log(`hello mr ${id}`);
    this.setState({ todos: [...this.state.todos.filter((todo) => todo.id!== id )]})
  }


  markCompleted = (id) =>{
    this.setState({todos:this.state.todos.map((todo) => {
        if (todo.id === id){
          todo.completed = !todo.completed
        }
        return todo
      }
      )
    }
  );
  }

  render(){
    return (
      <Router>
          <div className="App">
            <Header/>
            <Route exact path="/"  render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markCompleted={this.markCompleted} delTodo={this.delTodo}/>
              </React.Fragment>
            )}/>

            <Route path="/about"  component={About}/>
          
          </div>

      </Router>
    );
  }
}

export default App;
