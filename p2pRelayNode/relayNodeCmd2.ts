import { RelayNode } from './relayNode'

const node1 = new RelayNode(9001);

// setTimeout(() => {
//   node1.sendMethdRegister(9000,'47.106.122.155')
// }, 2000);

setInterval(()=>{
  node1.sendMethodPing(9000,'47.106.122.155')
},10000)

setInterval(()=>{
  node1.sendMethodPing(9002,'116.30.197.144')
},10000)