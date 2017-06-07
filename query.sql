select *, 
        ((SELECT SUM (m.quantidade*m.preco) FROM materiais as m WHERE m.id_pedido = p.id)
        +(SELECT SUM (i.quantidade*i.preco) FROM insumos as i WHERE i.id_pedido = p.id)) as valor 
from pedidos as p


select 
    count(*) as total, 
    day(STR_TO_DATE(data_de_compra, '%Y-%m-%d')) as day,
    month(STR_TO_DATE(data_de_compra, '%Y-%m-%d')) as month,
    year(STR_TO_DATE(data_de_compra, '%Y-%m-%d')) as year 
from pedidos p 
group by day(STR_TO_DATE(data_de_compra, '%Y-%m-%d')), month(STR_TO_DATE(data_de_compra, '%Y-%m-%d')), year(STR_TO_DATE(data_de_compra, '%Y-%m-%d'))

select 
    count(*),
    s.nome 
from pedidos p
inner join solicitantes s on s.id = p.id_solicitante
group by p.id_solicitante;
