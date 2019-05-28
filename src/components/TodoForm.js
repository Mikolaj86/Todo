import React from 'react';

export const Form = props => {
    return (
        <form>
            <input name="todo" type="text" placeholder="enter the task" />
            <button>Add a task</button>
            <button>Remove task</button>
        </form>
    )
}