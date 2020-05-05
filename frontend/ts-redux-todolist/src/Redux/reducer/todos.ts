import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  TOGGLE_TODO,
} from 'Redux/action/ActionTypes';

import { ActionIntf, TodoIntf } from 'Redux/interface';

export type TodoStore = TodoIntf[];

const initialState: TodoStore = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
  },
];

export default function todos(
  state = initialState,
  action: ActionIntf
): TodoStore {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.length,
          completed: false,
          text: action.text as string,
        },
      ];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text as string } : todo
      );

    case COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every((todo) => todo.completed);
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }));

    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false);

    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return {
            ...todo,
          };
        }
      });
    default:
      return state;
  }
}
