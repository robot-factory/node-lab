import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
// import Hint from 'components/hint'
// import Confirm from 'components/confirm'
// import Loading from 'components/loading'
// import ImgViewer from 'components/imgViewer'

import LayoutStore from 'Stores/layout'
// todo

const Debug = lazy(() => import('Pages/Debug'))


interface Props {
  layout: LayoutStore
}

@inject('layout')
@observer
class Routes extends React.Component<Props> {
  render() {
    // const { hint, loading, confirm, imgView } = this.props.layout
    return (
      <>
        <Switch>
          <Redirect exact={true} from="/" to="/debug" />
          <Route path="/debug" component={Debug} />
        </Switch>
        {/* <Hint {...hint} />
        <Confirm {...confirm} />
        <Loading {...loading} />
        <ImgViewer {...imgView} /> */}
      </>
    )
  }
}
export default Routes