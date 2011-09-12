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
