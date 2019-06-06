import React, { Component } from 'react';
import List from './components/TodoList'
import Form from './components/TodoForm'


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
            todo: ''
            // an empty string to hold an individual to-do
        }
    }



    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    addTask = event => {
        event.preventDefault();
        let newTask = {
            task: this.state.todo,
            id: Date.now(),
            completed: false
        };
        this.setState({
            todos: [...this.state.todos, newTask],
            todo: ''
        })
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

    saveLocalStorage() {
        for (let key in this.state) {
            localStorage.setItem(key, JSON.stringify(this.state[key]))
        }
    }

    addLocalStorage() {
        for (let key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
                let value = localStorage.getItem(key);
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
        this.addLocalStorage();
        window.addEventListener(
            "beforeunload",
            this.saveLocalStorage.bind(this)
        )
    }

    componentWillMount() {
        window.removeEventListener(
            "beforeunload",
            this.saveLocalStorage.bind(this)
        )
    }


    render() {
        return (
            <div className="App">
                <h1>To Do List</h1>
                <List todos={this.state.todos} toggleComplete={this.toggleComplete} />
                <Form todos={this.state.todos} value={this.state.todo} inputChangeHandler={this.inputChangeHandler}
                      addTask={this.addTask} romoveItems={this.removeItems}/>
            </div>
        );
    }
}

export default App;