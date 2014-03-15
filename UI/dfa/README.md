# dfaHAHA

dfaHAHA是一款羽毛级的js dfa实现方案

## Deterministic finite automaton

有穷确定状态自动机，给我有穷状态集([s0, s1, s2])，有穷的输入符号集合([0,1])，转移函数，开始状态(s0)，一个终结状态或接受状态的集合。然后我就知道该干嘛了：）

![dfa](https://raw.githubusercontent.com/ilife5/sT/master/UI/dfa/source/640px-DFA_example_multiplies_of_3.svg.png)

## statusSet

有穷状态集合

```javascript
['s0', 's1', 's2']
```

## dfa

状态机(转移函数)，根据当前状态和条件，决策下一个状态。

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

规则，自动机的输入，同时也是触发dfa改变的外力。

```javascript

var num = 0,
    me = this;
    
setInterval(function() {
    me.proxy((++num)%2);
}, INTERVAL);

```

## UI

组件在每个状态下的UI显示，类似各种MV**框架中的View。

```javascript
{

    s0: function() {
        this.title('s0');
    }
            
}
```

## 优点

* 状态驱动，扫除需求死角
* UI和内部状态处理分离
* debug迅速，“如果我不是我，那肯定是哪里出错了”

## 缺点

* 代码量增加

## 使用

```javascript

//构造函数
function Camel( elem ) {

    var me = this;
    
    //状态集合
    me.statusSet = [1,2,3,4,5,6,7,8,9,10,11];

    //状态机
    this.dfa = (function() {
        var map = {};

        me.statusSet.forEach(function(status) {
            map[status] = function( status ) {

                var s = me.getStatus();

                if(s === me.statusSet.length) {
                    me.setStatus(me.statusSet[0]);
                } else if(status === s + 1) {
                    me.setStatus(status);
                } else {
                    me.setStatus(s);
                }

            };
        });

        return map;
    })();

    //UI
    this.UI = (function() {
        var map = {};

        me.statusSet.forEach(function(status) {
            map[status] = function() {

                elem.src = './source/camel' + status + '.png';

            };
        });

        return map;
    })();

    //输入规则
    this.rules = function() {
        var num = 0,
            me = this;
        setInterval(function() {
            me.proxy((++num)%me.statusSet.length + 1);
        }, 300);
    };

    this.setStatus(1);
    this.initialize();
}

//继承dfaHAHA
Camel.prototype = new dfaHAHA();

//实例化
new Camel();

```
