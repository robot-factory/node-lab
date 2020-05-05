import { connect } from 'react-redux';
import { setVisibilityFilter } from 'Redux/action';
import Link from './Link';
import { FILTER_METHOD } from 'Constant';
import { Store } from 'Redux/store';
import { Dispatch } from 'redux';

interface Props {
  filter: FILTER_METHOD;
  children?: React.ReactNode;
}

const mapStateToProps = (state: Store, ownProps: Props) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
