var docjs = new function () {
    var _$baseItemMember = $('<div class="item-member"><header></header><main></main></div>');

    this.generate = generate;
    
    function generate(obj) {
        if (typeof obj == 'string') return $.parseHTML(obj);
        if (Array.isArray(obj) == true) {
            var $elements = $();
            for (var i = 0; i < obj.length; i++) $elements = $elements.add(generate(obj[i]));
            return $elements;
        }

        if (typeof obj == 'object') {
            var plugin_name = obj._;

            var fn = plugins[plugin_name];

            if (fn != undefined) return fn(obj);
            else {
                if (plugin_name != undefined) console.warn('Missing a plugin: ' + plugin_name, obj);


                if (isOnlyContainSupportKeys(obj, ["id", "icon", "name", "content", "syntax", "syntax_language"]) == false) {
                    // when code reach here, 
                    // we will call default although obj contain non-support keys,
                    console.warn('This obj is a fallback.', obj);
                }

                return plugins.default(obj);
            }
        }

    }

    /**
     * 
     * @param {object} obj
     * @param {string[]} supportKeys
     */
    function isOnlyContainSupportKeys(obj, supportKeys) {
        var keys = Object.keys(obj);

        return keys.every(function (key, index) {
            return supportKeys.indexOf(key) != -1;
        });

    }


    var plugins = {
        'default': function (obj) {
            var $element = _$baseItemMember.clone();
            var $header = $element.find('>header');
            var $main = $element.find('>main');

            if (obj.id != undefined) $element.attr('id', obj.id);
            if (obj.icon != undefined) $header.append('<div class="icon ' + obj.icon + '"></div>');
            if (obj.name != undefined) $header.append('<div class="name">' + obj.name + '</div>');


            if (obj.syntax != undefined) {
                var $code = $('<div class="name-syntax">' + obj.syntax + '</div>');
                if (obj.syntax_language != undefined) $code.addClass(obj.syntax_language);

                hljs.highlightBlock($code[0]);
                $header.append($code);
            }

            if (obj.content != undefined) {
                $element.find('>main').append(generate(obj.content));
            }

            
            
            return $element;
        },
        'overloads': function (obj) {
            var $element = $('<div class="item-overloads"></div>');

            if (Array.isArray(obj.overloads) == true) {

                for (var i = 0; i < obj.overloads.length; i++) $element.append(generate(obj.overloads[i]));
                if (obj.overloads.length >= 2) $element = $('<h3>Overloads</h3>').add($element);
                else {
                    //$element.find('>.item-member').removeClass('collapsed');
                }
            } else {
                $element.append(generate(obj.overloads));
            }

            return $element;
        },
        'item-members': function (obj) {
            var $elements = $('<div class="item-members"></div>');

            if (obj.content != undefined) $elements.append(generate(obj.content));

            return $elements;
        },

        'property': function (obj) {

            var $element = plugins.default(obj).addClass('item-property');
            var $header = $element.find('>header');
            var $main = $element.find('>main');

            if (obj.type != undefined || obj.default != undefined) {
                var $info = $('<div class="property-info"></div>');

                if (obj.type != undefined) {
                    $info.append('<div class="property type" title="Type"><div class="name">Type</div><a class="value">' + obj.type + '</a></div>');

                    var typeref = obj.type_ref || obj.typeref;
                    if (typeref != undefined) $info.find('.type>.value').attr('href', typeref);

                }
                if (obj.default != undefined) {

                    var $property = $('<div class="property default" title="Default Value"><div class="name">Default</div></div>');

                    var default_text;
                    if (typeof obj.default === "string") default_text = obj.default;
                    else if (typeof obj.default === "object") default_text = JSON.stringify(obj.default);
                    else default_text = obj.default;

                    var $value = $('<div class="value javascript">' + default_text + '</div>').appendTo($property);

                    $info.append($property);

                    hljs.highlightBlock($value[0]);

                }
                    

                $main.prepend($info);
            }

            return $element;
        },
        'sproperty': function (obj) {
            var $element = plugins.property(obj);
            $element.find('>main>.property-info').removeClass('property-info').addClass('sproperty-info');;
            return $element;
        },

        'parameter': function (obj) {
            var $header = $('<header></header>');
            var $main =   $('<main></main>');

            var $element = $('<div class="item-parameter"></div>').append($header, $main);

            if (obj.name != undefined) $header.append('<div class="name">' + obj.name + '</div>');
            if (obj.type != undefined) {
                var $type = $('<a class="type">' + obj.type + '</a>');

                var typeref = obj.type_ref || obj.typeref;
                if (typeref != undefined) $type.attr('href', typeref);

                $header.append($type);
            }

            $main.append(generate(obj.content));

            return $element;
        },
        'code-block': function (obj) {
            
            var $element = $('<div class="item-code-block expanded"></div>')
            var $code = $('<code></code>').html(obj.code);

            if (obj.name != undefined) $element.append('<header>' + obj.name + '</header>');
            if (obj.language != undefined) $code.addClass(obj.language);

            $element.append($code);

            hljs.highlightBlock($code[0]);

            return $element;
        },
        'list': function (obj) {
            var $element = $('<ol class="item-list"></ol>');

            for (var i = 0; i < obj.content.length; i++) {
                var $li = $('<li></li>');
                $li.append(generate(obj.content[i]));
                $element.append($li);
            }
            return $element;
        }
    };
    this.plugins = plugins;
}();


$(document).ready(function () {
    $(document).on('click', '.item-member>header', function () {
        $(this).parent('.item-member').toggleClass('expanded');

        var id = $(this).parents('.item-member').attr('id');
        if (id) {
            history.replaceState({}, document.title, '#' + id);
        }
    });
    $(document).on('click', '.item-code-block>header', function () {
        $(this).parent('.item-code-block').toggleClass('expanded');
    });


    $(document).on('click', 'a', function (e) {
        //e.originalEvent.preventDefault();

        if (this.origin + this.pathname == location.origin + location.pathname) {
            // when ref to the same page
            var hash = this.hash;
            if (hash != "") {
                if (location.hash != this.hash) history.replaceState({}, document.title, this.hash);
                
                e.originalEvent.preventDefault(); // prevent browser scrollIntoView
                var escaped_hash = hash.replace(new RegExp('\\.', 'g'), '\\.');

                jumpTo($(escaped_hash)[0]);
            }
        } else {
            // when ref to another page
        }

        console.log('click');


    });

    function jumpTo(element) {
        if (element instanceof Element == false) return;

        var $element = $(element);

        $element.parents('.item-member').removeClass('expanded expanded-scroll').addClass('expanded');



        $element.removeClass('expanded-scroll');
        element.offsetHeight;
        $element.addClass('expanded expanded-scroll')[0].scrollIntoView({ behavior: "smooth" });

        

    }

    
    var hash = location.hash;
    if (hash != "") {
        //if (location.hash != hash) history.replaceState({}, document.title, this.hash);

        //e.originalEvent.preventDefault(); // prevent browser scrollIntoView
        var escaped_hash = hash.replace(new RegExp('\\.', 'g'), '\\.');

        jumpTo($(escaped_hash)[0]);
    }
    

});
