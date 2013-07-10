/**
 * Created with IntelliJ IDEA.
 * User: jifeng.yao
 * Date: 13-7-9
 * Time: 下午8:53
 * To change this template use File | Settings | File Templates.
 */

;
(function($, global) {

    //检测是否为ie6
    var isIE6 = /MSIE 6\.0/.test(navigator.userAgent);

    /**
     * 返回v>=b
     * @param {Function|Number} v
     * @param {Function|Number} b
     */
    function compare(v, b) {
        v = $.isFunction(v)? Number(v.call(this)):Number(v);
        b = $.isFunction(b)? Number(b.call(this)):Number(b);
        return v>=b;
    }

    //根据当前位置做ie下位置的适配
    function getPosition(o, $el) {
        var top = o.top,
            bottom = o.bottom,
            left = o.left,
            right = o.right,
            ret = {};

        //如果有top值，使用top值，否则使用bottom值
        //如果有left值，使用left值，否则使用right值
        if(top != null) {
            ret.top = $(window).scrollTop() + top;
        } else if(bottom != null) {
            ret.top = $(window).scrollTop() + $(window).height() - $el.height() - bottom;
        }

        if(left != null) {
            ret.left =$(window).scrollLeft() + left;
        } else if(bottom != null) {
            ret.left = $(window).scrollLeft() + $(window).width() - $el.width() - right;
        }

        return ret;
    }

    function Affix(options) {
        var me = this;
        //遍历参数，如果存在于defaultConfig中，将该参数作为实例的属性
        if(options != null) {
            $.each(options, function(k, v) {
                if(k in me) {
                    me[k] = v;
                }
            });
        }
    }

    $.extend(Affix.prototype, {
        el : null,      //目标节点
        range:null,     //生效范围
        top:null,       //生效时的top值
        left:null,      //生效时的left值
        bottom:null,    //生效时的bottom值
        right:null,     //生效时的right值
        additionStyle:null,  //生效时的附加样式
        currentStyle:{},
        lastStyle:{},
        isWork:false,
        setPosition:function() {
            var me = this,
                range = me.range,
                currentStyle = me.currentStyle,
                lastStyle = me.lastStyle,
                $el = $(me.el),
                top = $(window).scrollTop();
            /**
             * 区分range的值
             * 当range为单值时，比较top >= range，如果range是个函数，则比较top >= range.call(this)
             * 当range为数组时，比较top >= range[0] && top <= range[1]，如果range中数组项为函数时，
             * 比较top>=range[0].call(this) && top <= range[1].call(this)
             */
            if(($.isArray(range) && $.proxy(compare, me)(top, range[0]) && $.proxy(compare, me)(range[1], top)) || ($.proxy(compare, me)(top, range)) ) {
                if(!me.isWork) {
                    currentStyle = $.extend({
                        top:me.top,
                        left:me.left,
                        bottom:me.bottom,
                        right:me.right,
                        position:'fixed'
                    }, me.additionStyle);
                    $.each(currentStyle, function(k, v) {
                        lastStyle[k] = $el.css(k);
                    });
                    if(isIE6) {
                        currentStyle.position = 'absolute';
                    }
                    $el.css(currentStyle);
                    me.isWork = true;
                }
                //ie6的定位需要随着滚动条的移动而更新
                if(isIE6) {
                    $el.css(getPosition(currentStyle, $el));
                }
            } else {
                me.isWork = false;
                $el.css(lastStyle);
            }
            $(me).trigger('position');
        }
    });

    Affix.prototype.render = function() {
        var me = this,
            $win = $(window);

        $win.on('scroll resize', function() {
            me.setPosition();
        });

        me.setPosition();
    };
    global.Affix = Affix;
})(jQuery, window);