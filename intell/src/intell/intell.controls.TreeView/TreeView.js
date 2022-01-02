
intell.controls.TreeView = new function() {
    if (globalThis.ServiceWorkerGlobalScope) return;

    /** @type {Intell.Controls.TreeView.Namespace} */
    var ns = this;


    /** @type Intell.Controls.TreeView.TreeViewConstructor */
    var TreeView = function() {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';

        TreeView = function TreeView(element) {
            if (this instanceof TreeView == false) return new TreeView(element);

            if (element == null) element = document.createElement('div');
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__TreeView__ != undefined) return element.__TreeView__;
            
            /** @type Intell.Controls.TreeView.TreeView */
            var _this = element.__TreeView__ = this;
            var $element = $(element);
            var $elementItemAbstract = $element.find('.Item.abstract').remove().removeClass('abstract');
            var rootNode = new TreeNode(element);

            TreeNode.getPrivate(rootNode).treeView = this;

            /** @type Intell.Controls.TreeView.TreeViewPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementItemAbstract = $elementItemAbstract[0];
            __private.rootNode = rootNode;
            __private.children = [];


            // events
            _this.onnodeclick = intell.createEventFunction();
            _this.onnodedoubleclick = intell.createEventFunction();
            _this.onnodeexpand = intell.createEventFunction();
            _this.onnodemousedown = intell.createEventFunction();
            _this.onnodemouseup = intell.createEventFunction();

            // handle events
            $element.on('click', '.Item .Label', function(e) {

                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);


                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;
                    e.stopImmediatePropagation();

                    _this.selectedNode = node;
                    _this.onnodeclick({ node: node, event: e.originalEvent });

                }
            });
            $element.on('dblclick', '.Item .Label', function(e) {

                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);

                
                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;
                    e.stopImmediatePropagation();

                    _this.selectedNode = node;
                    _this.onnodedoubleclick({ node: node, event: e.originalEvent });
                }
            });
            $element.on('mousedown', '.Item .Label', function(e) {
                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);


                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;

                    _this.onnodemousedown({ node: node, event: e.originalEvent });

                }
            });
            $element.on('mouseup', '.Item .Label', function(e) {
                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);


                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;

                    _this.onnodemouseup({ node: node, event: e.originalEvent });

                }
            });
            $element.on('click', '.Item .Arrow', function(e) {

                var $item = $(this).closest('.Item');
                $item.toggleClass('EXPANDED');
                var element = $item[0];
                var node = element.__TreeNode__;

                if ($item.is('.EXPANDED') == true) {
                    _this.onnodeexpand({ node: node, event: e.originalEvent });
                }

                //e.stopImmediatePropagation();
            });
        }

        // prototype
        !function() {
            var prototype = TreeView.prototype;
            
            // property
            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function() { throw new Error("'ListView.element' cannot be assigned to -- it is read only") }
                },
                elementItemAbstract: {
                    get: function() { return getPrivate(this).elementItemAbstract },
                    set: function(newValue) { throw new Error("'ListView.elementItemAbstract' cannot be assigned to -- it is read only") }
                },
                
                selectedNode: {
                    get: function() { return getPrivate(this).selectedNode },
                    /** @param {Intell.Controls.TreeView.TreeNode} newValue */
                    set: function(newValue) {
                        var __private = getPrivate(this);
                        var selectedNode = __private.selectedNode;

                        if (newValue == selectedNode) return;
                        if (newValue.treeView != this) throw new Error("can't select a node that is not belong to TreeView.");

                        // ux/ui for previous 
                        if (selectedNode != null) $(selectedNode.element).removeClass('SELECTED');

                        // ux/ui for current
                        selectedNode = __private.selectedNode = newValue;
                        if (selectedNode != null) $(selectedNode.element).addClass('SELECTED');
                    }
                },
                children: {
                    get: function() { return getPrivate(this).rootNode.children },
                    set: function(newValue) { throw new Error("'TreeNode.children' cannot be assigned to -- it is read only") }
                }
            });

            // methods
            prototype.add = function() {
                var rootNode = getPrivate(this).rootNode;
                return rootNode.add.apply(rootNode, arguments);
            }
            prototype.clear = function() { getPrivate(this).rootNode.clear(); }

        }();

        // static

        /** @param {Intell.Controls.TreeView.TreeView} node @returns {Intell.Controls.TreeView.TreeViewPrivate} */
        function getPrivate(treeview) { return treeview[privateSymbol] }
        
        TreeView.getPrivate = getPrivate;

        return TreeView;
    }();

    //intell.controls.TreeView.TreeNode.

    /** @type Intell.Controls.TreeView.TreeNodeConstructor */
    var TreeNode = function() {
        var privateSymbol = Symbol("__private"); // "__private"
        var $itemAbstract = $(`
<div class="Item">
    <div class="Label">
        <div class="Arrow"></div>
        <div class="Icon"></div>
        <div class="Name"></div>
    </div>
</div>`);
        TreeNode = function TreeNode(element) {
            if (this instanceof TreeNode == false) return new TreeNode(element);
            if (element == null) element = $itemAbstract.clone()[0];


            /** @type Intell.Controls.TreeView.TreeNode */
            var _this = element.__TreeNode__ = this;
            var $element = $(element);
            var $label = $element.find('>.Label');
            var $arrow = $label.find('>.Arrow');
            var $icon = $label.find('>.Icon');
            var $name = $label.find('>.Name');
            var $children = $element.find('>.Children');

            /** @type Intell.Controls.TreeView.TreeNodePrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.name = '';
            __private.icon = '';
            __private.children = [];
            __private.parent = undefined;
            __private.elementLabel = $label[0];
            __private.elementArrow = $arrow[0];
            __private.elementIcon = $icon[0];
            __private.elementName = $name[0];
            __private.elementLabel = $name[0];
            __private.elementChildren = $children[0];

        }

        // prototype
        !function() {
            var prototype = TreeNode.prototype;


            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function() { throw new Error("'TreeNode.element' cannot be assigned to -- it is read only") }
                },
                name: {
                    get: function() { return getPrivate(this).name },
                    set: function(newValue) {
                        var __private = getPrivate(this);
                        __private.name = newValue;
                        __private.elementName.textContent = newValue;
                    }
                },
                icon: {
                    get: function() { return getPrivate(this).icon },
                    set: function(newValue) {

                        var __private = getPrivate(this);
                        __private.icon = newValue;


                        if (newValue.length <= 1)
                            __private.elementIcon.textContent = newValue;
                        else
                            __private.elementIcon.style.backgroundImage = 'url(' + newValue + ')';

                        //$(__private.elementIcon).css('background-image', 'url(' + newValue + ')');
                    }
                },
                children: {
                    get: function() { return getPrivate(this).children },
                    set: function() { throw new Error("'TreeNode.children' cannot be assigned to -- it is read only") }
                },
                parent: {
                    get: function() { return getPrivate(this).parent },
                    set: function() { throw new Error("'TreeNode.parent' cannot be assigned to -- it is read only") }
                },
                treeView: {
                    get: function() { return getPrivate(this).treeView },
                    set: function(newValue) { throw new Error("'TreeNode.treeView' cannot be assigned to -- it is read only") }
                }
            });


            !function() {
                prototype.add = function() {
                    if (arguments.length == 1 && typeof arguments[0] == "string") return addName.apply(this, arguments);
                    if (arguments.length == 1 && arguments[0] instanceof TreeNode == true) return addNode.apply(this, arguments);
                    if (arguments.length == 1 && typeof arguments[0] == "object") return addNodeOption.apply(this, arguments);

                    throw new Error("arguments do not match with any overloads.")
                }
                /** @param {string} name 
                 * @this Intell.Controls.TreeView.TreeNode */
                function addName(name) {
                    var element = this.treeView != null ? $(this.treeView.elementItemAbstract).clone()[0] : undefined;
                    var node = new TreeNode(element);
                    node.name = name;
                   
                    addNode.call(this, node);

                    return node;
                }

                /** @param {Intell.Controls.TreeView.TreeNodeOption} option
                 * @this Intell.Controls.TreeView.TreeNode */
                function addNodeOption(option) {
                    var element = this.treeView != null ? $(this.treeView.elementItemAbstract).clone()[0] : undefined;
                    var node = new TreeNode(element);
                    if (option.name != null) node.name = option.name;
                    if (option.icon != null) node.icon = option.icon;

                    addNode.call(this, node);

                    return node;
                }
                /** @param {Intell.Controls.TreeView.TreeNode} node 
                 *  @this Intell.Controls.TreeView.TreeNode
                 */
                function addNode(node) {
                    if (node.parent != null) throw new Error("Cannot add or insert the item '" + node.name + "' in more than one place. You must first remove it from its current location or clone it.");

                    var parent__private = getPrivate(this);
                    var child__private = getPrivate(node);

                    // logic
                    parent__private.children.push(node);
                    child__private.parent = this;
                    child__private.treeView = parent__private.treeView;

                    // ui/ux
                    if (parent__private.elementChildren == null) parent__private.elementChildren = $('<div class="Children"></div>').appendTo(parent__private.element)[0];
                    
                    var $element = $(parent__private.element);
                    $(parent__private.elementChildren).append(node.element);


                    recheck_havechildren.apply(this);
                }
            }();
            prototype.remove = function() {
                var __private = getPrivate(this);

                var parent = __private.parent;
                if (parent == null) return;

                parent.removeChildren(this);
            }
            prototype.removeChildren = function(node) {
                var __private = getPrivate(this);
                var children = __private.children;

                var index = children.indexOf(node);
                if (index == -1) return;

                // logic parent
                children.splice(index, 1);
                // logic child
                var child__private = getPrivate(node);
                child__private.parent = null;
                child__private.treeView = null;

                // ui/ux
                node.element.remove();

                recheck_havechildren.apply(this);
            }
            prototype.clear = function() {
                var __private = getPrivate(this);
                var children = __private.children;

                for (var i = 0; i < children.length; i++) {
                    var node = children[i];
                    // logic
                    var node__private = getPrivate(node);
                    node__private.parent = null;

                    // ui/ux
                    node.element.remove();
                }
                children.splice(0, children.length);

                recheck_havechildren.apply(this);
            }
            prototype.showExpandButton = function() {
                $(this.element).addClass('HAS-CHILDREN');
            }
            prototype.hideExpandButton = function() {
                $(this.element).removeClass('HAS-CHILDREN');
            }

            /** @this Intell.Controls.TreeView.TreeNode */
            function recheck_havechildren() {
                var $element = $(this.element);
                var $children = $element.find('>.Children');
                $element.toggleClass('HAS-CHILDREN', $children.children().length != 0);
            }

        }();

        //methods

        /** @param {Intell.Controls.TreeView.TreeNode} node @returns {Intell.Controls.TreeView.TreeNodePrivate} */
        function getPrivate(node) { return node[privateSymbol] }

        TreeNode.getPrivate = getPrivate;
        return TreeNode;
    }();



    ns.create = function(element) {
        return new TreeView(element);
    }
    ns.TreeView = TreeView
    ns.TreeNode = TreeNode;



}();
