import React from 'react';
import { TodoIntf } from 'Redux/interface';
import Todo from './todoItem';

interface Props {
  todos: TodoIntf[];
  onTodoClick: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

export default TodoList;
