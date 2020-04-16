interface Value {
  value: string
}
let target = {
  value:'a'
}
var logHandler = {
  get: function(target: Value, key:PropertyKey) {
    console.log(`${String(key)} 被读取`);
    return target[key];
  },
  set: function(target: Value, key:PropertyKey, value: Value) {
    console.log(`${String(key)} 被设置为 ${value}`);
    target[String(key)] = value;
    return true;
  }
}

const proxyTarget = new Proxy(target,logHandler)
console.log(proxyTarget)