/* ========================= */
/* Funções do document.ready */
/* ========================= */

/*global $, jQuery, alert*/
/*jshint ignore: start*/
$(function() {
  'use strict';
  //Função do menu que faz o scroll da página
  function smoothScrollNavigation() {
    $('.menu-scroll-to > a[href*=#]:not([href=#])').bind('click', function(event) {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);

        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 80
          }, 1000);
          event.preventDefault();
        }
      }
    });
  }

  //Função do menu responsivo
  function responsiveNavigation() {
    //Verifica o tamanho da tela ou janela do browser
    $(window).bind('load', function() {
      //Se o tamanho da tela ou janela for menor ou igual a 1024px
      if ($(this).width() <= 1024) {
        //Aplica o 'slideUp' ao clicar em cada link do menu fechando nível e sub-nível
        $('.menu li > a').on('click', function() {
          if ($(this).parents('.menu').find('div').hasClass('menu-collapse') === true) {
            $(this).parents('.menu').find('.menu-collapse').slideUp(200);
            $(this).parents('.menu').find('.menu-collapse ul ul').slideUp(200);
            $(this).parents('.menu').find('a').removeClass('menu-item-active');
            $(this).parents('.menu').find('.menu-toggle').toggleClass('menu-expand').removeClass(this);
          }
        });

        //Aplica o 'slideToggle' no evento 'click' abrindo o sub-menu
        $('.menu li > span').on('click', function(event) {
          if ($(this).next().is(':visible') === false) {
            $('.menu ul ul').slideUp(200);
            $('.menu li span').find('a').removeClass('menu-item-active');
          }
          //Adiciona a classe no botão do menu
          $(this).find('a').addClass('menu-item-active');
          //Executa o efeito de abrir e fechar o sub-menu
          $(this).next().slideToggle(200);
          event.stopPropagation();
        });

        //Aplica o 'Toggle' no evento 'click' abrindo o menu
        $('.menu-toggle').on('click', function(event) {
          $(this).toggleClass('menu-expand').parents('.menu').find('.menu-collapse');
          //Esconde a pesquisa após clicar no botão de menu
          $('.search-toggle').removeClass('search-expand');
          $('.form-collapse').hide();
          //Executa a animação de abrir e fechar do menu
          $(this).parent().find('.menu-collapse').animate({
            height: 'toggle',
            opacity: 'toggle'
          }, 200);
          event.stopPropagation();
        });

        //Aplica o 'Toggle' no evento 'click' que abre o campo de pesquisa
        $('.search-toggle').on('click', function(event) {
          $(this).toggleClass('search-expand').parents('.menu').find('.form-collapse');
          //Esconde o menu após clicar no botão de pesquisa
          $('.menu-toggle').removeClass('menu-expand');
          $('.menu-collapse').hide();
          //Executa o efeito de abrir e fechar a pesquisa
          $(this).parent().find('.form-collapse').toggle();
          event.stopPropagation();
        });
      }
    });
  }

  //Função que faz o parallax nas imagens
  function bgParallax() {
    $(window).scroll(function() {
      //Adiciona o parallax em todas as imagens no container que possui a classe '.parallax-bg'
      $('.parallax-bg').each(function() {
        //Aplica o valor do top se a rolagem da janela foi além da parte superior da imagem
        if ($(this).offset().top < $(window).scrollTop()) {
          //Obtem a quantidade de pixels da imagem que está acima do topo da janela
          var difference = $(window).scrollTop() - $(this).offset().top,
            //O valor superior da imagem é obtida pela metade da quantidade que foi dado o scroll
            //Isso dá a ilusão que o scroll da imagem está mais lento que o resto da página
            half = (difference / 2) + 'px';
          $(this).find('img').css('top', half);
        } else {
          //Caso a imagem estiver abaixo do topo da janela, valor do top será 0
          $(this).find('img').css('top', '0');
        }
      });
    });
  }

  //Função que faz o evento de sumir do painel
  function fancyPanels() {
    $('.panel-close-btn').click(function(event) {
      $(this).parent('.panel').fadeOut(200);
      event.preventDefault();
    });
  }

  //Função da navegação por abas
  function tabNavigation() {
    $('.tabs li').siblings().eq(0).addClass('tab-current');
    $('.tab-inside-of').siblings().eq(0).css('display', 'block');

    $('.tabs a').click(function(event) {
      var tab = $(this).attr('href');

      $(this).parent().addClass('tab-current');
      $(this).parent().siblings().removeClass('tab-current');
      $('.tab-inside-of').not(tab).css('display', 'none');
      $(tab).fadeIn(200);

      event.preventDefault();
    });
  }

  //Função que faz o accordion
  function accordion() {
    $('.accordion li').eq(0).addClass('accordion-active');
    $('.accordion li').eq(0).find('.accordion-hidden').css('display', 'block');

    $('.accordion li a').click(function(event) {
      var parent = $(this).parent();

      if ($(parent).hasClass('accordion-active')) {
        return;
      }

      $('.accordion-hidden').not().slideUp(200);

      $(this).next().slideDown(200, function() {
        $(parent).addClass('accordion-active').siblings().removeClass('accordion-active');
      });

      event.stopPropagation();
    });
  }

  //Função que faz o modal / lightbox
  function fancyPopup() {
    //Seleciona os elementos a com atributo rel="popup"
    $('a[rel=popup]').click(function(event) {
      event.preventDefault();

      var id = $(this).attr('href'),
        //Armazena a largura e a altura da tela
        maskWidth = $(window).width(),
        maskHeight = $(document).height(),
        //Armazena a largura e a altura da janela
        winW = $(window).width(),
        winH = $(window).height();

      //Define largura e altura do div#mask iguais ás dimensões da tela
      $('.popup-mask').css({
        width: maskWidth,
        height: maskHeight
      });

      $('.popup-mask').fadeIn(200);
      $('.popup-mask').fadeTo(200, 0.8);
      //Centraliza na tela a janela popup
      $(id).css('top', winH / 2 - $(id).height() / 2);
      $(id).css('left', winW / 2 - $(id).width() / 2);
      $(id).fadeIn(200);
    });

    //Se o botão fechar for clicado
    $('.popup .popup-close').click(function(event) {
      event.preventDefault();
      $('.popup-mask, .popup').hide();
    });

    $(window).bind('load resize', function(event) {
      if ($(this).width() <= 780) {
        $('a[rel=popup]').click(function() {
          $('.popup').css({
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          });
        });
      }

      event.preventDefault();
    });
  }

  //Função que monta inputs de select e upload
  function customize() {
    var box = '<span></span>',
      pointer = '<span></span>',
      att = '<span></span>',
      str = '';

    $('.demo-sb-skin').append($(box).addClass('demo-sb-text'));
    $('.demo-sb-text').after($(pointer).addClass('demo-sb-down'));

    $('select').change(function() {
      str = $(this).find(':selected').text();

      $(this).next('.demo-sb-text').text(str);
    }).trigger('change');

    $('.demo-fl-skin').append($(box).addClass('demo-fn-text'));
    $('.demo-fn-text').after($(att).addClass('demo-fn-icon'));

    $('.demo-file-upload').change(function() {
      var filename = $('input[type=file]').val().split('\\').pop();

      $(this).next('.demo-fn-text').text(filename);
    });

    //Evento focus e blur do search-box
    $('.demo-sf-skin input').focus(function() {
      $(this).parent('.demo-sf-skin').css('box-shadow', '0px 0px 6px rgba(20,158,228,0.25)');
    }).blur(function() {
      $(this).parent('.demo-sf-skin').css('box-shadow', 'none');
    });
  }

  //Função que monta o spinner
  function numberPickr() {
    var min = 0,
      max;

    $('.demo-np-skin input[type="text"]').attr('value', 0);

    $('.demo-np-skin input[type="text"]').keydown(function(e) {
      e.preventDefault();
      return false;
    });

    $('.demo-np-skin .demo-np-btn:first-of-type').on('click', function() {
      if ($('.demo-np-skin input[type="text"]').val() === max) {
        return false;
      }
      $('.demo-np-skin input[type="text"]').val(parseInt($('.demo-np-skin input[type="text"]').val(), 10) + 1);
    });

    $('.demo-np-skin .demo-np-btn:last-of-type').on('click', function() {
      if ($('.demo-np-skin input[type="text"]').val() === min) {
        return false;
      }
      $('.demo-np-skin input[type="text"]').val(parseInt($('.demo-np-skin input[type="text"]').val(), 10) - 1);
    });
  }

  //Função que pega o valor do slider
  function rangeSliderValue() {
    $('[data-slider]').bind('slider:ready slider:changed', function(event, data) {
      $('.demo-range-value').html(data.value.toFixed(0));
    });
  }

  //Função de placeholder para todos os browsers
  var placeholderAdd = function() {
      if ($(this).val() === '') {
        $(this).val($(this).attr('placeholder')).addClass('placeholder');
      }
    },

    placeholderRemove = function() {
      if ($(this).val() === $(this).attr('placeholder')) {
        $(this).val('').removeClass('placeholder');
      }
    };

  if (!$(this).hasOwnProperty($('<input>')[0])) {
    $('input[placeholder], textarea[placeholder]').blur(placeholderAdd).focus(placeholderRemove).each(placeholderAdd);
    $('form').submit(function() {
      $(this).find('input[placeholder], textarea[placeholder]').each(placeholderRemove);
    });
  }

  //Função principal de validação do Form
  function formValidation() {

    //Variáveis de validação de Email, Telefone, Campos numéricos e data
    var foneRegex = /^\([1-9]{2}\) [6-9][0-9]{3,4}\-[0-9]{4}$/,
      numFoneRegex = /^[6-9][0-9]{3,4}\-[0-9]{4}$/,
      emailRegex = /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/,

      //Variável do objeto erro
      objErro = $('<div><span><em></em></span></div>');

    //Aplica a classe na váriável objErro
    $(objErro).addClass('demo-error-note');

    //Função de validação do Form
    $('#demo_validate').submit(function() {
      //Variável que verifica se existe erro no Form
      var isValid = false;

      if ($('.valid-tname').val() === '') {

        if (!isValid) {
          $('.valid-tname').focus();
        }

        $(objErro).find('em').html('Não é um nome válido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tname').parent('div'));
        isValid = true;
      }

      if ($('.valid-tdata-day').val().length < 2 || $('.valid-tdata-month').val().length < 2 || $('.valid-tdata-year').val().length < 4) {

        if (!isValid) {
          $('.valid-tdata-day').focus();
        }

        $(objErro).find('em').html('Não é uma data válida!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tdata-year').parent('div'));
        isValid = true;
      }

      if (!$('.valid-rb.valid-rb-sexo').is(':checked')) {
        $(objErro).find('em').html('Não foi marcada uma opção!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('label[for="rb_sexo_f"]:eq(1)').parent('div'));
        isValid = true;
      }

      if ($('.valid-tnum-ddd').val().length < 2 || $('.valid-tnum-fone').val().length < 9 || !numFoneRegex.test($('.valid-tnum-fone').val())) {

        if (!isValid) {
          $('.valid-tnum-ddd').focus();
        }

        $(objErro).find('em').html('Não é um telefone válido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tnum-fone').parent('div'));
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

      if (!$('.valid-cb.valid-cb-int').is(':checked')) {
        $(objErro).find('em').html('Não foi marcada uma opção!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('label[for="cb_interesses_c6"]:eq(1)').parents('.valid-cb-group'));
        isValid = true;
      }

      if (isValid) {
        return false;
      }
      //Se não existe erros no Form
      alert('Não existem erros... Ocorreu submit!');
    });

    //Função de validação do Form Login
    $('#demo_login_validate').submit(function() {
      if ($('.valid-tmail-required').val() === '' || !emailRegex.test($('.valid-tmail-required').val())) {
        $('.valid-tmail-required').focus();
        $(objErro).find('em').html('Email inválido!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tmail-required').parent('div'));
        return false;
      }

      if ($('.valid-tpass-required').val() === '') {
        $('.valid-tpass-required').focus();
        $(objErro).find('em').html('Senha inválida!');
        $(objErro).clone().hide().fadeIn(200).insertAfter($('.valid-tpass-required').parent('div'));
        return false;
      }
      //Se não existe erros no Form
      alert('Bem vindo! Usuário logado...');
    });

    //Função que remove o objeto erro ao clicar no botão de submit
    $('.valid-submit').click(function() {
      $('.demo-error-note').remove();
    });
  }

  //Função que desabilita inputs do form
  $.fn.disableInput = function() {
    return this.each(function() {
      $(this).attr('disabled', true);
      $(this).parent().css('opacity', 0.4);
    });
  };

  //Função que desabilita buttons do form
  $.fn.disableButton = function() {
    return this.each(function() {
      $(this).attr('disabled', true);
      $(this).css('opacity', 0.4);
    });
  };

  /*Função de auto-tab nos campos*/
  $.fn.autoTab = function() {
    var els = this.length;

    for (var i = 0; i < els; i++) {
      var next = i + 1,
        prev = i - 1;

      if (i > 0 && next < this.length) {
        $(this[i])._auTab({
          next: $(this[next]),
          prev: $(this[prev])
        });
      } else if (i > 0) {
        $(this[i])._auTab({
          prev: $(this[prev])
        });
      } else {
        $(this[i])._auTab({
          next: $(this[next])
        });
      }
    }
    return this;
  };

  $.fn._auTab = function(options) {
    var defaults = {
      maxlength: 2147483647,
      prev: null,
      next: null
    };

    $.extend(defaults, options);

    if (defaults.maxlength === 2147483647) {
      defaults.maxlength = $(this).attr('maxlength');
    }

    $(this).bind('keydown', function(e) {
      var cursorPos = $(this).getCursorPosition(),
        keyPressed = e.which,
        charactersEntered = this.value.length;

      if ((keyPressed === 8 || keyPressed === 37) && (charactersEntered === 0 || cursorPos === 0) && defaults.prev) {
        defaults.prev.focus().val(defaults.prev.val());
      }
    });

    $(this).bind('keyup', function(e) {

      var v = $(this).val(),
        keyPressed = e.which,
        cursorPos = $(this).getCursorPosition(),

        ignore_keys = [8, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

      if (defaults.next && ($.inArray(keyPressed, ignore_keys) === -1 && v.length == defaults.maxlength) || (keyPressed === 39 && cursorPos === parseInt(defaults.maxlength, 10))) {
        defaults.next.focus();
      }
    });
    return this;
  };

  $.fn.getCursorPosition = function() {
    var input = this.get(0);
    if (!input) return;
    if ('selectionStart' in input) {
      return input.selectionStart;
    } else if (document.selection) {
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -input.value.length);
      return sel.text.length - selLen;
    }
  };

  //Chamada das funções principais
  smoothScrollNavigation();
  responsiveNavigation();
  bgParallax();
  fancyPanels();
  fancyPagination();
  tabNavigation();
  accordion();
  fancyPopup();
  customize();
  numberPickr();
  rangeSliderValue();
  formValidation();

  //Chamada da função de auto-tab
  $('.autotab').autoTab();
  $('.autotab-date').autoTab();
  $('.autotab-fone').autoTab();

  //Chamada da função que desabilita inputs
  $('.demo-input-disabled').disableInput();
  //Chamada da função que desabilita o spinner
  $('.demo-input-disabled + .demo-np-btn-vertical a').disableInput();
  //Chamada da função que desabilita o button
  $('.demo-btn-disabled').disableButton();
}); //end document.ready


/* ============================ */
/* Função que monta a paginação */
/* ============================ */

function fancyPagination() {
  //Elemento que queremos paginar
  var pageParts = $('.paginate'),
    //Quantidade de páginas
    numPages = pageParts.length,
    //Quantidade de itens por página
    perPage = 1,
    //Métodos executados
    methods = {
      init: function(options) {
        var o = $.extend({
          items: 1,
          itemsOnPage: 1,
          pages: 0,
          displayedPages: 5,
          edges: 2,
          currentPage: 0,
          hrefTextPrefix: '#page',
          hrefTextSuffix: ' ',
          prevText: 'Prev',
          nextText: 'Next',
          ellipseText: '&hellip;',
          selectOnClick: true,
          onPageClick: function(pageNumber, event) {},
          onInit: function() {}
        }, options || {});

        var self = this;

        o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
        o.currentPage = o.currentPage - 1;
        o.halfDisplayed = o.displayedPages / 2;

        this.each(function() {
          self.addClass('fancy-pagination').data('fancyPagination', o);
          methods._draw.call(self);
        });

        o.onInit();

        return this;
      },

      selectPage: function(page) {
        methods._selectPage.call(this, page - 1);
        return this;
      },

      prevPage: function() {
        var o = this.data('fancyPagination');
        if (o.currentPage > 0) {
          methods._selectPage.call(this, o.currentPage - 1);
        }
        return this;
      },

      nextPage: function() {
        var o = this.data('fancyPagination');
        if (o.currentPage < o.pages - 1) {
          methods._selectPage.call(this, o.currentPage + 1);
        }
        return this;
      },

      getPagesCount: function() {
        return this.data('fancyPagination').pages;
      },

      getCurrentPage: function() {
        return this.data('fancyPagination').currentPage + 1;
      },

      destroy: function() {
        this.empty();
        return this;
      },

      redraw: function() {
        methods._draw.call(this);
        return this;
      },

      disable: function() {
        var o = this.data('fancyPagination');
        o.disabled = true;
        this.data('fancyPagination', o);
        methods._draw.call(this);
        return this;
      },

      enable: function() {
        var o = this.data('fancyPagination');
        o.disabled = false;
        this.data('fancyPagination', o);
        methods._draw.call(this);
        return this;
      },

      _draw: function() {
        var o = this.data('fancyPagination'),
          interval = methods._getInterval(o),
          i;

        methods.destroy.call(this);

        var $panel = this.prop("tagName") === "ul" ? this : $('<ul></ul>').appendTo(this);

        if (o.prevText) {
          methods._appendItem.call(this, o.currentPage - 1, {
            text: o.prevText,
            classes: 'page-prev'
          });
        }

        if (interval.start > 0 && o.edges > 0) {
          var end = Math.min(o.edges, interval.start);

          for (i = 0; i < end; i++) {
            methods._appendItem.call(this, i);
          }

          if (o.edges < interval.start && (interval.start - o.edges != 1)) {
            $panel.append('<li class="page-disabled"><span class="page-ellipsis">' + o.ellipseText + '</span></li>');
          } else if (interval.start - o.edges == 1) {
            methods._appendItem.call(this, o.edges);
          }
        }

        for (i = interval.start; i < interval.end; i++) {
          methods._appendItem.call(this, i);
        }

        if (interval.end < o.pages && o.edges > 0) {
          if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
            $panel.append('<li class="page-disabled"><span class="page-ellipsis">' + o.ellipseText + '</span></li>');
          } else if (o.pages - o.edges - interval.end == 1) {
            methods._appendItem.call(this, interval.end++);
          }

          var begin = Math.max(o.pages - o.edges, interval.end);

          for (i = begin; i < o.pages; i++) {
            methods._appendItem.call(this, i);
          }
        }

        if (o.nextText) {
          methods._appendItem.call(this, o.currentPage + 1, {
            text: o.nextText,
            classes: 'page-next'
          });
        }
      },

      _getInterval: function(o) {
        return {
          start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
          end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
        };
      },

      _appendItem: function(pageIndex, opts) {
        var self = this,
          options, $link, o = self.data('fancyPagination'),
          $linkWrapper = $('<li></li>').addClass('page-item'),
          $ul = self.find('ul');

        pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

        options = $.extend({
          text: pageIndex + 1,
          classes: ''
        }, opts || {});

        if (pageIndex == o.currentPage || o.disabled) {
          if (o.disabled) {
            $linkWrapper.addClass('page-disabled');
          } else {
            $linkWrapper.addClass('page-active');
          }
          $link = $('<span class="page-current">' + (options.text) + '</span>');
        } else {
          $link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + (options.text) + '</a>');
          $link.click(function(event) {
            return methods._selectPage.call(self, pageIndex, event);
          });
        }

        if (options.classes) {
          $link.addClass(options.classes);
        }

        $linkWrapper.append($link);

        if ($ul.length) {
          $ul.append($linkWrapper);
        } else {
          self.append($linkWrapper);
        }
      },

      _selectPage: function(pageIndex, event) {
        var o = this.data('fancyPagination');

        o.currentPage = pageIndex;

        if (o.selectOnClick) {
          methods._draw.call(this);
        }

        return o.onPageClick(pageIndex + 1, event);
      }
    };

  $.fn.fancyPagination = function(method) {
    if (methods[method] && method.charAt(0) != '_') {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.fancyPagination');
    }
  };

  //Começa sempre na primeira página
  //Mostra o conteúdo da primeira página e oculta o restante
  pageParts.slice(perPage).hide();

  //Chamada da função de paginação
  $('.pagination').fancyPagination({
    items: numPages,
    itemsOnPage: perPage,
    displayedPages: 2,
    edges: 1,
    currentPage: 1,
    prevText: ' ',
    nextText: ' ',
    //Evento ao clicar em cada página
    onPageClick: function(pageNum, event) {
      //Quantidade de páginas que serão exibidas
      var start = perPage * (pageNum - 1),
        end = start + perPage;
      //Primeiro oculta todos os itens de cada página
      //Mostra apenas o item da página atual
      pageParts.hide().slice(start, end).show();
      //Evita o comportamento padrão do link
      event.preventDefault();
    }
  });
}


/* ========================= */
/* Função que monta o slider */
/* ========================= */

var __slice = [].slice,
  __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };

(function($, window) {
  var rangeSlider;
  rangeSlider = (function() {
    function rangeSlider(input, options) {
      var ratio,
        _this = this;
      this.input = input;
      this.defaultOptions = {
        animate: true,
        snapMid: false,
        classPrefix: null,
        classSuffix: null,
        theme: null,
        highlight: true
      };
      this.settings = $.extend({}, this.defaultOptions, options);
      if (this.settings.theme) {
        this.settings.classSuffix = '-' + this.settings.theme;
      }
      this.input.hide();
      this.slider = $('<div>').addClass('demo-slider' + (this.settings.classSuffix || '')).css({
        position: 'relative',
        userSelect: 'none',
        boxSizing: 'border-box'
      }).insertBefore(this.input);
      if (this.input.attr('id')) {
        this.slider.attr('id', this.input.attr('id') + '_slider');
      }
      this.track = this.createDivElement('demo-track').css({
        width: '100%'
      });
      if (this.settings.highlight) {
        this.highlightTrack = this.createDivElement('demo-highlight-track').css({
          width: '0'
        });
      }
      this.dragger = this.createDivElement('demo-dragger');
      this.slider.css({
        minHeight: this.dragger.outerHeight(),
        marginLeft: this.dragger.outerWidth() / 2,
        marginRight: this.dragger.outerWidth() / 2
      });
      this.track.css({
        marginTop: this.track.outerHeight() / -2
      });
      if (this.settings.highlight) {
        this.highlightTrack.css({
          marginTop: this.track.outerHeight() / -2
        });
      }
      this.dragger.css({
        marginTop: this.dragger.outerHeight() / -2,
        marginLeft: this.dragger.outerWidth() / -2
      });
      this.track.mousedown(function(e) {
        return _this.trackEvent(e);
      });
      if (this.settings.highlight) {
        this.highlightTrack.mousedown(function(e) {
          return _this.trackEvent(e);
        });
      }
      this.dragger.mousedown(function(e) {
        if (e.which !== 1) {
          return;
        }
        _this.dragging = true;
        _this.dragger.addClass('dragging');
        _this.domDrag(e.pageX, e.pageY);
        return false;
      });
      $('body').mousemove(function(e) {
        if (_this.dragging) {
          _this.domDrag(e.pageX, e.pageY);
          return $('body').css({
            cursor: 'pointer'
          });
        }
      }).mouseup(function(e) {
        if (_this.dragging) {
          _this.dragging = false;
          _this.dragger.removeClass('dragging');
          return $('body').css({
            cursor: 'auto'
          });
        }
      });

      //Suporte para mobile
      this.dragger.bind('touchstart', function(e) {
        _this.dragging = true;
        _this.dragger.addClass('dragging');
        _this.domDrag(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
        return false;
      });

      $('body').bind('touchmove', function(e) {
        if (_this.dragging) {
          _this.domDrag(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
          return false;
        }
      }).bind('touchend', function(e) {
        if (_this.dragging) {
          _this.dragging = false;
          _this.dragger.removeClass('dragging');
          return $('body').css({
            cursor: 'auto'
          });
        }
      });

      this.pagePos = 0;
      if (this.input.val() === '') {
        this.value = this.getRange().min;
        this.input.val(this.value);
      } else {
        this.value = this.nearestValidValue(this.input.val());
      }
      this.setSliderPositionFromValue(this.value);
      ratio = this.valueToRatio(this.value);
      this.input.trigger('slider:ready', {
        value: this.value,
        ratio: ratio,
        position: ratio * this.slider.outerWidth(),
        el: this.slider
      });
    }

    rangeSlider.prototype.createDivElement = function(classname) {
      var item;
      item = $('<div>').addClass(classname).css({
        position: 'absolute',
        top: '50%',
        userSelect: 'none',
        cursor: 'pointer'
      }).appendTo(this.slider);
      return item;
    };

    rangeSlider.prototype.setRatio = function(ratio) {
      var value;
      ratio = Math.min(1, ratio);
      ratio = Math.max(0, ratio);
      value = this.ratioToValue(ratio);
      this.setSliderPositionFromValue(value);
      return this.valueChanged(value, ratio, 'setRatio');
    };

    rangeSlider.prototype.setValue = function(value) {
      var ratio;
      value = this.nearestValidValue(value);
      ratio = this.valueToRatio(value);
      this.setSliderPositionFromValue(value);
      return this.valueChanged(value, ratio, 'setValue');
    };

    rangeSlider.prototype.trackEvent = function(e) {
      if (e.which !== 1) {
        return;
      }
      this.domDrag(e.pageX, e.pageY, true);
      this.dragging = true;
      return false;
    };

    rangeSlider.prototype.domDrag = function(pageX, pageY, animate) {
      var pagePos, ratio, value;
      if (animate === null) {
        animate = false;
      }
      pagePos = pageX - this.slider.offset().left;
      pagePos = Math.min(this.slider.outerWidth(), pagePos);
      pagePos = Math.max(0, pagePos);
      if (this.pagePos !== pagePos) {
        this.pagePos = pagePos;
        ratio = pagePos / this.slider.outerWidth();
        value = this.ratioToValue(ratio);
        this.valueChanged(value, ratio, 'domDrag');
        if (this.settings.snap) {
          return this.setSliderPositionFromValue(value, animate);
        } else {
          return this.setSliderPosition(pagePos, animate);
        }
      }
    };

    rangeSlider.prototype.setSliderPosition = function(position, animate) {
      if (animate === null) {
        animate = false;
      }
      if (animate && this.settings.animate) {
        this.dragger.animate({
          left: position
        }, 200);
        if (this.settings.highlight) {
          return this.highlightTrack.animate({
            width: position
          }, 200);
        }
      } else {
        this.dragger.css({
          left: position
        });
        if (this.settings.highlight) {
          return this.highlightTrack.css({
            width: position
          });
        }
      }
    };

    rangeSlider.prototype.setSliderPositionFromValue = function(value, animate) {
      var ratio;
      if (animate === null) {
        animate = false;
      }
      ratio = this.valueToRatio(value);
      return this.setSliderPosition(ratio * this.slider.outerWidth(), animate);
    };

    rangeSlider.prototype.getRange = function() {
      if (this.settings.allowedValues) {
        return {
          min: Math.min.apply(Math, this.settings.allowedValues),
          max: Math.max.apply(Math, this.settings.allowedValues)
        };
      } else if (this.settings.range) {
        return {
          min: parseFloat(this.settings.range[0]),
          max: parseFloat(this.settings.range[1])
        };
      } else {
        return {
          min: 0,
          max: 1
        };
      }
    };

    rangeSlider.prototype.nearestValidValue = function(rawValue) {
      var closest, maxSteps, range, steps;
      range = this.getRange();
      rawValue = Math.min(range.max, rawValue);
      rawValue = Math.max(range.min, rawValue);
      if (this.settings.allowedValues) {
        closest = null;
        $.each(this.settings.allowedValues, function() {
          if (closest === null || Math.abs(this - rawValue) < Math.abs(closest - rawValue)) {
            return closest = this;
          }
        });
        return closest;
      } else if (this.settings.step) {
        maxSteps = (range.max - range.min) / this.settings.step;
        steps = Math.floor((rawValue - range.min) / this.settings.step);
        if ((rawValue - range.min) % this.settings.step > this.settings.step / 2 && steps < maxSteps) {
          steps += 1;
        }
        return steps * this.settings.step + range.min;
      } else {
        return rawValue;
      }
    };

    rangeSlider.prototype.valueToRatio = function(value) {
      var allowedVal, closest, closestIdx, idx, range, _i, _len, _ref;
      if (this.settings.equalSteps) {
        _ref = this.settings.allowedValues;
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          allowedVal = _ref[idx];
          if (!(typeof closest !== 'undefined' && closest !== null) || Math.abs(allowedVal - value) < Math.abs(closest - value)) {
            closest = allowedVal;
            closestIdx = idx;
          }
        }
        if (this.settings.snapMid) {
          return (closestIdx + 0.5) / this.settings.allowedValues.length;
        } else {
          return closestIdx / (this.settings.allowedValues.length - 1);
        }
      } else {
        range = this.getRange();
        return (value - range.min) / (range.max - range.min);
      }
    };

    rangeSlider.prototype.ratioToValue = function(ratio) {
      var idx, range, rawValue, step, steps;
      if (this.settings.equalSteps) {
        steps = this.settings.allowedValues.length;
        step = Math.round(ratio * steps - 0.5);
        idx = Math.min(step, this.settings.allowedValues.length - 1);
        return this.settings.allowedValues[idx];
      } else {
        range = this.getRange();
        rawValue = ratio * (range.max - range.min) + range.min;
        return this.nearestValidValue(rawValue);
      }
    };

    rangeSlider.prototype.valueChanged = function(value, ratio, trigger) {
      var eventData;
      if (value.toString() === this.value.toString()) {
        return;
      }
      this.value = value;
      eventData = {
        value: value,
        ratio: ratio,
        position: ratio * this.slider.outerWidth(),
        trigger: trigger,
        el: this.slider
      };
      return this.input.val(value).trigger($.Event('change', eventData)).trigger('slider:changed', eventData);
    };
    return rangeSlider;
  })();

  $.extend($.fn, {
    rangeSlider: function() {
      var params, publicMethods, settingsOrMethod;
      settingsOrMethod = arguments[0], params = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      publicMethods = ['setRatio', 'setValue'];
      return $(this).each(function() {
        var obj, settings;
        if (settingsOrMethod && __indexOf.call(publicMethods, settingsOrMethod) >= 0) {
          obj = $(this).data('slider-object');
          return obj[settingsOrMethod].apply(obj, params);
        } else {
          settings = settingsOrMethod;
          return $(this).data('slider-object', new rangeSlider($(this), settings));
        }
      });
    }
  });

  return $(function() {
    return $('[data-slider]').each(function() {
      var $el, allowedValues, settings, x;
      $el = $(this);
      settings = {};
      allowedValues = $el.data('slider-values');
      if (allowedValues) {
        settings.allowedValues = (function() {
          var _i, _len, _ref, _results;
          _ref = allowedValues.split(',');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push(parseFloat(x));
          }
          return _results;
        })();
      }
      if ($el.data('slider-range')) {
        settings.range = $el.data('slider-range').split(',');
      }
      if ($el.data('slider-step')) {
        settings.step = $el.data('slider-step');
      }
      settings.snap = $el.data('slider-snap');
      settings.equalSteps = $el.data('slider-equal-steps');
      if ($el.data("slider-theme")) {
        settings.theme = $el.data('slider-theme');
      }
      if ($el.attr('data-slider-highlight')) {
        settings.highlight = $el.data('slider-highlight');
      }
      if ($el.data('slider-animate') != null) {
        settings.animate = $el.data('slider-animate');
      }
      return $el.rangeSlider(settings);
    });
  });
})(this.jQuery || this.Zepto, this);


/* =================================== */
/* Função que cria máscaras nos campos */
/* =================================== */

//Função principal
function mask(o, f) {
  v_obj = o;
  v_fun = f;

  setTimeout('startMask()', 1);
}

//Função que inicia a máscara
function startMask() {
  v_obj.value = v_fun(v_obj.value);
}

//Apenas números
function numbrMask(v) {
  v = v.replace(/\D/g, '');
  return v;
}

//Formata o campo data
function dateMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d{2})(\d)/, '$1/$2');
  v = v.replace(/(\d{2})(\d)/, '$1/$2');
  return v;
}

//Formata o campo telefone e celular
function phoneMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
  v = v.replace(/(\d)(\d{4})$/, '$1-$2');
  return v;
}

//Formata o campo telefone sem DDD
function phoneNumbrMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d)(\d{4})$/, '$1-$2');
  return v;
}

//Formata o campo CEP
function cepMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{5})(\d)/, '$1-$2');
  return v
}

//Formata o campo cpf
function cpfMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return v;
}

//Formata o campo cnpj
function cnpjMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');
  return v;
}

//Formata o campo valor em dinheiro
function moneyMask(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d)(\d{14})$/, '$1.$2');
  v = v.replace(/(\d)(\d{11})$/, '$1.$2');
  v = v.replace(/(\d)(\d{8})$/, '$1.$2');
  v = v.replace(/(\d)(\d{5})$/, '$1.$2');
  v = v.replace(/(\d)(\d{2})$/, '$1,$2');
  return v;
}

//Carrega a função de máscara no campo
$(window).on('load', function() {
  $('.mask-data').on('keyup', function() {
    mask(this, dateMask);
  });

  $('.mask-num').on('keyup', function() {
    mask(this, numbrMask);
  });

  $('.mask-fnum').on('keyup', function() {
    mask(this, phoneNumbrMask);
  });

  $('.mask-cep').on('keyup', function() {
    mask(this, cepMask);
  });

  $('.mask-fone').on('keyup', function() {
    mask(this, phoneMask);
  });

  $('.mask-cpf').on('keyup', function() {
    mask(this, cpfMask);
  });

  $('.mask-cnpj').on('keyup', function() {
    mask(this, cnpjMask);
  });

  $('.mask-money').on('keyup', function() {
    mask(this, moneyMask);
  });
});
/*jshint ignore:end*/