import React from 'react';
import {
  RouteComponentProps,
  Link,
  Switch,
  Route
} from 'react-router-dom';

import UserItem from './UserItem'

const User: React.FC<RouteComponentProps> = ({ match: { url, path } }) => {
  console.log('render user');
  return (
    <div>
      <nav>
        <ul>
          <Link to={url + '/1'}>user 1</Link>
        </ul>
        <ul>
          <Link to={url + '/2'}>user 2</Link>
        </ul>
        <ul>
          <Link to={url + '/3'}>user 3</Link>
        </ul>
      </nav>
      <Switch>
        <Route path={path + '/:id'} component={UserItem} />
      </Switch>
    </div>
  );
};

export default User