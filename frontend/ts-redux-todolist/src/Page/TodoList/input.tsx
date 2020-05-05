import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from 'Redux/action';
import { Dispatch } from 'redux';

let TodoInput: React.FC<{ dispatch: Dispatch }> = ({ dispatch }) => {
  const [todoText, setTodoText] = React.useState('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!todoText.trim()) {
            return;
          }
          dispatch(addTodo(todoText));
          setTodoText('');
        }}
      >
        <input
          value={todoText}
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(TodoInput);
