/**
 * 表单项的val设计
 */

//表单
function form() {
    this.items = {};	//用来存储form中的控件
}

/**
 * @method
 * @param {Object} obj
    {
        name : value //string number array object
    }
 *
 */
form.prototype.val = function (obj) {

    var k, //key
        r, //returnValue
        items = this.item;	//form.items

    //判断是否为取值
    if (arguments.length === 0) {
        r = {};
        for (k in items) {
            if (items.hasOwnProperty(k)) {
                r[k] = items[k].val();
            }
        }
        return r;
    }

    //循环遍历form内部的控件，进行赋值
    for (k in obj) {
        if (obj.hasOwnProperty(k) && form['k'] != null) {
            try {
                form.items['k'].val(obj['k']);
            } catch (e) {
                console.log(e);
            }
        }
    }
};

//表单控件（form controls）
function control() {}

/**
 * @method
 * @param {Object} obj
    {
        name : value //string number array object
    }
 *
 */
control.prototype.val = function (value) {
    //根据参数个数判断是否为取值
    if (arguments.length === 0) {
        return this.value;
    }
    this.value = value;
};
 
