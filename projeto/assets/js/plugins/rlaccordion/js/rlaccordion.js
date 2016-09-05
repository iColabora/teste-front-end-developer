/*
* Author: Rodrigo Ludgero http://rodrigoludgero.com/
*
* Twitter: @rodrigoludgero
*
* Description: A jQuery accordion plugin
*
* License: MIT licensed
*
* Project: jQuery rlAccordion Plugin https://github.com/Rodrigo-Ludgero
*/

(function( $ ) {

    $.fn.rlAccordion = function(method, options) {
        var settings = $.extend({
            rlAccordion: 'rlAccordion', // add class in the same level of a parent statement for avoid styles conflict
            signTag: '<span></span>',   // html tag parent signs
            titles: 'h3',               // html tag parent of minus and plus, this may replaced also for a class
            titlesChild: 'span',        // html child titles and parent signs
            container: 'div',           // html tag adjacent sibling of titles
            childNumOptions: true,      // Active childNum option
            childNum: 0,                // number of the children start open
            classOpen: 'opened',        // add class to the titles option adjacent sibling
            open: '&#x2b;',             // unicode plus sign
            close: '&#x2212;',          // unicode minus sign
            rlOpen: 'rl-open',          // class for a plus sign
            rlClose: 'rl-close'         // class for a minus sign
        }, options);

        var $element = $(this).children(settings.titles), // limit the scope
            $symbols = $(settings.signTag),               // create a html tag
            $signOpen = $symbols.html(settings.open),     // insert a unicode open sign into the parent
            $signClose = $symbols.html(settings.close),   // insert a unicode close sign into the parent
            $insertElement = $symbols.appendTo($element); // insert symbols signs into titles settings

        // add class in the same level of a parent statement for avoid styles conflict
        $element
            .parent()
            .addClass(settings.rlAccordion);

        // parse code to assign the corresponding unicode and class
        if ($element.next().hasClass(settings.classOpen)) {
            $element
                .children()
                .html(settings.close)
                .addClass(settings.rlClose);
        }
        else {
            $element
                .children()
                .html(settings.open)
                .addClass(settings.rlOpen);
        }

        var methods = {

            init: function() { // defaults settings

                return this.each(function() {

                    if (settings.childNumOptions === true) {

                        $(this)
                            .children(settings.container)
                            .eq(settings.childNum)
                            .addClass(settings.classOpen)
                            .slideDown()
                            .prev()
                            .children()
                            .html(settings.close)
                            .removeClass(settings.rlOpen)
                            .addClass(settings.rlClose); // assign the children start open
                    }

                    $element.on('click', function() {
                        $(this)
                            .parent()
                            .children(settings.container)
                            .removeClass(settings.classOpen)
                            .slideUp();
                        $(this)
                            .parent()
                            .children(settings.titles)
                            .children()
                            .html(settings.open);
                        $(this)
                            .next()
                            .addClass(settings.classOpen)
                            .slideDown();

                        if ($(this).children().hasClass(settings.rlClose)) {
                            $(this)
                                .next()
                                .stop();
                        }

                        if ($(this).next().hasClass(settings.classOpen)) {
                            $(this)
                                .parent()
                                .find(settings.titles)
                                .children()
                                .removeClass(settings.rlClose)
                                .addClass(settings.rlOpen);

                            $(this)
                                .children()
                                .html(settings.close)
                                .removeClass(settings.rlOpen)
                                .addClass(settings.rlClose);
                        }

                        else {
                            $(this)
                                .children()
                                .html(settings.open)
                                .removeClass(settings.rlClose)
                                .addClass(settings.rlOpen);
                        }
                    });

                });

            },

            single: function() {

                return this.each(function() {

                    if (settings.childNumOptions === true) {

                        $(this)
                            .children(settings.container)
                            .eq(settings.childNum)
                            .addClass(settings.classOpen)
                            .slideDown()
                            .prev()
                            .children()
                            .html(settings.close)
                            .removeClass(settings.rlOpen)
                            .addClass(settings.rlClose); // assign the children start open
                    }

                    $element.on('click', function() {
                        $(this)
                            .next()
                            .slideToggle()
                            .toggleClass(settings.classOpen);

                        if ($(this).next().hasClass(settings.classOpen)) {
                            $(this)
                                .children()
                                .html(settings.close)
                                .removeClass(settings.rlOpen)
                                .addClass(settings.rlClose);
                        }

                        else {
                            $(this)
                                .children()
                                .html(settings.open)
                                .removeClass(settings.rlClose)
                                .addClass(settings.rlOpen);
                        }
                    });

                });

            },

            mix: function() {

                return this.each(function() {

                    if (settings.childNumOptions === true) {

                        $(this)
                            .children(settings.container)
                            .eq(settings.childNum)
                            .addClass(settings.classOpen)
                            .slideDown()
                            .prev()
                            .children()
                            .html(settings.close)
                            .removeClass(settings.rlOpen)
                            .addClass(settings.rlClose); // assign the children start open
                    }

                    $element.on('click', function() {
                        if ($(this).next().hasClass(settings.classOpen)) {
                            $(this)
                                .parent()
                                .children(settings.container)
                                .removeClass(settings.classOpen)
                                .slideUp();
                            $(this)
                                .parent()
                                .children(settings.titles)
                                .children()
                                .html(settings.open)
                                .removeClass(settings.rlClose)
                                .addClass(settings.rlOpen);
                            $(this)
                                .children()
                                .html(settings.open);
                        }

                        else {
                            $(this)
                                .parent()
                                .children(settings.container)
                                .removeClass(settings.classOpen)
                                .slideUp();
                            $(this)
                                .next()
                                .addClass(settings.classOpen)
                                .slideDown();
                            $(this)
                                .parent()
                                .children(settings.titles)
                                .children()
                                .html(settings.open)
                                .removeClass(settings.rlClose)
                                .addClass(settings.rlOpen);
                            $(this)
                                .children()
                                .html(settings.close)
                                .removeClass(settings.rlOpen)
                                .addClass(settings.rlClose);
                        }
                    });

                });

            }

        };

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.rlAccordion ' );
        }
    };

})( jQuery );