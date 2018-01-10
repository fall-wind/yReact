## Component element node

## issues

### setState
照着react官网敲了一会，发现setState写不下去了；  
我在component原型上的setState方法获得的this与mountTree的两个类找不到关联；  
我想找到那个this写在实例上 然后想办法调用this.receive(element)这样就很容易实现更新了  
回去看15.x的源码吧

参考preact 初步功能 // 代码的搬运工~~~