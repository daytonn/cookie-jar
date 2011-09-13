describe("Cookie", function() {

  describe("Instantiation:", function() {
    var cookie;

    beforeEach(function() {
      cookie = new Cookie({ name: 'My Cookie', value: 'some value' });
    });
    
    afterEach(function() {
      cookie = undefined;
    });

    it("should require a name", function() {
      expect(function() {
        cookie = new Cookie();
      }).toThrow("new Cookie({ name: 'Foo', value: 'Bar' }): name is undefined.");
    });

    describe('When using autoSet:', function() {

      it ('should throw an error if value is not defined', function() {
        expect(function() {
          auto_cookie = new Cookie({ name: 'Foo', autoSet: true });
        }).toThrow("new Cookie({ name: 'Foo', value: 'Bar', autoSet: true }): value is undefined.");
        (new Cookie({ name: 'Foo' })).remove();
      });
    });

  });

  describe("Usage:", function() {
    var cookie;

    beforeEach(function() {
      cookie = new Cookie({ name: 'My Cookie', value: 'Foo' });
      (new Cookie({ name: 'My Cookie' })).remove();
    });

    afterEach(function() {
      cookie = undefined;
    });

    it("should set a cookie", function() {
      cookie.set();
      expect(document.cookie).toContain('My Cookie');
      expect(document.cookie).toContain('Foo');
    });

    it("should get a cookie", function() {
      cookie.set();
      expect(cookie.get()).toEqual('Foo');
    });

    it("should remove a cookie", function() {
      cookie.set();
      cookie.remove();
      expect(cookie.get()).toBeUndefined();
    });
  });

  describe("Class methods:", function() {
    
    // it("should remove a cookie", function() {
    //       Cookie.remove('My Cookie');
    //       expect(document.cookie.match(/My Cookie/)).toBeFalsy();
    //       expect(document.cookie.match(/Foo/)).toBeFalsy();
    //     });
        
  });
});