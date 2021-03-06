
/**
 * 表单中子项数据格式是数组类型时的抽象解决方案，诉求和详细介绍请移步：
 * [表单中数组类型控件的数据层设计](https://github.com/ilife5/sT/issues/6)
 */

//constructor
function Items() {
    this.items = [];
}

//prototype
Items.prototype = {
    constructor : Items,
    //set or return the value of items
    val:function() {
        if(arguments.length > 0) {
            //set value of items
            var v = arguments[0],
                self = this;
            //if this.items.length < v.length
            //call this.addItem
            v.forEach(function(value, index) {
                if(self.items[index]) {
                    self.items[index].val(value);
                } else {
                    self.addItem(value);
                }
            });
        } else {
            //return the value of items
            var r = [];
            this.items.forEach(function(item) {
                r.push(item.val());
            });
            return r;
        }
    },
    addItem:function(value) {
        //add a new item to items
        var item = new Item();
        if(value != null) {
            item.val(value);
        }
        this.items.push(item);
        return this.items.length - 1;
    },
    removeItem:function(index) {
        //remove the item from items by index
        this.items.splice(index, 1);
    }
};
