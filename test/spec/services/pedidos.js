'use strict';

describe('Service: pedidos', function () {

  // load the service's module
  beforeEach(module('testeFrontEndDeveloperApp'));

  // instantiate service
  var pedidos;
  beforeEach(inject(function (_pedidos_) {
    pedidos = _pedidos_;
  }));

  it('should do something', function () {
    expect(!!pedidos).toBe(true);
  });

});
