import { RelayNode } from './relayNode'

const node1 = new RelayNode(9001);

setTimeout(() => {
  node1.sendMethdRegister(9000,'localhost')
}, 2000);
