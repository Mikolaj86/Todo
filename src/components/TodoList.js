import React from 'react';
import Todo from 'Todo';

const List = props => {
    return (
        <div>
            {props.todos.map((todo, id) => (
                <Todo todo={todo} key={id} />
                )
            )}
        </div>
    )
}

export default List;