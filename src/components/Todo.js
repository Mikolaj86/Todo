import React from 'react';

const Todo = props => {
    return (
        <div style={{ display: "flex"}}>
            <p key={props.todo.id}
               onClick={event => {
                   props.toggleComplete(props.todo.id)
               }}>{props.todo.task}{props.todo.completed && ' Completed'}</p> <button onClick={props.onDelete}>x</button>
        </div>
    )
}

export default Todo;