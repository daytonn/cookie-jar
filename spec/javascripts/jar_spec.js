describe("CookieJar", function() {
  var cookie_jar;

  beforeEach(function() {
    cookie_jar = new CookieJar();
  });

  afterEach(function() {
    cookie_jar = undefined;
    (new Cookie({ name: 'Foo' })).remove();
    (new Cookie({ name: 'My Cookie' })).remove();
  });

  describe("Usage:", function() {

    it("should add multiple cookies using an Object", function() {
      cookie_jar.add({
        'Foo': 'Bar',
        'My Cookie': 'yum'
      });
      expect(document.cookie).toContain('Foo');
      expect(document.cookie).toContain('Bar');
      expect(document.cookie).toContain('My Cookie');
      expect(document.cookie).toContain('yum');
    });

    it("should add a cookie using Strings", function() {
      cookie_jar.add('Foo', 'Bar');
      expect(document.cookie).toContain('Foo');
      expect(document.cookie).toContain('Bar');
    });

    it("should get a cookie from the cookie jar", function() {
      cookie_jar.add('My Cookie', "It's good");
      expect(cookie_jar.get('My Cookie')).toEqual("It's good");
    });

    it("should remove a cookie from the document", function() {
      cookie_jar.add('My Cookie', "It's good");
      cookie_jar.remove('My Cookie');

      expect(document.cookie.match(/My Cookie/)).toBeFalsy();
      expect(document.cookie.match(/It\'s good/)).toBeFalsy();
    });

    it("should remove a cookie from the jar", function() {
      cookie_jar.add('My Cookie', "It's good");
      cookie_jar.remove('My Cookie');

      expect(cookie_jar['My Cookie']).toBeUndefined();
    });
  });

});