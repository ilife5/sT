;

(function ($, global) {

    //检测是否为ie6
    var isIE6 = /MSIE 6\.0/.test(navigator.userAgent);

    /**
     * 返回v>=b
     * @param {Function|Number} v
     * @param {Function|Number} b
     */
    function compare(v, b) {
        //如果不存在v或者b，则说明该range不存在，返回true
        if (v == null || b == null) {
            return true;
        }

        //v和b如果是function，则执行该function获得值
        v = $.isFunction(v) ? Number(v.call(this)) : Number(v);
        b = $.isFunction(b) ? Number(b.call(this)) : Number(b);

        return v >= b;
    }

    /**
     * 如果v是function，返回运行后的值
     * 如果v不是function，存在d则返回d的值，否则直接返回v
     * @param v
     * @example
     * var obj = {
     *      a : 1,
     *      b : function () {return 1}
     *  };
     *  getValue(obj.a);    //1
     *  getValue(obj.b);    //1
     *  getValue(obj.a, 2); //2
     */
    function getValue(v, d) {
        if($.isFunction(v)) {
            return v();
        } else {
            return d || v;
        }
    }

    /**
     * 判断一个当前页面是否在range划定的范围内
     * @param range
     *  range的值可以为单值，判断当前滚动条的y轴值是否在range内
     *  range的值可以为一个数组，如[t, r, b, l]，分别代表了上、右、下、左边界
     *  其中range的值既可以为数字或者函数
     * @return {Boolean} 当前页面是否在range区域内部
     */
    function elInRange(range) {
        var $win = $(window),
            sTop = $win.scrollTop(),
            sLeft = $win.scrollLeft(),
            right = $win.width() + sLeft;
        if ($.isArray(range)) {
            return compare(sTop, range[0]) && compare(range[1], right) &&
                compare(range[2], sTop + $win.height()) && compare(sLeft, range[3]);
        } else {
            return compare(sTop, range[0]);
        }
    }

    //根据当前位置做ie下位置的适配
    function getPosition(o, $el) {
        var top = o.top,
            bottom = o.bottom,
            left = o.left,
            right = o.right,
            ret = {};

        //如果有top值，使用top值，否则使用bottom值
        if (top != null) {
            ret.top = getValue(top, $(window).scrollTop() + top);
        } else if (bottom != null) {
            ret.top = getValue(bottom, $(window).scrollTop() + $(window).height() - $el.height() - bottom);
        }

        //如果有left值，使用left值，否则使用right值
        if (left != null) {
            ret.left = getValue(left, $(window).scrollLeft() + left);
        } else if (right != null) {
            ret.left = getValue(right, $(window).scrollLeft() + $(window).width() - $el.width() - right);
        }
        return ret;
    }

    function Affix(options) {
        var me = this;
        //遍历参数，如果存在于defaultConfig中，将该参数作为实例的属性
        if (options != null) {
            $.each(options, function (k, v) {
                if (k in me) {
                    me[k] = v;
                }
            });
        }
    }

    $.extend(Affix.prototype, {
        el:null, //目标节点
        range:null, //生效范围
        top:null, //生效时的top值
        left:null, //生效时的left值
        bottom:null, //生效时的bottom值
        right:null, //生效时的right值
        additionStyle:null, //生效时的附加样式
        currentStyle:{},
        lastStyle:{},
        isWork:false,
        setPosition:function () {
            var me = this,
                range = me.range,
                $el = $(me.el);
            /**
             * 区分range的值
             * 当range为单值时，比较top >= range，如果range是个函数，则比较top >= range.call(this)
             * 当range为数组时，比较top >= range[0] && top <= range[1]，如果range中数组项为函数时，
             * 比较top>=range[0].call(this) && top <= range[1].call(this)
             */
            if (elInRange(range)) {
                if (!me.isWork) {
                    me.currentStyle = $.extend({
                        top:getValue(me.top),
                        left:getValue(me.left),
                        bottom:getValue(me.bottom),
                        right:getValue(me.right),
                        position:'fixed'
                    }, me.additionStyle);
                    $.each(me.currentStyle, function (k, v) {
                        me.lastStyle[k] = $el.css(k);
                    });
                    if (isIE6) {
                        me.currentStyle.position = 'absolute';
                    }
                    $el.css(me.currentStyle);
                    me.isWork = true;
                }
                //ie6的定位需要随着滚动条的移动而更新
                if (isIE6) {
                    $el.css(getPosition(me.currentStyle, $el));
                }
            } else {
                me.isWork = false;
                $el.css(me.lastStyle);
            }
            $(me).trigger('position');
        }
    });

    Affix.prototype.render = function () {
        var me = this,
            $win = $(window);

        $win.on('scroll resize', function () {
            me.setPosition();
        });

        me.setPosition();
    };
    global.Affix = Affix;
})(jQuery, window);
