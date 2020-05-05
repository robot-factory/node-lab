import React from 'react';

import TodoInput from './input';
import VisibleTodoList from './todos';
import Footer from './Footer';

class TodoList extends React.Component {
  render() {
    console.log('render todolist');
    return (
      <div>
        <TodoInput />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}

export default TodoList;
