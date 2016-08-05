/*global $, jQuery, alert*/
/*jshint ignore: start*/
$(function() {
  'use strict';
  //Função do botão dropdown
  function fancyDropdown() {
    //Verifica o tamanho da tela ou janela do browser
    $(window).bind('load', function(event) {
      //Se o tamanho da tela ou janela for menor ou igual a 1024px
      if ($(this).width() <= 1024) {
        //Aplica o 'toggle' no evento 'click' abrindo o sub-menu do dropdown 
        $('.dropdown span').on('click', function(event) {
          $(this).toggleClass('dropdown-expand').next('ul').addClass('dropdown-visible');
          $(this).parent().find('.dropdown-visible').toggle();
          //Esconde o menu e a pesquisa     
          $('.menu-toggle').removeClass('menu-expand');
          $('.menu-collapse').hide();
          $('.search-toggle').removeClass('search-expand');
          $('.form-collapse').hide();
          event.stopPropagation();
        });

        //Esconde o sub-menu do dropdown ao clicar no botão menu ou pesquisa
        $('.menu-toggle, .search-toggle').on('click', function() {
          $('.dropdown span').removeClass('dropdown-expand');
          $('.dropdown-visible').hide();
        });
      } else {
        $('.dropdown span').on('click', function(event) {
          $(this).toggleClass('dropdown-expand').next('ul').addClass('dropdown-visible');
          $(this).parent().find('.dropdown-visible').toggle();
          event.stopPropagation();
        });
      }

      return false;
    });
  }

  //Função do botão pesquisar
  function fancySearchBox() {
    //Aplica o 'toggle' no evento 'click' abrindo o campo de pesquisa no menu 
    $('.menu-search').on('click', function(event) {
      $(this).toggleClass('search-expand');
      $(this).parents('.menu-collapse').next('.form-collapse').animate({
        width: 'toggle',
        opacity: 'toggle'
      }, 200);
      event.stopPropagation();
    });
  }

  //Chamada das funções principais
  fancyDropdown();
  fancySearchBox();
});
/*jshint ignore:end*/