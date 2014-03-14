# dfaHAHA

dfaHAHA是一款羽毛级的js dfa实现方案

## dfa

有穷确定状态自动机，给我状态集，规则，开始状态， 然后我就知道该干嘛了：）

![dfa](https://raw.githubusercontent.com/ilife5/sT/master/UI/dfa/source/640px-DFA_example_multiplies_of_3.svg.png)

## dfa

状态机，根据当前状态和条件，决策下一个状态。

```javascript
{
    s0: function( status ) {
        switch(status) {
            case 1:
                this.setStatus('s1');
                break;
            case 0:
                this.setStatus('s0');
        }
    }
}
```

## rules

规则集，触发dfa改变的外力。

```javascript

var num = 0,
    me = this;
    
setInterval(function() {
    me.proxy((++num)%2);
}, INTERVAL);

```

## UI

组件在每个状态下的UI显示，类似各种MV**框架中的V。



```javascript
function sayHello () {}

sayHello.prototype = dfaHaha
```
