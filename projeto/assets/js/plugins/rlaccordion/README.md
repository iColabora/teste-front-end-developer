RLAccordion
===========

A jQuery accordion plugin responsive, flexible & adaptative with signs unicode characters.


## About

A jQuery accordion plugin responsive, flexible & adaptative with signs unicode characters, tested even IE7.

You can use @font-face for assign the unicode too, like Font Awesome and others, or with content: "" pseudo elements css, or sprites using classes.

You can modify the structure, classes and unicodes using the options.


## Usage

### HTML

```
<div id="first">

    <h3>Accordion One</h3>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto illo velit temporibus aliquam eius dolorem dolor laudantium quidem porro obcaecati nesciunt ducimus doloribus molestiae ad praesentium reiciendis enim eligendi fugit!</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio quis delectus ducimus quibusdam ex totam natus sint nemo nam possimus explicabo labore architecto magnam accusantium veritatis tenetur repudiandae ab laboriosam?</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis molestiae molestias atque asperiores illum nisi saepe placeat deleniti commodi dolore cupiditate quas. Ipsum odio quibusdam nemo est ducimus ea nesciunt?</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga eligendi ex aperiam facilis alias! Quaerat asperiores quia molestias laboriosam commodi aspernatur dolorum nostrum impedit perspiciatis cupiditate quas distinctio earum dignissimos.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laboriosam voluptates eum vero iste enim quas a nulla consequuntur quasi. Dolorum minima corporis molestias blanditiis ducimus obcaecati necessitatibus excepturi magnam?</p>
    </div>

    <h3>Accordion Two</h3>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto illo velit temporibus aliquam eius dolorem dolor laudantium quidem porro obcaecati nesciunt ducimus doloribus molestiae ad praesentium reiciendis enim eligendi fugit!</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio quis delectus ducimus quibusdam ex totam natus sint nemo nam possimus explicabo labore architecto magnam accusantium veritatis tenetur repudiandae ab laboriosam?</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis molestiae molestias atque asperiores illum nisi saepe placeat deleniti commodi dolore cupiditate quas. Ipsum odio quibusdam nemo est ducimus ea nesciunt?</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga eligendi ex aperiam facilis alias! Quaerat asperiores quia molestias laboriosam commodi aspernatur dolorum nostrum impedit perspiciatis cupiditate quas distinctio earum dignissimos.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laboriosam voluptates eum vero iste enim quas a nulla consequuntur quasi. Dolorum minima corporis molestias blanditiis ducimus obcaecati necessitatibus excepturi magnam?</p>
    </div>

</div><!-- end of first -->

```

### JS

#### How to implement:

```
<script>

    $(function() {

        jQuery("#first").rlAccordion();

        // or with options
        jQuery("#second").rlAccordion('single',{

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

        });

        jQuery("#thirth").rlAccordion('mix',{

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
        });

    });

</script>

// All options are variables that can be adapted to your code.

```

## jQuery plugin page

https://plugins.jquery.com/rlAccordion/


## Demo:

http://rodrigoludgero.com/rlaccordion/rlaccordion.html


## License

```

Copyright (c) 2013 Rodrigo Ludgero Licensed under the MIT license

The MIT License

Copyright (c) 2013 Rodrigo Ludgero, http://rodrigoludgero.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```