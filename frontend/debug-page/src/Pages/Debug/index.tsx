import React from 'react'
import { getRequest } from 'Service/http'
import {Input, Button} from 'antd'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

@observer
class Debug extends React.Component {
  @observable
  getUrl: string = ''
  @observable result: string[] = []

  @action
  handleChangeGetUrl = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.getUrl = e.target.value
  }

  handleGet = async () => {
    console.log(this.getUrl)
    const res = await getRequest(this.getUrl)
    console.log(res)
    this.result.push(res as any as string)
  }

  render() {
    return (
      <div>
        <h1>Debug</h1>
        <div><Input style={{width:300}} onChange={this.handleChangeGetUrl} value={this.getUrl}/><Button type={'primary'} onClick={this.handleGet}>Get</Button></div>
        {this.result.map((res) => (<p>{res}</p>))}
      </div>
    )
  }
}

export default Debug