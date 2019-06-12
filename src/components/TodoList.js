import React from 'react';
import Todo from './Todo';

const List = props => {
    return (
        <div>
            {props.todos.map((todo, id) => (
                <Todo todo={todo} key={id} toggleComplete={props.toggleComplete} onDelete={props.onDelete} />
                )
            )}
        </div>
    )
}

export default List;