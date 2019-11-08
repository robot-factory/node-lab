const net = require('net')

const socket = new net.Socket()

socket.connect({
  path: '/home/liuboheng/tmp/dipperin_apps/venus/wallet/dipperin.ipc'
}, () => {
  console.log('connected')
  const testRpc = {
    id: 1,
    jsonrpc: '2.0',
    method: 'dipperin_currentBalance',
    params: ['0x0000fA5e0e6D1548CfAdB2A4AAC8d73ceF3A64C69be7']
  }
  socket.on('data', (data) => {
    console.log(data.toString())
  })
  socket.write(JSON.stringify(testRpc))
})