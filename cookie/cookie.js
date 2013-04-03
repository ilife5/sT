(function() {
	var DAY2MILL = 86400000,
		CookieCache = {};
	/**
     * 设置cookie
     * @param name cookie名
     * @param value cookie值
     * @param exdays 过期时间，单位：day
     * @param domain
     * @param path
     */
    function setCookie (name, value, exdays, domain, path) {
        var c_value = encodeURIComponent(value) + ( (exdays == null) ? "" : "; expires=" + new Date((new Date()).getTime() + (exdays*DAY2MILL)).toUTCString() ) + ((domain == null) ? "" : "; domain=" + domain) + ((path == null) ? "" : "; path=" + path);
        document.cookie = name + "=" + c_value;
    }

    /**
     * 通过key获取cookie值
     * @param key cookie名
     * @return {String} cookie值
     */
	function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^|\s*)"+name+"=([^;]*)(;|$)"));
        if(arr != null) return decodeURIComponent(arr[2]); 
        return null;
	}

	function catchIt( name, value, exdays, domain, path ) {
		CookieCache[name] = {};
		CookieCache[name]["name"] = name;
		CookieCache[name]["value"] = value || "";
		CookieCache[name]["exdays"] = exdays || null;
		CookieCache[name]["domain"] = domain || null;
		CookieCache[name]["path"] = path || null;
	}

	return {
		setCookie : function( name, value, exdays, domain, path ) {
			try {
				setCookie( name, value, exdays, domain, path );
				catchIt( name, value, exdays, domain, path );
			} catch( e ) {
				if(typeof(console) != 'undefined')  {
					console.info( e );
				}
			}
		},
		getCookie : function( name ) {
			if( name && CookieCache[name] ) {
				return CookieCache[name]["value"];
			} else {
				return getCookie( name );
			}
		}, 
		removeCookie : function( name, domain, path ) {
			if( !name ) return; 
			if( CookieCache[name] ) {
				setCookie( name, "", 0, CookieCache[name]["domain"], CookieCache[name]["path"]);
				delete CookieCache[name];
			} else {
				setCookie( name, "", 0, domian, path);
			}
		}
	};

})();