import React, { Component } from 'react';
import List from './components/TodoList'
import Form from './components/TodoForm'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                // task: '',
                // id: '',
                //completed: false,
            }],
            todo: ''
        }
    }
    render() {
        return (
            <div className="App">
                <h1>To Do List</h1>
                <List todos={this.state.todos}/>
                <Form todos={this.state.todos}/>
            </div>
        );
    }
}

export default App;