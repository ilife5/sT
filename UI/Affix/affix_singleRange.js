;(function($, exports, Affix, undefined) {

    function affix_singleRange(opts) {
        var top = opts.top,
            left = opts.left,
            range = opts.range,
            $el = $(opts.el);

        var affix = new Affix({
            el : $el,
            top : top,
            everyTime : true,
            heightHack : true,
            left : left,
            range : range
        }).render().setPosition();

        return affix;
    }

    exports.affix_singleRange = affix_singleRange;

})(jQuery, window, window.Affix);
