import React from 'react';
import List from "./TodoList";

const Form = props => {
    return (
        <form>
            <input name="todo"
                   type="text"
                   placeholder="enter the task"
                   value={props.value}
                   onChange={props.inputChangeHandler} />
            <button onClick={props.addTask}>Add a task</button>
            <button onClick={props.removeItems}>Remove completed</button>
        </form>
    )
}

export default Form;
