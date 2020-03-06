import React from 'react'
import styles from './styles.module.scss'
import {observer} from 'mobx-react'
import { Link } from 'react-router-dom'

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.content}>
        <div className={styles.left}>
          <span>Logo</span>
        </div>
        <div className={styles.right}>
          <Link to="/home">首页</Link>
          <Link to="/realtimedata">实时数据</Link>
          <Link to="/checktool">在线查验</Link>
        </div>
      </div>
    </div>
  )
}

export default observer(TopBar)
