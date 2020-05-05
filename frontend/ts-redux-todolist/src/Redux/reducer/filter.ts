import { SET_VISIBILITY_FILTER } from 'Redux/action/ActionTypes';
import { FILTER_METHOD } from 'Constant';
import { ActionIntf } from 'Redux/interface';

export type VisibilityFilterStore = FILTER_METHOD;

const visibilityFilter = (
  state = FILTER_METHOD.SHOW_ALL,
  action: ActionIntf
) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
};

export default visibilityFilter;
