CREATE DATABASE vagas;

USE vagas;

CREATE TABLE solicitantes(
    id INT(11) NOT NULL PRIMARY KEY,
    nome VARCHAR(255),
    telefone VARCHAR(100),
    cpf VARCHAR(20),
    cep VARCHAR(10),
    rua VARCHAR(100),
    numero INT(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    pais VARCHAR(100)
);

CREATE TABLE pedidos(
    id INT(11) NOT NULL PRIMARY KEY,
    id_solicitante INT(11),
    data_de_compra VARCHAR(100),
    cep VARCHAR(10),
    rua VARCHAR(100),
    numero INT(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    pais VARCHAR(100),
    FOREIGN KEY (id_solicitante) REFERENCES solicitantes(id)
);

CREATE TABLE materiais(
    id INT(11) NOT NULL PRIMARY KEY,
    id_pedido INT(11),
    nome VARCHAR(255),
    marca VARCHAR(255),
    preco FLOAT,
    quantidade INT(10),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
);

CREATE TABLE insumos(
    id INT(11) NOT NULL PRIMARY KEY,
    id_pedido INT(11),
    id_material INT(11),
    descricao TEXT,
    preco FLOAT,
    quantidade INT(10),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_material) REFERENCES materiais(id)
)