describe("Cookie", function() {
  it("should exist", function() {
    expect(Cookie).toBeDefined();
  });

  describe("Instantiation", function() {
    var cookie;
    beforeEach(function() {
      cookie = new Cookie({ name: 'My Cookie', value: 'some value' });
    });

    it("should require a name", function() {
      expect(function() {
        cookie = new Cookie();
      }).toThrow("new Cookie({ name: 'Foo', value: 'Bar' }): name is undefined.");
    });

    it("should have a get method", function() {
      expect(cookie.get).toBeDefined();
    });

    it("should have a set method", function() {
      expect(cookie.set).toBeDefined();
    });

    it("should have a remove method", function() {
      expect(cookie.remove).toBeDefined();
    });

    it ('should have a to_string method', function() {
      expect(cookie.to_string).toBeDefined();
    });

    describe('When using autoSet', function() {

      it ('should throw an error if value is not defined', function() {
        expect(function() {
          auto_cookie = new Cookie({ name: 'Foo', autoSet: true });
        }).toThrow("new Cookie({ name: 'Foo', value: 'Bar', autoSet: true }): value is undefined.");
        (new Cookie({ name: 'Foo' })).remove();
      });
    });

  });

  describe("Usage", function() {
    var cookie;

    beforeEach(function() {
      cookie = new Cookie({ name: 'My Cookie', value: 'Foo' });
    });

    it("should set a cookie", function() {
      cookie.set();
      expect(document.cookie).toContain('My Cookie');
      expect(document.cookie).toContain('Foo');
    });

    it("should get a cookie", function() {
      expect(cookie.get()).toEqual('Foo');
    });

    it("should remove a cookie", function() {
      cookie.remove();
      expect(cookie.get()).toBeUndefined();
    });
  });
});