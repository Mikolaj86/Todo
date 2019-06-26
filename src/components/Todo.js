import React from 'react';

const Todo = props => {
     // console.log(props)
        return (
            <div style={{display: "flex"}}>
                {props.todo.editing ? (
                    <input onKeyDown={event => props.handleEditingDone(event, props.todo.id)} onChange={event => props.handleEditingChange(event)}
                            type="text" value={props.changedText}/> )
                    :
                    (<p key={props.todo.id}
                       onClick={event => {
                           props.toggleComplete(props.todo.id)
                       }} >{props.todo.task}{props.todo.completed && ' Completed'}</p>)
                }
                <button onClick={event => props.handleEditing(props.todo.id)}>EDIT</button>
                <button onClick={event => {
                    props.onDelete(props.todo.id)
                }}>x
                </button>

            </div>
        )
    }

export default Todo;
