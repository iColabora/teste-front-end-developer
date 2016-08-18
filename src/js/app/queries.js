function getOrdersPerDay() {
    var query = "SELECT * FROM pedidos";

    mysqlQuery(query, function(result) {
        return result;
    });
}
