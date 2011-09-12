describe("Cookie", function() {
  it("should exist", function() {
    expect(Cookie).toBeDefined();
  });

  describe("instantiation", function() {
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

  });
});