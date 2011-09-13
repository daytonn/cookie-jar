(function() {
// Cookie ---------------------------------------------//
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
  
    if (settings.autoSet === true && settings.value === undefined) {
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
    var pairs = getCookiePairs();
    return pairs[this.name];
  };

  Cookie.prototype.set = function() {
    document.cookie = this.to_string();
  };

  Cookie.prototype.remove = function(cookie_name) {
    if (cookie_name !== undefined) {
      this.name = cookie_name;
    }
    this.value = '';
    this.exp = createExpiryDate(-1);
    this.set();
  };
  
  // Private methods
  function getCookiePairs() {
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
  
  function splitCookie() {
    return document.cookie.split(';');
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

// CookieJar ------------------------------------------//

  CookieJar = function(options) {
    var settings = {
      path: '/',
      daysToLive: 30
    };

    this.cookies = {};

    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        settings[property] = options[property];
      }
    }
  
    this.settings = settings;
  };

  CookieJar.prototype.get = function(name) {
    if (name === undefined) {
      throw new SyntaxError("CookieJar.get(cookie): cookie is undefined.");
    }
    
    return this.cookies[name].value;
  };

  CookieJar.prototype.set = function(name, value) {
    if (name === undefined) {
      throw new SyntaxError("CookieJar.set(name, value): name is undefined.");
    }

    if (value === undefined) {
      throw new SyntaxError("CookieJar.set(name, value): value is undefined.");
    }
  
    if (this.cookies[name] === undefined) {
      this.cookies[name] = new Cookie({
        name: name,
        value: value,
        path: this.settings.path,
        daysToLive: this.settings.daysToLive,
        autoSet: true
      });
    }
    else {
      this.cookies[name].value = value;
      this.cookies[name].set();
    }
  };

  CookieJar.prototype.remove = function(name) {
    if (name === undefined) {
      throw new SyntaxError("CookieJar.remove(name): cookie is undefined.");
    }

    if (this.cookies[name] !== undefined) {
      this.cookies[name].remove();
      this.cookies[name] = undefined;
    }
  };

  CookieJar.prototype.add = function() {
    if (arguments[0].constructor == Object) {
      add_cookies.apply(this, arguments);
    }
    else if (arguments[0].constructor == String) {
      add_cookie.apply(this, arguments);
    }
  };

  // Private methods
  function add_cookie(name, value) {
    if (name === undefined) {
      throw new SyntaxError("CookieJar.add(cookie, value): cookie is undefined.");
    }

    if (value === undefined) {
      throw new SyntaxError("CookieJar.add(cookie, value): value is undefined.");
    }

    this.set(name, value);
  }

  function add_cookies(cookies) {
    if (cookies === undefined) {
      throw new SyntaxError("CookieJar.add({ 'Cookie Name': 'cookie value', 'Another': 'cookie' }): cookies is undefined.");
    }

    for (var cookie in cookies) {
      this.set(cookie, cookies[cookie]);
    }
  }

})();