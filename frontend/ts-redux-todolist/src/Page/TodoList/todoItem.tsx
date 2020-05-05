import React from 'react';

interface Props {
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  completed: boolean;
  text: string;
}

const Todo: React.FC<Props> = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
);

export default Todo;
