;
(function ($, global, undefined) {

    $.extend($.fn, {
        deform: function (config) {
            var _config = $.extend({

                //动画时间
                duration: 2000,

                //矩形选择器
                selector: '.js-selector-deform',

                //矩形升高高度
                height: 300

            }, config);

            $(this).each(function () {
                var progress = 0,
                    duration = _config.duration,
                    time1 = 0,
                    time2 = 0,
                    shape = $(this).find(_config.selector),
                    height = _config.height;

                $(this).hover(function () {
                    $(shape).stop();

                    time1 = new Date().getTime();
                    progress = progress - time1 + time2;
                    progress = progress < 0 ? 0 : progress;

                    $(shape).animate({
                        height: height
                    }, {
                        duration: duration - progress,
                        done: function () {
                            progress = duration;
                        }
                    });
                }, function () {
                    $(shape).stop();

                    time2 = new Date().getTime();
                    progress = time2 - time1 + progress;
                    progress = progress > duration ? duration : progress;

                    $(shape).animate({
                        height: 0
                    }, {
                        duration: progress,
                        done: function () {
                            progress = 0;
                        }
                    });
                });
            });

        }
    });

})(jQuery, window);
