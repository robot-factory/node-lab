import * as types from './ActionTypes';
import { FILTER_METHOD } from 'Constant';

export const addTodo = (text: string) => ({ type: types.ADD_TODO, text });
export const deleteTodo = (id: number) => ({ type: types.DELETE_TODO, id });
export const editTodo = (id: number, text: string) => ({
  type: types.EDIT_TODO,
  id,
  text,
});
export const completeTodo = (id: number) => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const setVisibilityFilter = (filter: FILTER_METHOD) => ({
  type: types.SET_VISIBILITY_FILTER,
  filter,
});
export const toggleTodo = (id: number) => {
  return {
    type: types.TOGGLE_TODO,
    id,
  };
};
