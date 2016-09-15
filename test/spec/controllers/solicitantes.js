'use strict';

describe('Controller: SolicitantesCtrl', function () {

  // load the controller's module
  beforeEach(module('testeFrontEndDeveloperApp'));

  var SolicitantesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitantesCtrl = $controller('SolicitantesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitantesCtrl.awesomeThings.length).toBe(3);
  });
});
