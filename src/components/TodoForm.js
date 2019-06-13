import React from 'react';
import List from "./TodoList";

const Form = props => {
    return (
        <div>
        <form>

            <input name="todo"
                   type="text"
                   placeholder="enter the task"
                   value={props.value}
                   onChange={props.inputChangeHandler} />
            <button onClick={props.addTask}>Add a task</button>
            <button onClick={props.removeItems}>Remove completed</button>
        </form>
            <button onClick={() => props.updateFilter("all")}>All</button>
            <button onClick={() => props.updateFilter("uncomplete")}>Uncomplete</button>
            <button onClick={() => props.updateFilter("complete")}>Complete</button>
        </div>
    )
}

export default Form;
