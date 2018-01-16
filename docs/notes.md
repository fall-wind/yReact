## Component element node

## issues

### setState
照着react官网敲了一会，发现setState写不下去了；  
我在component原型上的setState方法获得的this与mountTree的两个类找不到关联；  
我想找到那个this写在实例上 然后想办法调用this.receive(element)这样就很容易实现更新了  
回去看15.x的源码吧

参考preact 初步功能 // 代码的搬运工~~~



### update host element children
note： this version(0.0.4) not support react 16.0 (component arr)

host children update;

- add
- replace
- remove

当前版本（0.0.4）不支持react 16.0 Component返回多个数组的写法

当更新到host element（div, span....）他们的children也需要更新； 需要一个preChildren 与nextChildren

nextChildren可以直接从element获取  
preChildren从哪获取尼？  

在之前渲染Component组件时（参考preact） 在组件实例的base属性对应着真实的节点； 而相应的真实节点会有一个_component属性对应着相应的实例

### 更新比重新渲染还慢
render代码。。。。
1000个dom 渲染 150ms; 更新 3828ms 😱
