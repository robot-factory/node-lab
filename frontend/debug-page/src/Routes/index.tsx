import React, { lazy } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
// import Hint from 'components/hint'
// import Confirm from 'components/confirm'
// import Loading from 'components/loading'
// import ImgViewer from 'components/imgViewer'

import LayoutStore from 'Stores/layout'
import styles from './index.module.scss'
// todo

const Debug = lazy(() => import('Pages/Debug'))
const Home = lazy(()=> import('Pages/Home'))
const UnmountDemo = lazy(()=>import('Pages/UnmoutDemo'))


interface Props {
  layout: LayoutStore
}

@inject('layout')
@observer
class Routes extends React.Component<Props> {
  render() {
    // const { hint, loading, confirm, imgView } = this.props.layout
    return (
      <div className={styles.main}>
        <div className={styles.leftBar}>
          <Link to={'/home'}>home</Link>
          <Link to={'/debug'}>debug</Link>
          <Link to={'/unmountDemo'}>unmountDemo</Link>
        </div>
        <div className={styles.rightMain}>
        <Switch>
          <Redirect exact={true} from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/debug" component={Debug} />
          <Route path="/unmountDemo" component={UnmountDemo} />
        </Switch>
        </div>
        {/* <Hint {...hint} />
        <Confirm {...confirm} />
        <Loading {...loading} />
        <ImgViewer {...imgView} /> */}
      </div>
    )
  }
}
export default Routes