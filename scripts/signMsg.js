const hashMessage = function (data) {
  var message = data;
  var messageBuffer = Buffer.from(message);
  // const preamble = `\x19Dipperin Signed Message:\n${message.length}`
  // const preambleBuffer = Buffer.from(preamble)
  // const ethMessage = Buffer.concat([preambleBuffer, messageBuffer])
  return Helper.Hash.keccak256(messageBuffer);
};

const sign = function(data, privateKey,) {
  var hash = this.hashMessage(data);
  var signature = Helper.Account.sign(hash, privateKey);
  var vrs = Helper.Account.decodeSignature(signature);
  return {
    message: data,
    messageHash: hash,
    r: vrs[1],
    s: vrs[2],
    signature: signature,
    v: vrs[0]
  };
};
