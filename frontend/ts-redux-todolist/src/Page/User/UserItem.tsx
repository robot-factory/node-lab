import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const UserItem: React.FC<RouteComponentProps<{id: string}>> = ({ match }) => {
  console.log('render userItem');
  // console.log('userItem match', match)
  return <div>user id is {match.params.id}</div>;
};

export default UserItem;