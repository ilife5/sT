/**
 * 竖向有边界的浮动效果
 */

var getValue = Affix.getValue;

/**
 * @param opts
 * @constructor
 */
function Affix_hBox(opts) {
    var top = opts.top,
        left = opts.left,
        rangeTop = opts.rangeTop,
        rangeBottom = opts.rangeBottom,
        check = opts.check || function () {
            return true;
        },
        floatArea = opts.floatArea,
        $floatArea = $(floatArea),
        affix;

    affix = new Affix({
        el:$floatArea,
        heightHack:true,
        range:[rangeTop, null, function() {
            return getValue(rangeBottom) + $(window).height() - $floatArea.outerHeight();
        }],
        top:top,
        everyTime:true,
        left:left,
        recoveryStyle:{
            top:function() {
                if($(document).scrollTop() + $floatArea.outerHeight() >= getValue(rangeBottom) && check()) {
                    return getValue(rangeBottom) - getValue(rangeTop);
                } else {
                    return 0;
                }
            }
        }
    });
}
