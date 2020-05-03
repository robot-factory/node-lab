import React from 'react'

class TodoInput extends React.Component {
    state={
        todo: '',
    }

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({todo: e.target.value});
    }

    render() {
        console.log('render TodoInput');
        return (
            <div>
                <input value={this.state.todo} onChange={this.handleInput} />
            </div>
        )
    }
}

export default TodoInput