import { connect } from 'react-redux';
import { toggleTodo } from 'Redux/action';
import TodoList from './todoList';
import { TodoIntf } from 'Redux/interface';
import { FILTER_METHOD } from 'Constant';
import { Store } from 'Redux/store';
import { Dispatch } from 'redux';

const getVisibleTodos = (todos: TodoIntf[], filter: FILTER_METHOD) => {
  switch (filter) {
    case FILTER_METHOD.SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case FILTER_METHOD.SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    case FILTER_METHOD.SHOW_ALL:
    default:
      return todos;
  }
};

const mapStateToProps = (state: Store) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTodoClick: (id: number) => {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
