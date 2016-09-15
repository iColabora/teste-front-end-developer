'use strict';

describe('Controller: PedidospendentesCtrl', function () {

  // load the controller's module
  beforeEach(module('testeFrontEndDeveloperApp'));

  var PedidospendentesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PedidospendentesCtrl = $controller('PedidospendentesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PedidospendentesCtrl.awesomeThings.length).toBe(3);
  });
});
