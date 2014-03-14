function Camel( elem ) {

    var me = this;

    me.statusSet = [1,2,3,4,5,6,7,8,9,10,11];

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

    this.UI = (function() {
        var map = {};

        me.statusSet.forEach(function(status) {
            map[status] = function() {

                elem.src = './source/camel' + status + '.png';

            };
        });

        return map;
    })();

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

Camel.prototype = new dfaHAHA();

