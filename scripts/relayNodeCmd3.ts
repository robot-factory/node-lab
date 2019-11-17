import { RelayNode } from './relayNode'

const node1 = new RelayNode(9002);

// setTimeout(() => {
//   node1.sendMethdRegister(9000,'localhost')
// }, 2000);

// setTimeout(() => {
//   node1.sendMethodGetPeers(9000,'localhost')
// }, 3000);

setTimeout(()=>{
  node1.sendMethodPostToPeer(1,9000,'localhost')
  
},2000)

// setTimeout(()=>{

// })