import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import TodoList from 'Page/TodoList';

import store from 'Redux/store';

function App() {
  console.log('render App');
  return (
    <Provider store={store}>
      <Router>
        <TodoList />
      </Router>
    </Provider>
    // <Router>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/user">User</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>
    //       <li>
    //         <Link to="/todo">Todo</Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <Switch>
    //     <Route path="/" exact>
    //       <Home />
    //     </Route>
    //     <Route path="/user" component={User} />
    //     <Route path="/about">
    //       <About />
    //     </Route>
    //     <Route path="/todo" component={TodoList} />
    //   </Switch>
    // </Router>
  );
}

export default App;
