# react 使用小注意

1. 在使用react的时候，开始的时候因为this指向的问题用了bind，然而可以使用`e => {this.tabClick}`这种来让this的指向指向定义的那个类，减少代码量

2. 在react中，类似vue指令v-if的写法则是{true?use this: use this},这种来判断；

3. 在循环上，则需要定义好map方法，`须记得return 出来当前书写完的这些`

