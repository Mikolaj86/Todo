import React, { Component } from 'react';
import List from './components/TodoList';
import Form from './components/TodoForm';
import Header from './components/Header';


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

    addTask = event => {
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
    }


    onDelete = (id) =>  {
        const search = this.state.todos.findIndex((element) => {
            return element.id == id
        });
        this.state.todos.splice(search, 1)
        this.setState({todos:this.state.todos})
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
        const todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.editing = !todo.editing
            }
            return todo
        });
        this.setState({
            todos : todos,
            todo: {
                changedText: this.todo.task,
            }
        })

    }
    handleEditingDone = event => {
        if (event.keyCode === 13) {
            this.setState(prevState => ({
                todo: {                   // object that we want to update
                    editing: false,       // update the value of specific key
                }
            }));
        }
    }
    handleEditingChange = event => {
        let _changedText = event.target.value;
        this.setState({
            todo: {changedText: _changedText}
        });
    }

    componentDidMount() {
        this.setState({
            todo: {changedText: this.todo.task}
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

        let todos = [];


        if (this.state.filtertodos === 'all') {
            todos = this.state.todos;
        } else if (this.state.filtertodos === 'uncomplete') {
            todos = this.state.todos.filter(todo => !todo.completed);
        } else if (this.state.filtertodos === 'complete') {
            todos = this.state.todos.filter(todo => todo.completed);
        }

        return (
            <div className="App">
                <Header />
                <List todos={todos} toggleComplete={this.toggleComplete} onDelete={this.onDelete}
                      handleEditing={this.handleEditing} handleEditingDone={this.handleEditingDone}
                      handleEditingChange={this.handleEditingChange} changedText={this.state.changedText} />
                <Form todos={this.state.todos} value={this.state.todo} inputChangeHandler={this.inputChangeHandler}
                      addTask={this.addTask} removeItems={this.removeItems} updateFilter={this.updateFilter} />
            </div>
        );
    }
}

export default App;