import { combineReducers } from 'redux';
import todos, { TodoStore } from './todos';
import visibilityFilter, { VisibilityFilterStore } from './filter';

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

export interface RootStore {
  todos: TodoStore;
  visibilityFilter: VisibilityFilterStore;
}

export default rootReducer;
