/**
 * Imports
 * 
 */

require('bootstrap-sass');
require('jquery-mask-plugin');
require('jquery-confirm');

import menu from './header/menu.js';
menu();

import pedidosPendentes from './graphs/pedidos-pendentes.js';
import pedidosPorDia from './graphs/pedidos-por-dia.js';
import pedidosPorSolicitante from './graphs/pedidos-por-solicitante.js';
import dashboard from './graphs/dashboard.js';

import {formFunctions} from './util/form.js';
import {tableMateriais} from './task/materiais.js';
import {tableInsumos} from './task/insumos.js';
import solicitante from './task/solicitante.js';
import pedido from './task/pedido.js';

if(/graphs.html/.test(window.location.href)) {
    dashboard();
    pedidosPendentes();
    pedidosPorDia();
    pedidosPorSolicitante();
} else {
    formFunctions();
    tableMateriais();
    tableInsumos();
    solicitante();
    pedido();
}