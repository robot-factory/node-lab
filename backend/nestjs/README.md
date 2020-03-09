# 安装
```
npm i -g @nestjs/cli --registry=https://registry.npm.taobao.org
```
一般都会使用脚手架搭建项目，目前npm网速太慢，使用淘宝代理。

# 初始化项目
```
nest new project-name
git clone https://github.com/nestjs/typescript-starter.git project-name
```
两者方式结果一样

# 数据库
一般来说对数据的操作分为两种方式，一种是利用sql语句对数据库进行操作，另一种是利用ORM提供的接口。两者的共同之处在于都需要在启动服务器时建立一个与数据库的连接。   

一般对数据库的操作都是写在service层，抽象成相应的接口提供给controller调用。用sql语句调用的优势是十分底层，所以操作很灵活，缺点是很多东西都要自己来实现，比如防止sql注入，而且实际用到的功能可能很简单。使用Orm则要简单得多，差不多就是调用函数的感觉，不过复杂一些的功能也很麻烦。sql型数据库的orm使用起来一般需要构建schema或者entity，相当于定义表的字段，Nosql。

# controller
