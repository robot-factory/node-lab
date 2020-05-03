import React from 'react'

import TodoInput from './input'

class TodoList extends React.Component<{},{}> {
    render() {
        console.log('render todolist')
        return (
            <div>
                <TodoInput />
                <div>todos</div>
                <div>button box</div>
            </div>
        )
    }
}

export default TodoList