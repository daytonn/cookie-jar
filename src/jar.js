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