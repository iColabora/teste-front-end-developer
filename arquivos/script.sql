create database vagas;
connect vagas;

create table vagas.solicitantes(
	id int(11) auto_increment,
	nome varchar(255) not null,
	telefone varchar(100) not null,
	cpf varchar(20) not null unique,
	cep varchar(10) not null,
	rua varchar(100) not null,
	numero int(10) not null,
	bairro varchar(100) not null,
	cidade varchar(100) not null,
	estado varchar(100) not null,
	pais varchar(100) not null,
	constraint pk_solicitantes primary key(id)
);

create table vagas.pedidos(	
	id int(11) auto_increment,
	id_solicitante int(11),
	data_de_compra varchar(100) not null,
	cep varchar(10) not null,
	rua varchar(100) not null,
	numero int(100) not null,
	bairro varchar(100) not null,
	cidade varchar(100) not null,
	estado varchar(100) not null,
	pais varchar(100) not null,
	constraint pk_pedidos primary key(id),
	constraint fk_solicitantes_pedidos foreign key(id_solicitante) references solicitantes(id)
);

create table vagas.materiais(
	id int(11) auto_increment,
	id_pedido int(11),
	nome varchar(255) not null,
	marca varchar(255) not null,
	preco float not null,
	quantidade int(10) not null,
	constraint pk_materiais primary key(id),
	constraint fk_materiais_pedidos foreign key(id_pedido) references pedidos(id)	
);

create table vagas.insumos(
	id int(11) auto_increment,
	id_pedido int(11),
	id_material int(11),
	descricao text not null,
	preco float not null,
	quantidade int(10) not null,
	constraint pk_insumos primary key(id),
	constraint fk_insumos_pedidos foreign key(id_pedido) references pedidos(id),
	constraint fk_insumos_materiais foreign key(id_material) references materiais(id)	
);




/*SELECTS*/
select count(p.id) qtde from pedidos p where p.data_de_compra = '14/08/2016';

select s.nome nome, count(p.id) qtde from pedidos p inner join solicitantes s
on s.id = p.id_solicitante;

SELECT p.id id_pedido,
    s.nome nome_solicitante,
    p.data_de_compra, p.cep, p.rua, p.numero,
	p.bairro, p.cidade,
	p.estado,
	p.pais from pedidos p 
	inner join solicitantes s 
	where p.data_de_compra not null;


1 - solicitantes
2 - pedidos - entrega	
3 - materiais
4 - insumos


INSERT INTO solicitantes(id, nome, telefone, cpf, cep, rua, numero, bairro, cidade, estado, pais) 
VALUES(999, 'Marcel Alves', '1144195555', '76588865488', '07600000', 'Rua Porto', 80, 'Bairro do Josh', 'Atibaia', 'SP', 'Brasil');

INSERT INTO pedidos(id, id_solicitante, data_de_compra, cep, rua, numero, bairro, cidade, estado, pais) 
VALUES(999, 999, '14/08/2016', '07600000', 'rua teste', 10, 'bairro teste', 'cidade teste', 'estado teste', 'Brasil');

INSERT INTO materiais(id, id_pedido, nome, marca, preco, quantidade) 
VALUES(999, 999, 'nome teste', 'marca teste', 10, 10);

INSERT INTO insumos(id, id_pedido, id_material, descricao, preco, quantidade) 
VALUES(999, 999, 999, 'descricao teste 2', 10, 5);

INSERT INTO insumos(id, id_pedido, id_material, descricao, preco, quantidade) 
VALUES(998, 999, 999, 'descricao teste 1', 10, 5);