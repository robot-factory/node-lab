import dgram from "dgram";

enum METHOD {
  register, // return id
  postRegister,
  getPeers, // return peers array
  postToPeer,
  ping
}

interface RpcResponse {
  id: number;
  version: string;
  result: string;
}

interface RpcResquest {
  version: string;
  id: number;
  method: number;
  payload: string;
}

const EMPTY_PAYLOAD = JSON.stringify([]);

class Store {
  peerId: number;
  peers: Map<number, string> = new Map();

  constructor() {
    this.peerId = 1;
  }

  addPeer = (addressPort: string) => {
    this.peers.set(this.peerId, addressPort);
    this.peerId = this.peerId + 1;
    return this.peerId - 1;
  };

  removePeer = (peerId: number) => {
    this.peers.delete(peerId);
  };

  getPeer = (peerId: number) => {
    return this.peers.get(peerId);
  };

  getPeers = () => {
    return this.peers;
  };
}

/**
 * TODO: add readbuf && writebuf
 */
class RelayNode {
  socket: dgram.Socket;
  cbs: Map<number, (result: string) => void> = new Map();
  sendId: number;
  store: Store;
  version: string = "1.0.0";

  constructor(port: number) {
    this.socket = dgram.createSocket("udp4");
    this.socket.on("close", this.handleClose);

    this.socket.on("error", function(err: Error) {
      console.log("some error on udp client.");
    });

    this.socket.bind(port, "0.0.0.0");

    this.sendId = 1;

    this.store = new Store();
  }

  handleClose = () => {
    console.log("udp client closed.");
  };

  handleMsg = (msg: Buffer, rinfo: dgram.RemoteInfo) => {
    console.log(
      `receive message from ${rinfo.address}:${rinfo.port}：${msg.toString()}`
    );
    try {
      const request = JSON.parse(msg.toString());
      if ("result" in request && "id" in request && "version" in request) {
        this.handleResponse(request);
        return;
      }
      if (
        "version" in request &&
        "id" in request &&
        "method" in request &&
        "payload" in request
      ) {
        const res = this.handleRequest(request, rinfo);
        if (res) {
          this.send(JSON.stringify(res), rinfo.port, rinfo.address);
        }
        return;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  handleResponse = (response: RpcResponse) => {
    return;
  };

  handleRequest = (
    request: RpcResquest,
    rinfo: dgram.RemoteInfo
  ): RpcResponse | void => {
    switch (request.method) {
      case METHOD.getPeers: {
        const result = JSON.stringify([...this.store.getPeers()]);
        return this.generateResponse(request.id, result);
      }
      case METHOD.ping: {
        const result = EMPTY_PAYLOAD;
        return this.generateResponse(request.id, result);
      }
      case METHOD.register: {
        const result = JSON.stringify([
          this.store.addPeer(`${rinfo.address}:${rinfo.port}`)
        ]);
        return this.generateResponse(request.id, result);
      }
      case METHOD.postRegister: {
        const addressPort = JSON.parse(request.payload);
        this.store.addPeer(`${addressPort[0]}:${addressPort[1]}`);
        this.sendMethdRegister(Number(addressPort[1]), addressPort[0]);
        const result = EMPTY_PAYLOAD;
        return this.generateResponse(request.id, result);
      }
      case METHOD.postToPeer: {
        const targetId = Number(JSON.parse(request.payload)[0]);
        const addressPort = this.store.getPeer(targetId);
        if (addressPort) {
          const [address, port] = addressPort.split(":");
          this.sendMethodPostRegister(
            rinfo.address,
            rinfo.port,
            Number(port),
            address
          );
        }
        const result = addressPort || EMPTY_PAYLOAD;
        return this.generateResponse(request.id, result);
      }
      default: {
        return this.generateResponse(request.id, "unknown method");
      }
    }
    // return;
  };

  sendMethdRegister = (port: number, address: string) => {
    this.sendRequest(METHOD.register, EMPTY_PAYLOAD, port, address);
  };

  sendMethodPostRegister = (
    peerAddress: string,
    peerPort: number,
    port: number,
    address: string
  ) => {
    const payload = JSON.stringify([peerAddress, peerPort]);
    this.sendRequest(METHOD.postRegister, payload, port, address);
  };

  sendMethodGetPeers = (port: number, address: string) => {
    this.sendRequest(METHOD.getPeers, EMPTY_PAYLOAD, port, address);
  };

  generateResponse(id: number, result: string) {
    return {
      id,
      result,
      version: this.version
    };
  }

  sendRequest = (
    method: number,
    payload: string,
    port: number,
    address: string,
    cb?: (result: string) => void
  ) => {
    const request = {
      method,
      payload,
      id: this.sendId,
      version: this.version
    };
    this.send(JSON.stringify(request), port, address);
    this.sendId = this.sendId + 1;
    if (cb) {
      this.cbs.set(request.id, cb);
    }
  };

  send = (msg: string, port: number, address: string) => {
    this.socket.send(msg, port, address);
  };
}
