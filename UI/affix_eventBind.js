/**
 * Created with JetBrains WebStorm.
 * User: gaga
 * Date: 13-7-10
 * Time: 上午12:39
 * To change this template use File | Settings | File Templates.
 */

;

(function($, global) {
    function Affix(options) {
        var me = this;
        if(options != null) {
            $.each(options, function(k ,v) {
                if(k in me) {
                    me[k] = v;
                }
            });
        }
    }

    //noinspection JSValidateTypes
    $.extend(Affix.prototype, {
        el:null,
        cls:null,
        fixStyle:null,
        range:null,
        render:function() {

        }
    });
})(jQuery, window);
