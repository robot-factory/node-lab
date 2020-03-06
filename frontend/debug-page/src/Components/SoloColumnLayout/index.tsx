import React from 'react'

interface Props {
  header: React.ReactNode
  footer: React.ReactNode
}

const cssStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
  },
  main: {
    width: '100%',
    flexGrow: 1,
  },
  footer: {
    width: '100%',
  },
}

class SoloColumnLayout extends React.PureComponent<Props> {
  render() {
    return (
      <div style={cssStyles.container as React.CSSProperties}>
        <div style={cssStyles.header as React.CSSProperties}>{this.props.header}</div>
        <div style={cssStyles.main as React.CSSProperties}>{this.props.children}</div>
        <div style={cssStyles.footer as React.CSSProperties}>{this.props.footer}</div>
      </div>
    )
  }
}

export default SoloColumnLayout
