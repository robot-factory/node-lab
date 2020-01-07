function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("f(): called");
      console.log(target,propertyKey,descriptor)
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("g(): called");
      console.log(target,propertyKey,descriptor)
  }
}

function h(target:any) {
  console.log('hhhhhh')
}

@h
class C {
  @f()
  @g()
  method() {
    console.log('call method')
  }

  @g()
  method2() {
    console.log('call method2')
  }

  method3() {
    console.log('call method3')
  }
}

const c = new C()
// c.method()
// c.method2()