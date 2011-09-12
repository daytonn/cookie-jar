(function() {

  function splitCookie() {
    return document.cookie.split(';');
  }

  function getPairs() {
      var split = splitCookie(),
          length = split.length,
          pairs = {};

      for (i = 0; i < length; i++) {
        var pair = split[i].split('=');
        pair[0] = pair[0].replace(/^\s+|\s+$/, '');
        pairs[pair[0]] = pair[1];
      }

      return pairs;
  }

  function daysToMilliseconds(days) {
    return (days * 24 * 60 * 60 * 1000);
  }

  function createExpiryDate(days) {
  	var date = new Date(),
        unix = date.getTime(),
        exp_date = new Date();

    exp_date.setTime(unix + daysToMilliseconds(days));
    return exp_date.toUTCString();
  }

  Cookie = function(options) {
  	var settings = {
  		path: '/',
  		daysToLive: 30,
  		autoSet: false
  	};

  	for (var property in options) {
  	  if (options.hasOwnProperty(property)) {
  	    settings[property] = options[property];
  	  }
  	}

  	if (settings.name === undefined) {
  	  throw new SyntaxError("new Cookie({ name: 'Foo', value: 'Bar' }): name is undefined.");
  	}
  	
  	if (settings.autoSet === true) {
  	  throw new SyntaxError("new Cookie({ name: 'Foo', value: 'Bar', autoSet: true }): value is undefined.");
  	}

    // Public Members
  	this.name = settings.name;
  	this.value = settings.value || '';
  	this.path = settings.path;
  	this.exp = createExpiryDate(settings.daysToLive);
  	
  	if (settings.autoSet) {
  	  this.set();
  	}
  };
  
  Cookie.prototype.to_string = function() {
    return [
      [this.name, this.value].join('='),
      ['expires', this.exp].join('='),
      ['path', this.path].join('=')
    ].join(';');
  };

  Cookie.prototype.get = function() {
    var pairs = getPairs();
    return pairs[this.name];
  };

  Cookie.prototype.set = function() {
    document.cookie = this.to_string();
  };

  Cookie.prototype.remove = function() {
    this.value = '';
    this.exp = createExpiryDate(-1);
    this.set();
  };
})();

CookieJar = function(options) {
  var settings = {
		path: '/',
		daysToLive: 30,
		autoSet: false
	};

	for (var property in options) {
	  if (options.hasOwnProperty(property)) {
	    settings[property] = options[property];
	  }
	}
	
  var pairs = getPairs(),
      name,
      cookies = {};

  for (name in pairs) {
    if (pairs.hasOwnProperty(name)) {
      cookies[name] = new Cookie({
        name: name,
        value: pairs[name],
        path: settings.path,
        daysToLive: settings.daysToLive,
        autoSet: settings.autoSet
      });
    }
  }

  this.cookies = cookies;
};

CookieJar.prototype.get = function(cookie) {
  if (cookie === undefined) {
    throw new SyntaxError("CookieJar.get(cookie): cookie is undefined.");
  }

  return this.cookies[cookie].value;
};

CookieJar.prototype.set = function(cookie, value) {
  if (cookie === undefined) {
    throw new SyntaxError("CookieJar.set(cookie, value): cookie is undefined.");
  }
  
  if (value === undefined) {
    throw new SyntaxError("CookieJar.get(cookie, value): value is undefined.");
  }
  
  if (this.cookies[cookie] === undefined) {
    this.cookies[cookie] = new Cookie({ name: cookie, value: value });
  }
  else {
    this.cookies[cookie].value = value;
    this.cookies[cookie].set();
  }
};

CookieJar.prototype.remove = function(cookie) {
  if (cookie === undefined) {
    throw new SyntaxError("CookieJar.remove(cookie): cookie is undefined.");
  }

  if (this.cookies[cookie] !== undefined) {
    this.cookies[cookie].remove();
  }    
};

CookieJar.prototype.add = function(cookie, value) {
  if (cookie === undefined) {
    throw new SyntaxError("CookieJar.add(cookie, value): cookie is undefined.");
  }
  
  if (value === undefined) {
    throw new SyntaxError("CookieJar.add(cookie, value): value is undefined.");
  }
  
  this.set(cookie, value);
};
