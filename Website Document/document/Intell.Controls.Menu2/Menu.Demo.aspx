<%@ Page Language="C#" AutoEventWireup="false"%>
<%@ OutputCache Duration="36000" VaryByParam="none"  %>
<%@ Register Src="~/bin/Controls/Nav-Bar.ascx" TagPrefix="uc1" TagName="NavBar" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Intell UI API Documentation</title>
    <script src="/static/lib/jquery-3.3.1.min.js"></script>
    <script src="/static/lib/intell.js"></script>
    <script src="/static/lib/highlight.pack.js"></script>
    <script src="/static/lib/docjs.js"></script>

    <script src="/static/js/live-example.js"></script>

    <link href="/static/css/global.css" rel="stylesheet"/>
    <link href="/static/css/docjs.css" rel="stylesheet" />
    <link href="/static/css/hljs.css" rel="stylesheet"/>

    <style>
        .example-template{margin-bottom:20px}
        .example-template>.title{margin:10px 0;font-size:1.3em;font-weight:bold}
    </style>
        
    <script>
        $(document).ready(function () { liveexample.auto() });
    </script>
</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />
<div runat="server" visible="false"></div>
    <div class="example-template Content">
        <div class="title">Visual Studio 2017 themes</div>
        <div data-code-ref="Example1">
            <style>
                .Children{}
                .X-Menu.VS2017{position:relative;display:inline-block}
                .X-Menu.VS2017>.Children{display:flex}
                .X-Menu.VS2017>.Children>.X-Menu-Item{display:flex;position:relative}
                .X-Menu.VS2017>.Children>.X-Menu-Item>.Label{display:flex;padding:2px 10px;border:1px solid transparent;cursor:pointer}
                .X-Menu.VS2017>.Children>.X-Menu-Item>.Label:hover{border:1px solid #e5c365;background:#fdf4bf}
                .X-Menu.VS2017>.Children>.X-Menu-Item.ACTIVE>.Label{border:1px solid #9ba7b7;background:#eaf0ff}
                .X-Menu.VS2017>.Children>.X-Menu-Item.ACTIVE>.Children{}
                .X-Menu.VS2017>.Children>.X-Menu-Item.HAS-CHILDREN.ACTIVE::after{content:"";position:absolute;bottom:0;width:calc(100% - 2px);height:2px;margin:0 1px;background:#eaf0ff;z-index:2}



                /* the left bar on dropdown with background */
                .X-Menu.VS2017>.Children .Children::before{content:"";position:absolute;left:0;top:0;bottom:0;width:calc(22px + 1em);background:#f2f4fe}
                /* the left bar on dropdown with border */
                .X-Menu.VS2017>.Children .Children::after{content:"";position:absolute;left:calc(22px + 1em);top:2px;bottom:2px;border-right:1px solid #bdbdbd;pointer-events:none}

                .X-Menu.VS2017>.Children>.X-Menu-Item  .Children{display:none;position:absolute;padding:2px;border:1px solid #9ba7b7;left:100%;top:0;background:#eaf0ff;z-index:1}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item{display:flex;position:relative}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item>.Label{flex:1 1 auto;display:flex;align-items:center;cursor:pointer}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item.ACTIVE>.Label{background:#fdf4bf}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item .Label>.Icon{align-self:stretch;display:flex;width:1em;align-items:center;padding:0 10px;font-family:fontello;box-sizing:content-box}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item .Label>.Name{flex:1 1 auto;padding:3px 40px 3px 8px;white-space:nowrap}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item .Label>.Arrow{padding:0 .3em 0 .5em}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item .Label>.Arrow:before{content:"";font-family:fontello}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item .Label>.Shortcut{padding-right:1em}
                
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item .Children.OUT{}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item.ACTIVE>.Children{visibility:visible;opacity:1}

                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item.HAS-CHILDREN>.Label{}
                .X-Menu.VS2017>.Children>.X-Menu-Item .X-Menu-Item.HAS-CHILDREN>.Label::after{content:"";padding: 0 .3em 0 .5em;font-family: fontello}
                

                .X-Menu.VS2017 .X-Separator{margin-left:calc(20px + 1em);padding:1px 0 1px 5px}
                .X-Menu.VS2017 .X-Separator::before{content:"";display:block;height:1px;background:#bec3cb}                
            </style>

            <div style="display:flex;background:#d6dbe9">
            
                <!-- Menu File -->
                <div class="X-Menu VS2017" id="menu1">
                    <div class="Children" >
                        <div class="X-Menu-Item Abstract">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                
                $(document).ready(function() {
                    var menu1 = window.menu1 = new intell.controls.Menu2.Menu($('#menu1'));
                    //menu1.delayHideTime = 500;

                    //  File
                    //  -- New
                    //  ----- Project...
                    //  ----- File...
                    //  ----- Repository...
                    //  ----- Other
                    //  ------- Image...
                    //  ------- Video...
                    //  -- Open
                    //  ----- Project/Solution...
                    //  ----- Folder...
                    //  ----- Website...
                    //  ────────────────────
                    //  -- Save
                    //  ────────────────────
                    //  -- Exit
                    

                    var fileItem = menu1.add('File');

                    var newMenu = fileItem.add('New');
                    newMenu.add('Project...');
                    newMenu.add({ icon: '', name: 'File...' });
                    //newMenu.add('Repository...');

                    var otherMenu = newMenu.add('Other');
                    otherMenu.add({ icon: '', name: 'Image...' })
                    otherMenu.add({ icon: '', name: 'Video...' })


                    var openwMenu = fileItem.add('Open');
                    openwMenu.add('Project/Solution...');
                    openwMenu.add('Folder...');
                    openwMenu.add('Website...');

                    fileItem.addSeparator();
                    fileItem.add({ icon: '', name: 'Save' });
                    fileItem.addSeparator();
                    fileItem.add('Exit');


                    // Edit
                    // -- Cut
                    // -- Copy
                    // -- Paste
                    var edit = menu1.add('Edit');
                    edit.add('Cut');
                    edit.add('Copy');
                    edit.add('Paste');

                    menu1.add('View');

                    menu1.ondropdownopen(function(e) { console.log('ondropdownopen', e.item.name) });
                    menu1.onmenuitemclick(function(e) { console.log('clicked', e.item.name) });
                    menu1.ondropdownclose(function(e) { console.log('ondropdownclose', e.item.name) });
                });

                
                //setInterval(function() {
                //    var menu1 = window.menu1;
                //    var items = $(menu1.element).find('.X-Menu-Item').toArray();
                //
                //    items.forEach(function(element) {
                //        var menuItem = element.__MenuItem__;
                //        var __private =  intell.controls.Menu2.MenuItem.getPrivate(menuItem)
                //
                //        __private.elementName.textContent =
                //            'active:' + __private.active + ', ' +
                //            'childrenVisible:' + __private.childrenVisible + ', ' +
                //            'childrenFadingOut:' + __private.childrenFadingOut;
                //
                //    })
                //
                //}, 200);

            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Visual Studio 2017 Themes</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Predefined & Backdrop</div>
        <div data-code-ref="Example2">
            <style>
                
                .X-Menu.Backdrop::after{content:"";position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.4);z-index:1;visibility:collapse;opacity:0;transition:opacity .4s}

                .X-Menu.Backdrop.ACTIVE{}
                .X-Menu.Backdrop.ACTIVE>.Children{position:relative;z-index:2}
                .X-Menu.Backdrop.ACTIVE::after{visibility:visible; opacity:1}
            </style>

            <div style="display:flex;background:#d6dbe9">
            
                <!-- Menu File -->
                <div class="X-Menu VS2017 Backdrop" id="menu2">
                    <div class="Children">
                        <div class="X-Menu-Item">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name">File</div>
                            </div>
                            <div class="Children">
                                <div class="X-Menu-Item">
                                    <div class="Label">
                                        <div class="Icon"></div>
                                        <div class="Name">New</div>
                                    </div>
                                    <div class="Children">
                                        <div class="X-Menu-Item">
                                            <div class="Label">
                                                <div class="Icon"></div>
                                                <div class="Name">Project...</div>
                                            </div>
                                        </div>
                                        <div class="X-Menu-Item">
                                            <div class="Label">
                                                <div class="Icon"></div>
                                                <div class="Name">File...</div>
                                            </div>
                                        </div>
                                        <div class="X-Menu-Item">
                                            <div class="Label">
                                                <div class="Icon"></div>
                                                <div class="Name">Repository...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label">
                                        <div class="Icon"></div>
                                        <div class="Name">Open</div>
                                    </div>
                                    <div class="Children">
                                        <div class="X-Menu-Item">
                                            <div class="Label">
                                                <div class="Icon"></div>
                                                <div class="Name">Project/Solution...</div>
                                            </div>
                                        </div>
                                        <div class="X-Menu-Item">
                                            <div class="Label">
                                                <div class="Icon"></div>
                                                <div class="Name">Folder...</div>
                                            </div>
                                        </div>
                                        <div class="X-Menu-Item">
                                            <div class="Label">
                                                <div class="Icon"></div>
                                                <div class="Name">Website...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="X-Separator"></div>
                                <div class="X-Menu-Item">
                                    <div class="Label">
                                        <div class="Icon"></div>
                                        <div class="Name">Exit</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="X-Menu-Item">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name">Edit</div>
                            </div>
                            <div class="Children">
                                <div class="X-Menu-Item">
                                    <div class="Label">
                                        <div class="Icon"></div>
                                        <div class="Name">Cut</div>
                                    </div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label">
                                        <div class="Icon"></div>
                                        <div class="Name">Copy</div>
                                    </div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label">
                                        <div class="Icon"></div>
                                        <div class="Name">Paste</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                
                $(document).ready(function () {
                    var menu2 = window.menu2 = new intell.controls.Menu2.Menu($('#menu2'));
                });

                

            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Predefined & Backdrop</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>


    <div class="example-template Content">
        <div class="title">Dark-Blue themes</div>
        <div data-code-ref="Example3">
            <style>
                .X-Menu.Dark-Blue{color:#fff}
                .X-Menu.Dark-Blue>.Children{display:flex}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item{cursor:default}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item>.Label{padding:2px 10px}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item>.Label:hover{background:#04789f}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item.ACTIVE>.Label{background:#004886}


                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children{display:none;position:absolute;padding:2px;border:1px solid #04789f;background:#001629;z-index:1}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item{}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item>.Label{display:flex;align-items:center}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item>.Label>.Icon{position:absolute;width:calc(1em + 20px);text-align:center;font-family:fontello}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item>.Label>.Name{flex:1 1 auto;padding:3px 40px 3px calc(1em + 30px)}


                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item.HAS-CHILDREN{}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item.HAS-CHILDREN>.Label{}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item.HAS-CHILDREN>.Label::after{content:"";padding:0 .3em 0 .5em;font-family:fontello}
                .X-Menu.Dark-Blue>.Children>.X-Menu-Item .Children>.X-Menu-Item.ACTIVE>.Label{background:#04789f}
                

                .X-Menu.Dark-Blue .X-Separator{margin-left:calc(1em + 30px);padding:2px 0}
                .X-Menu.Dark-Blue .X-Separator::before{content:"";display:block;height:1px;background:#bec3cb}

            </style>

            <div style="display:flex;background:#032041">
            
                <!-- Menu File -->
                <div class="X-Menu Dark-Blue" id="menu3">
                    <div class="Children" >
                        <div class="X-Menu-Item Abstract">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                
                $(document).ready(function() {
                    var menu = window.menu3 = new intell.controls.Menu2.Menu($('#menu3'));
                    //menu.delayHideTime = 500;
                    //menu.rootDelayHideTime = 1000;

                    //  File
                    //  -- New
                    //  ----- Project...
                    //  ----- File...
                    //  ----- Repository...
                    //  ----- Other
                    //  ------- Image...
                    //  ------- Video...
                    //  -- Open
                    //  ----- Project/Solution...
                    //  ----- Folder...
                    //  ----- Website...
                    //  ────────────────────
                    //  -- Save
                    //  ────────────────────
                    //  -- Exit
                    

                    var fileItem = menu.add('File');

                    var newMenu = fileItem.add('New');
                    newMenu.add('Project...');
                    newMenu.add({ icon: '', name: 'File...' });
                    //newMenu.add('Repository...');

                    var otherMenu = newMenu.add('Other');
                    otherMenu.add({ icon: '', name: 'Image...' })
                    otherMenu.add({ icon: '', name: 'Video...' })


                    var openwMenu = fileItem.add('Open');
                    openwMenu.add('Project/Solution...');
                    openwMenu.add('Folder...');
                    openwMenu.add('Website...');

                    fileItem.addSeparator();
                    fileItem.add({ icon: '', name: 'Save' });
                    fileItem.addSeparator();
                    fileItem.add('Exit');


                    // Edit
                    // -- Cut
                    // -- Copy
                    // -- Paste
                    var edit = menu.add('Edit');
                    edit.add('Cut');
                    edit.add('Copy');
                    edit.add('Paste');

                    menu.add('View');

                    menu.ondropdownopen(function(e) { console.log('ondropdownopen', e.item.name) });
                    menu.onmenuitemclick(function(e) { console.log('clicked', e.item.name) });
                    menu.ondropdownclose(function(e) { console.log('ondropdownclose', e.item.name) });
                });
            </script>
        </div>

        <div class="item-code-block">
            <header>Dark-Blue themes</header>
            <code data-code-name="Example3"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Dark themes with fadein & fadeout (Dark-Blue)</div>
        <div data-code-ref="Example4">
            <style>
                /* Fade in/out */
                .X-Menu.Dark-Blue.Fade .X-Menu-Item{}
                .X-Menu.Dark-Blue.Fade .X-Menu-Item>.Children{opacity:0}
                .X-Menu.Dark-Blue.Fade .X-Menu-Item.FIRST>.Children.ACTIVE{transition:opacity .5s;opacity:1}
                .X-Menu.Dark-Blue.Fade .X-Menu-Item>.Children.ACTIVE{opacity:1}
                .X-Menu.Dark-Blue.Fade .X-Menu-Item>.Children.OUT{transition:opacity .5s;opacity:0}

            </style>

            <div style="display:flex;background:#032041">
            
                <!-- Menu File -->
                <div class="X-Menu Dark-Blue Fade" id="menu4">
                    <div class="Children" >
                        <div class="X-Menu-Item Abstract">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                
                $(document).ready(function() {
                    var menu = window.menu4 = new intell.controls.Menu2.Menu($('#menu4'));
                    //menu.delayHideTime = 500;
                    menu.rootDelayHideTime = 500;
                    menu.showOnHover = true;
                    //  File
                    //  -- New
                    //  ----- Project...
                    //  ----- File...
                    //  ----- Repository...
                    //  ----- Other
                    //  ------- Image...
                    //  ------- Video...
                    //  -- Open
                    //  ----- Project/Solution...
                    //  ----- Folder...
                    //  ----- Website...
                    //  ────────────────────
                    //  -- Save
                    //  ────────────────────
                    //  -- Exit
                    

                    var fileItem = menu.add('File');

                    var newMenu = fileItem.add('New');
                    newMenu.add('Project...');
                    newMenu.add({ icon: '', name: 'File...' });
                    //newMenu.add('Repository...');

                    var otherMenu = newMenu.add('Other');
                    otherMenu.add({ icon: '', name: 'Image...' })
                    otherMenu.add({ icon: '', name: 'Video...' })


                    var openwMenu = fileItem.add('Open');
                    openwMenu.add('Project/Solution...');
                    openwMenu.add('Folder...');
                    openwMenu.add('Website...');

                    fileItem.addSeparator();
                    fileItem.add({ icon: '', name: 'Save' });
                    fileItem.addSeparator();
                    fileItem.add('Exit');


                    // Edit
                    // -- Cut
                    // -- Copy
                    // -- Paste
                    var edit = menu.add('Edit');
                    edit.add('Cut');
                    edit.add('Copy');
                    edit.add('Paste');

                    menu.add('View');

                    menu.ondropdownopen(function(e) { console.log('ondropdownopen', e.item.name) });
                    menu.onmenuitemclick(function(e) { console.log('clicked', e.item.name) });
                    menu.ondropdownclose(function(e) { console.log('ondropdownclose', e.item.name) });
                });
            </script>
        </div>

        <div class="item-code-block">
            <header>Dark-Blue themes with fadein & fadeout & ShowOnHover</header>
            <code data-code-name="Example4"></code>    
        </div>
    </div>

    <div id="example5" class="example-template Content">
        <div class="title">Context Menu</div>
        <div data-code-ref="Example5">
            <style>     
                #menu5>.Children>.X-Menu-Item>.Label{display:none}
                #example5 .box{height:100px;padding:4px 10px;border:1px solid}
            </style>

            
            <div class="X-Menu VS2017" id="menu5" style="position:absolute"></div>
            <div class="box">
                right click to popup context menu
            </div>

            <script>
                
                $(document).ready(function() {
                    var menu = window.menu5 = new intell.controls.Menu2.Menu($('#menu5'));
                    //menu1.delayHideTime = 500;

                    //  File
                    //  -- New
                    //  ----- Project...
                    //  ----- File...
                    //  ----- Repository...
                    //  ----- Other
                    //  ------- Image...
                    //  ------- Video...
                    //  -- Open
                    //  ----- Project/Solution...
                    //  ----- Folder...
                    //  ----- Website...
                    //  ────────────────────
                    //  -- Save
                    //  ────────────────────
                    //  -- Exit
                    

                    var fileItem = menu.add('File');

                    var newMenu = fileItem.add('New');
                    newMenu.add('Project...');
                    newMenu.add({ icon: '', name: 'File...' });
                    //newMenu.add('Repository...');

                    var otherMenu = newMenu.add('Other');
                    otherMenu.add({ icon: '', name: 'Image...' })
                    otherMenu.add({ icon: '', name: 'Video...' })

                    
                    var openwMenu = fileItem.add('Open');
                    openwMenu.add('Project/Solution...');
                    openwMenu.add('Folder...');
                    openwMenu.add('Website...');

                    fileItem.addSeparator();
                    fileItem.add({ icon: '', name: 'Save' });
                    fileItem.addSeparator();
                    fileItem.add('Exit');


                    var $box = $('#example5 .box');
                    $box.mouseup(function(e) {
                        var e = e.originalEvent;
                        if (e.button == 2) {

                            //menu10.rootOption.insideRect = new intell.Rectangle(
                            //    window.pageXOffset, window.pageYOffset,
                            //    Math.min(document.body.clientWidth, window.innerWidth), Math.min(document.body.clientHeight, window.innerHeight));
                            //
                            ////menu10.show($box[0]);
                            //menu10.show({ left: e.pageX, top: e.pageY });


                            if (fileItem.childrenVisible == true) {
                                fileItem.childrenVisible = false;

                            }
                            fileItem.active = true;
                            fileItem.showChildren(e.pageX, e.pageY);

                        }
                    });
                    $box.add(menu.element).contextmenu(function(e) { e.originalEvent.preventDefault(); });


                    
                });

                
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Context Menu</header>
            <code data-code-name="Example5"></code>    
        </div>
    </div>

    <div class="Content" style="margin-top:10px">
        To create a custom theme, you should pick up a theme then edit it. Menu provides many state class as "FIRST" "ACTIVE" "OUT".
    </div>

</body>
</html>
