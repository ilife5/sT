function dfaHAHA() {}

dfaHAHA.prototype.UIproxy = function(type, options) {
    var me = this;

    me.UI[type].call(me, options);
};

dfaHAHA.prototype.UI = {};

dfaHAHA.prototype.dfa = {};

dfaHAHA.prototype.UIproxy = function(status, options) {
    this.UI[status].call(this, options);
};

dfaHAHA.prototype.rules = function() {};

dfaHAHA.prototype.setStatus = function( status, options ) {
    this.status = status;
    this.UIproxy(status, options);
};

dfaHAHA.prototype.getStatus = function() {
    return this.status;
};

dfaHAHA.prototype.proxy = function ( type ) {
    this.dfa[this.getStatus()].call(this, type);
};

dfaHAHA.prototype.initialize = function() {
    this.rules();
};
