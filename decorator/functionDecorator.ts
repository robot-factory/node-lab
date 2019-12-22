function color(value: string) { // 这是一个装饰器工厂
  return function (target) { //  这是装饰器
      // do something with "target" and "value"...
  }
}