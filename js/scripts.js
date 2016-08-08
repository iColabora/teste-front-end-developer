/* ========================= */
/* Funções do document.ready */
/* ========================= */

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

  //Função de validação do Form
  function formValidate() {
    //Regex para validações de campos específicos
    var numRegex = /^\d$/,
      moneyRegex = /^\d{1,3}(?:\.\d{3})*,\d{2}$/,
      foneRegex = /^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$/,
      cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/,
      cepRegex = /^[0-9]{5}-[0-9]{3}$/,
      emailRegex = /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/,
      dataRegex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((1[6-9]|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/,

      //Variável do objeto erro
      objErro = $('<div><span><em></em></span></div>');

    //Aplica a classe na váriável objErro
    $(objErro).addClass('demo-error-note');

    //Função de validação do Form
    $('.form-validate').submit(function() {
      //Variável que verifica se existe erro no Form
      var isValid = false;

      if ($('.required').val() === '') {

        if (!isValid) {
          $('.required').focus();
        }

        $(objErro).find('em').html('É um campo obrigatório!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.required').parent('div'));

        isValid = true;
      }

      if ($('.valid-tdata').val() === '' || !dataRegex.test($('.valid-tdata').val())) {

        if (!isValid) {
          $('.valid-tdata').focus();
        }

        $(objErro).find('em').html('Não é uma data válida!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tdata').parent('div'));

        isValid = true;
      }

      if ($('.valid-tnum').val() === '' || !numRegex.test($('.valid-tnum').val())) {

        if (!isValid) {
          $('.valid-tnum').focus();
        }

        $(objErro).find('em').html('Digite um valor maior que zero!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tnum').parent('div'));

        isValid = true;
      }


      if ($('.valid-tfone').val() === '' || !foneRegex.test($('.valid-tfone').val())) {

        if (!isValid) {
          $('.valid-tfone').focus();
        }

        $(objErro).find('em').html('Não é um telefone válido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tfone').parent('div'));

        isValid = true;
      }

      if ($('.valid-tcpf').val() === '' || !cpfRegex.test($('.valid-tcpf').val())) {

        if (!isValid) {
          $('.valid-tcpf').focus();
        }

        $(objErro).find('em').html('Não é um CPF válido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tcpf').parent('div'));

        isValid = true;
      }

      if ($('.valid-tcep').val() === '' || !cpfRegex.test($('.valid-tcep').val())) {

        if (!isValid) {
          $('.valid-tcep').focus();
        }

        $(objErro).find('em').html('Não é um CEP válido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tcep').parent('div'));

        isValid = true;
      }

      if ($('.valid-tmoney').val() === '' || !moneyRegex.test($('.valid-tmoney').val())) {

        if (!isValid) {
          $('.valid-tmoney').focus();
        }

        $(objErro).find('em').html('Informe o valor!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tmoney').parent('div'));

        isValid = true;
      }

      if ($('.valid-select-box').val() === '') {

        if (!isValid) {
          $('.valid-select-box').focus();
        }

        $(objErro).find('em').html('Selecione uma opção!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-select-box').parent('div'));

        isValid = true;
      }

      if ($('.valid-tmail').val() === '' || !emailRegex.test($('.valid-tmail').val())) {

        if (!isValid) {
          $('.valid-tmail').focus();
        }

        $(objErro).find('em').html('Não é um e-mail válido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tmail').parent('div'));

        isValid = true;
      }

      if ($('.valid-tmail-cf').val() === '') {

        if (!isValid) {
          $('.valid-tmail-cf').focus();
        }

        $(objErro).find('em').html('Preenchimento obrigatório!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tmail-cf').parent('div'));
        isValid = true;
      } else if ($('.valid-tmail-cf').val() !== $('.valid-tmail').val()) {

        if (!isValid) {
          $('.valid-tmail-cf').focus();
        }

        $(objErro).find('em').html('Os dados preenchidos não são iguais!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tmail-cf').parent('div'));

        isValid = true;
      }

      if (isValid) {
        return false;
      }
      //Se não existe erros no Form
      alert('Não existem erros... Ocorreu submit!');
    });

    //Função que remove o objeto erro ao clicar no botão de submit
    $('.valid-submit').click(function() {
      $('.demo-error-note').remove();
    });
  }

  //Chamada das funções principais
  fancyDropdown();
  fancySearchBox();
  formValidate();
});
/*jshint ignore:end*/