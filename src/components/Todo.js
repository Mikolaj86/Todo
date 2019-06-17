import React from 'react';

const Todo = props => {
        return (
            <div style={{display: "flex"}}>
                {props.todo.editing ? (
                    <input onKeyDown={event => props.handleEditingDone} onChange={event => props.handleEditingChange}
                            type="text" value={props.changedText}/> )
                    :
                    (<p key={props.todo.id}
                       onClick={event => {
                           props.toggleComplete(props.todo.id)
                       }} >{props.todo.changedText}{props.todo.completed && ' Completed'}</p>)
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
