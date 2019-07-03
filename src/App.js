import React, { Component } from 'react';
import List from './components/TodoList';
import Form from './components/TodoForm';
import Header from './components/Header';
import Axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // task: '',
                // id: '',
                //completed: false,
                // all of our to-dos
            ],
            todo: '',
            // an empty string to hold an individual to-do
            filtertodos: []
        }
    }



       inputChangeHandler = event => {
           this.setState({[event.target.name]: event.target.value})
       }

       addTask = async (event) => {
           event.preventDefault();
           let newTask = {
               task: this.state.todo,
               id: Date.now(),
               completed: false,
               editing: false
           };
           this.setState({
               todos: [...this.state.todos, newTask],
               todo: ''
           })
           const {data} = await Axios.post('http://localhost:8000/todoes_create/', newTask)
       }



           onDelete = async (id) =>  {
               const search = this.state.todos.findIndex((element) => {
                   return element.id == id
               });
               this.state.todos.splice(search, 1)
               this.setState({todos:this.state.todos})
           await Axios.delete(`http://localhost:8000/todoes_destroy/${id}/`)
           }


           toggleComplete = itemId => {
               const todos = this.state.todos.map(todo => {
                   if (todo.id === itemId) {
                       todo.completed = !todo.completed
                   }
                   return todo
               });
               this.setState({todos, todo: ''})
           }
           removeItems = event => {
               event.preventDefault();
               this.setState(prevState => {
                   return {
                       todos: prevState.todos.filter(todo => {
                           return !todo.completed;
                       })
                   }
               })
           }

           updateFilter = st => {
               this.setState({filtertodos: st})
           }

           handleEditing = (id) => {
               let task = '';

               const todos = this.state.todos.map(todo => {
                   if (todo.id === id) {
                       todo.editing = !todo.editing
                       task = todo.task
                   }
                   return todo
               });
               console.log("editing ", task)
               this.setState({
                   todos : todos,
                    todo: {
                      changedText: task,
                    }
               })

           }

           handleEditingDone = async (event, id) => {
               console.log('editing done')
               console.log(id)
               if(event.keyCode === 13) {
                   const todos = this.state.todos.map(todo => {
                       if (todo.id === id) {
                           todo.task = this.state.todo.changedText
                           todo.editing = false
                       }
                       return todo;
                   })
                   console.log(todos)
                   this.setState( {
                        todos
                   })
               }
               //const {data} = await Axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, todo)

           }

           handleEditingChange = event => {
               let _changedText = event.target.value;
               this.setState({
                   todo: {changedText: _changedText}
               });
           }

           async componentDidMount() {
                const {data} = await Axios.get('http://127.0.0.1:8000/todoes_read/', {
                })
                this.setState({todos : data})
           }


    /*
           saveLocalStorage() {

               for (let key in this.state) {
                   localStorage.setItem(key, JSON.stringify(this.state[key]))
               }
           }

           getFromLocalStorage() {

               for (let key in this.state) {
                   if (localStorage.hasOwnProperty(key)) {
                       let value = localStorage.getItem(key);
                       // console.log(value)
                       try {
                           value = JSON.parse(value);
                           this.setState({[key]: value})
                       }
                       catch(event) {
                           this.setState({[key]: value})
                       }
                   }
               }
           }

           componentDidMount() {
               this.getFromLocalStorage();
               window.addEventListener(
                   "beforeunload",

                   this.saveLocalStorage.bind(this)
               )
           }

           // componentWillMount() {
           //     window.removeEventListener(
           //         "beforeunload",
           //         this.saveLocalStorage.bind(this)
           //     )
           // }
    */
    render() {

        let todos = [];

        if (this.state.filtertodos === 'all') {
            todos = this.state.todos;
        } else if (this.state.filtertodos === 'uncomplete') {
            todos = this.state.todos.filter(todo => !todo.completed);
        } else if (this.state.filtertodos === 'complete') {
            todos = this.state.todos.filter(todo => todo.completed);
        }
        // console.log(todos)
        // console.log(this.state)
        // debugger
        return (
            <div className="App">
                <Header />
                <List todos={todos} toggleComplete={this.toggleComplete} onDelete={this.onDelete}
                      handleEditing={this.handleEditing} handleEditingDone={this.handleEditingDone}
                      handleEditingChange={this.handleEditingChange} changedText={this.state.todo.changedText} />
                <Form todos={this.state.todos} value={this.state.todo} inputChangeHandler={this.inputChangeHandler}
                      addTask={this.addTask} removeItems={this.removeItems} updateFilter={this.updateFilter} />
            </div>
        );
    }
}

export default App;