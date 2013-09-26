;(function($, exports, Affix, undefined) {
    /**
     * 竖向有边界的浮动效果
     */

    var getValue = Affix.getValue;

    /**
     * @param opts
     * @method
     */
    function affix_hBox(opts) {
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
                    var scrollTop = $(document).scrollTop(),
                        floatAreaH = $floatArea.outerHeight(),
                        bottom = getValue(rangeBottom);
                    if(scrollTop + floatAreaH >= bottom && check()) {
                        return bottom - getValue(rangeTop) - floatAreaH;
                    } else {
                        return 0;
                    }
                }
            }
        });

        return affix;
    }

    exports.affix_hBox = affix_hBox;

})(jQuery, window, window.Affix);