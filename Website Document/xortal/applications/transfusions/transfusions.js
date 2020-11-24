

!function() {

    var pathname = new URL(document.currentScript.src).pathname;
    var pathfolder = pathname.substr(0, pathname.lastIndexOf('/'));

    /** @type Portal.ApplicationManifest */
    var manifest = {
        id: "transfusions",
        name: "Transfusions",
        title: "Transfusions between computers.",
        icon: pathfolder + "/icon.svg",
        group: "Tools",
        content: {
            html: pathfolder +  "/ui.html"
        }
    }


    /** @type Portal */
    var portal = window.portal;
    portal.addManifest(manifest, function(app) {
        //return;
        /** @type AP.Transfusions.Application */
        var application = app;
        var $root = $(application.root);


        application.textTransfusion = new function() {
            /** @type AP.Transfusions.TextTransfusion */
            var _this = this;
            var $this = $root.find('.Text-Transfusion');
            var $saveState = $this.find('.save-state');
            var $text = $this.find('textarea');

            $text.change(function() {
                __.api.xortal.transfusions.set_text($text.val()).then(function() {

                    $saveState.removeClass('ACTIVE');

                    $saveState.offset();
                    $saveState.addClass('ACTIVE');

                });
            })

            __.api.xortal.transfusions.get_text().then(function(e) {
                $text.val(e.response.text);

            })
        }();
        application.filetransfusion = new function() {
            /** @type AP.Transfusions.FileTransfusion */
            var _this = this;
            var $this = $root.find('.File-Transfusion');

            _this.explorer = new function() {
            /** @type AP.Transfusions.Explorer */
                var explorer = this;
                var $explorer = $this.find('.explorer');

                // sub
                explorer.folders = new function() {
                    /** @type AP.Transfusions.ExplorerFolder */
                    var _this = this;

                    var $folders = $explorer.find('.folders');
                    var treeView = intell.controls.TreeView.create($folders[0]);
                    var storageNode = treeView.add({ name: "Drive", icon: '' });
                    storageNode.item = { path: '' };
                    storageNode.showExpandButton();



                    Object.defineProperties(_this, {
                        path: {
                            get: function() {
                                var selectedNode = treeView.selectedNode;
                                if (selectedNode) return selectedNode.item.path;

                                return undefined;
                            },
                        }
                    });

                    // handle events
                    treeView.onnodeexpand(function(e) {
                        var node = e.node;

                        var item = node.item;

                        if (item.loaded == true) return;

                        item.loaded = true;

                        __.api.xortal.transfusions.get_folders(item.path).then(function(e) {
                            e.response.folders.forEach(function(item) {
                                var n = node.add({ name: item.name, icon: '' });
                                n.item = item;

                                n.showExpandButton();
                            })

                            if (e.response.folders.length == 0) node.hideExpandButton();
                        })

                        item.path
                    })
                    treeView.onnodeclick(function(e) {
                        var node = e.node;
                        /** @type __.Api.Xortal.Transfusions.FileDetail */
                        var item = node.item;

                        explorer.getfiles(item.path);
                    })
                }
                explorer.files = new function() {
                    /** @type AP.Transfusions.ExplorerFile */
                    var _this = this;

                    var $files = $explorer.find('.files');
                    var $progress = $files.find('.progress');
                    var listview = intell.controls.ListView.create($files);
                    var $menu = $explorer.find('.X-Menu');
                    var menu = intell.controls.Menu($menu);

                    _this.add = function(file) {
                        var item = listview.add(file.name);

                        var match = file.name.match(/\.(.*)/);
                        var extension = match && match[1];
                        if (extension.length > 3) extension = '';
                        item.elementIcon.textContent = extension;


                        item.refreshName(2);
                        item.file = file;
                    }
                    _this.clear = function() { listview.clear(); }
                    _this.startWait = function() { intell.controls.Waiting.startWait($files[0]) }
                    _this.stopWait = function() { intell.controls.Waiting.stopWait($files[0]) }

                    // handle
                    $files.on('dragover', function(ev) {

                        
                        if (explorer.folders.path == null) {
                            ev.originalEvent.dataTransfer.effectAllowed = "none";
                            ev.originalEvent.dataTransfer.dropEffect = "none";
                        } else {
                            ev.originalEvent.dataTransfer.effectAllowed = "copy";
                            ev.originalEvent.dataTransfer.dropEffect = "copy";
                        }
                        ev.preventDefault();
                        ev.originalEvent.preventDefault()
                    });
                    $files.on('drop', function(ev) {

                        console.log('drop');

                        var e = ev.originalEvent;
                        if (e.dataTransfer.types.indexOf('Files') == -1) {
                            alert('Only allow files'); return;
                        }
                        else {

                            var formData = new FormData();

                            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                                formData.append("file", e.dataTransfer.files[i]);
                                console.log('size', e.dataTransfer.files[i].size);
                            }


                            var request = intell.post('/api/xortal/transfusions/upload-file');
                            request.send(formData);

                            $progress.show();

                            request.upload.progress(function(ee) {

                                $progress.find('.percent').html(Math.round(ee.loaded / ee.total * 10000) / 100 + '%');
                                $progress.find('.description').html(ee.loaded + '/' + ee.total)
                                $progress.html()
                            })
                            request.load(function() {
                                $progress.hide();
                                
                                explorer.getfiles(explorer.folders.path);
                            })

                            ev.preventDefault();
                            e.preventDefault();
                        }
                    });
                    listview.onitemmouseup(function(e) {
                        if (e.event.button == 2) {
                            var offset = { left: e.event.pageX, top: e.event.pageY };
                            menu.rootOption.space = 2;
                            menu.rootOption.margin = 2;
                            menu.show(offset);
                            e.item.selected = true;
                        }
                        

                        

                    })

                    $files.add($menu).contextmenu(function() { return false });
                    menu.onmenuitemclick(function(e) {
                        var $target = $(e.target);

                        if ($target.is('.download') == true) {

                            var item = listview.selectedItems[0];
                            var file = item.file;
                            

                            location = __.api.xortal.transfusions.getDownloadURL(file.path);
                        } else if ($target.is('.delete') == true) {

                            var item = listview.selectedItems[0];
                            var file = item.file;
                            __.api.xortal.transfusions.delete(file.path).then(function() {
                                item.remove();
                            });

                            
                        }

                        
                    })

                }()

                // methods
                explorer.getfiles = function(path) {

                    explorer.files.clear();
                    explorer.files.startWait();

                    __.api.xortal.transfusions.get_files(path).then(function(e) {
                        explorer.files.clear();
                        explorer.files.stopWait();

                        e.response.files.forEach(function(file) {
                            explorer.files.add(file)
                        })
                    })
                }


            }

            // methods


        }();

        // methods


    });
}();