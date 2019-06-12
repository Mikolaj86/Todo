import React from 'react';

const Todo = props => {
    return (
        <div style={{ display: "flex"}}>
            <p key={props.todo.id}
               onClick={event => {
                   props.toggleComplete(props.todo.id)
               }}>{props.todo.task}{props.todo.completed && ' Completed'}</p>
            <button onClick={event => {props.onDelete(props.todo.id)}}>x</button>
        </div>
    )
}

export default Todo;
