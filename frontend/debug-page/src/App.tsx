import React, { Suspense } from 'react'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import RootStore from 'Stores/root'
import { Route, Router } from 'react-router-dom'
import Routes from 'Routes'
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)
const rootStore = new RootStore()

class App extends React.Component {
  public render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Provider {...rootStore}>
          <Router history={history}>
            <Route component={Routes} />
          </Router>
        </Provider>
      </Suspense>
    )
  }
}

export default App
