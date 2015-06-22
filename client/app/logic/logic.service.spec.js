'use strict';

describe('Service: logic', function () {

  // load the service's module
  beforeEach(module('conwaysgameoflifeApp'));

  // instantiate service
  var logic;
  beforeEach(inject(function (_logic_) {
    logic = _logic_;
  }));

  it('should do something', function () {
    expect(!!logic).toBe(true);
  });

});
