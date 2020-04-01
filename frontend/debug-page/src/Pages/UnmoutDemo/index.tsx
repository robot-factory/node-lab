import React from 'react'

interface State {
  a:number
}

class UnmountDemo extends React.Component<{},State> {
  constructor(props: any) {
    super(props)
    this.state = {
      a:1
    }
  }

  componentWillUnmount() {
    console.log('UnmountDemo will unmount')
    this.setState({a:2})
  }

  render() {
    return <div>{this.state.a}</div>
  }
}

export default UnmountDemo