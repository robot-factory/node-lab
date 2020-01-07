import { RelayNode } from "./relayNode";

const node1 = new RelayNode(9002);

setTimeout(() => {
  node1.sendMethdRegister(9000, "47.106.122.155");
}, 2000);

setTimeout(() => {
  node1.sendMethodGetPeers(9000, "47.106.122.155");
}, 2500);

setInterval(() => {
  node1.sendMethodPostToPeer(1, 9000, "47.106.122.155");
}, 3000);

setInterval(() => {
  node1.sendMethodPing(9000, "47.106.122.155");
}, 10000);

setInterval(() => {
  node1.sendMethodPing(9001, "113.110.200.41");
}, 10000);
