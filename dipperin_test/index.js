const Dipperin = require('@dipperin/dipperin.js')
// 初始化项目 npm init
// 安装依赖 npm install @dipperin/dipperin.js

const remoteHost = `http://14.17.65.122:3035`

const dipperin = new Dipperin(remoteHost)

const TestGetBalance = async () => {
  const address = ``
  const result = await dipperin.dr.getBalance(address)
  console.log(result)
}

TestGetBalance()