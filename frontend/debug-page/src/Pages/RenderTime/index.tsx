import React from 'react'

interface StateItr {
  count: number
}

class RenderTime extends React.Component<{},StateItr> {
  constructor(props: any) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleAdd = () => {
    this.setState((prev)=>({count: prev.count+1}))
    this.setState((prev)=>({count: prev.count+1}))
    this.setState((prev)=>({count: prev.count+1}))
  }

  render() {
    console.log(Date.now())
    return (
      <>
      <p>{this.state.count}</p>
        <button onClick={this.handleAdd}>update</button>
      </>
    )
  }
}

export default RenderTime