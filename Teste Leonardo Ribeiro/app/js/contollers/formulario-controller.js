/**
 * Created by leonardoribeiro on 19/08/16.
 */
angular.module("iColabora").controller("formController", function ($scope) {
    $scope.materiais = [];
    $scope.insumos=[];
    $scope.adicionaMaterial = function (material) {
        $scope.materiais.push(angular.copy(material));
        delete $scope.material;
    };
    $scope.adicionaInsumo = function (insumo) {
        $scope.insumos.push(angular.copy(insumo));
        delete $scope.insumo;
    }
    $scope.$watchCollection('materiais',function() {
        $scope.totalMateriais = 0;
        angular.forEach($scope.materiais, function(value, key) {
            $scope.totalMateriais += value.quantidade * value.preco;
        })
    });
    $scope.$watchCollection('insumos',function() {
        $scope.totalInsumos = 0;
        angular.forEach($scope.insumos, function(value, key) {
            $scope.totalInsumos += value.quantidade * value.preco;
        })
    });
    $scope.totalDoPedido += $scope.totalInsumos + $scope.totalMateriais;


});