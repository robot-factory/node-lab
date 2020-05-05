import React from 'react';
import FilterLink from './FilterLink';
import { FILTER_METHOD } from 'Constant';

const Footer = () => (
  <p>
    Show: <FilterLink filter={FILTER_METHOD.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={FILTER_METHOD.SHOW_ACTIVE}>Active</FilterLink>
    {', '}
    <FilterLink filter={FILTER_METHOD.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default Footer;
