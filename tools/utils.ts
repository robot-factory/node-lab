function throttle <T extends (...args:any[])=>any > (fn:T) {
  const wait = 1000
  let lastTime: number = 0
  return function (...args:any[]) {
    const time = new Date().valueOf()
    if(time - lastTime > wait) {
      lastTime = time
      return fn(...args)
    }
  }
}

  function call() {
    console.log('hello world!')
  }

const newCall = throttle(call)
newCall() 
newCall() 
newCall() 

setTimeout(()=>{
  newCall() 
}, 2000)