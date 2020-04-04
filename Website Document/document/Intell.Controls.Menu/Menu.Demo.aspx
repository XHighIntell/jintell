<%@ Page Language="C#" AutoEventWireup="false"%>
<%@ OutputCache Duration="36000" VaryByParam="none"  %>
<%@ Register Src="~/bin/Controls/Nav-Bar.ascx" TagPrefix="uc1" TagName="NavBar" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Intell UI API Documentation</title>
    <script src="/static/lib/jquery-3.3.1.min.js"></script>
    <script src="/static/lib/intell.min.js"></script>
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



    <div class="example-template Content">
        <div class="title">Visual Studio 2017 themes</div>
        <div data-code-ref="Example1">
            <style>
                .X-Menu.VS2017{position:relative;display:inline-block}
                .X-Menu.VS2017>.Label{display:flex;padding:2px 10px;border:1px solid transparent;cursor:pointer}
                .X-Menu.VS2017>.Label:hover{border:1px solid #e5c365;background:#fdf4bf}
                .X-Menu.VS2017>.X-Menu-Items{display:none;position:absolute;margin-top:-1px;padding:2px;border:1px solid #9ba7b7;background:#eaf0ff;z-index:1}

                .X-Menu.VS2017.ACTIVE>.Label{border:1px solid #9ba7b7;background:#eaf0ff}
                .X-Menu.VS2017.ACTIVE>.X-Menu-Items{display:block}
                .X-Menu.VS2017.ACTIVE::before{content:"";position:absolute;bottom:0;width:calc(100% - 2px);height:1px;margin:0 1px;background:#eaf0ff;z-index:2}

                /* the left bar on dropdown with background */
                .X-Menu.VS2017 .X-Menu-Items::before{content:"";position:absolute;left:0;top:0;bottom:0;width:calc(22px + 1em);background:#f2f4fe}
                /* the left bar on dropdown with border */
                .X-Menu.VS2017 .X-Menu-Items::after{content:"";position:absolute;left:calc(22px + 1em);top:2px;bottom:2px;border-right:1px solid #bdbdbd}

                .X-Menu.VS2017 .X-Menu-Item{display:flex;position:relative}
                .X-Menu.VS2017 .X-Menu-Item>.Label{flex:1 1 auto;display:flex;align-items:center;cursor:pointer}
                .X-Menu.VS2017 .X-Menu-Item.ACTIVE>.Label{background:#fdf4bf}
                .X-Menu.VS2017 .X-Menu-Item>.Label>.Icon{align-self:stretch;display:flex;width:1em;align-items:center;padding:0 10px;font-family:fontello;box-sizing:content-box}
                .X-Menu.VS2017 .X-Menu-Item>.Label>.Name{flex:1 1 auto;padding:3px 40px 3px 8px;white-space:nowrap}
                .X-Menu.VS2017 .X-Menu-Item>.Label>.Arrow{padding:0 .3em 0 .5em}
                .X-Menu.VS2017 .X-Menu-Item>.Label>.Arrow:before{content:"";font-family:fontello}
                .X-Menu.VS2017 .X-Menu-Item>.Label>.Shortcut{padding-right:1em}
                .X-Menu.VS2017 .X-Menu-Item>.X-Menu-Items{display:none;position:absolute;padding:2px;border:1px solid #9ba7b7;left:100%;top:0;background:#eaf0ff;z-index:1}
                .X-Menu.VS2017 .X-Menu-Item>.X-Menu-Items.OUT{}
                .X-Menu.VS2017 .X-Menu-Item.ACTIVE>.X-Menu-Items{visibility:visible;opacity:1}

                .X-Menu.VS2017 .X-Separator{margin-left:calc(20px + 1em);padding:1px 0 1px 5px}
                .X-Menu.VS2017 .X-Separator::before{content:"";display:block;height:1px;background:#bec3cb}
            </style>

            <div style="display:flex;background:#d6dbe9">
            
                <!-- Menu File -->
                <div class="X-Menu VS2017" id="menu1">
                    <div class="Label"><div class="Name">File</div></div>
                    <div class="X-Menu-Items">
                        <div class="X-Menu-Item">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name">New</div>
                                <div class="Arrow"></div>
                            </div>
                            <div class="X-Menu-Items">
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Image…</div></div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Video…</div></div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Other</div><div class="Arrow"></div></div>

                                    <div class="X-Menu-Items">
                                        <div class="X-Menu-Item">
                                            <div class="Label"><div class="Icon"></div><div class="Name">doc…</div></div>
                                        </div>
                                        <div class="X-Menu-Item">
                                            <div class="Label"><div class="Icon"></div><div class="Name">txt…</div></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        
                        </div>  
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Save</div><div class="Shortcut">Ctrl+S</div></div>
                        </div>
                        <div class="X-Separator"></div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Exit</div><div class="Shortcut">Alt+F4</div></div>
                        </div>
                    </div>
                </div>

                <!-- Menu Edit -->
                <div class="X-Menu VS2017" id="menu2">
                    <div class="Label"><div class="Name">Edit</div></div>
                    <div class="X-Menu-Items">
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Cut</div><div class="Shortcut">Ctrl+X</div></div>
                        </div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Copy</div><div class="Shortcut">Ctrl+C</div></div>
                        </div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Paste</div><div class="Shortcut">Ctrl+V</div></div>
                        </div>
                    </div>
                </div>

                
            </div>

            <script>
                
                $(document).ready(function () {
                    var menu1 = window.menu1 = intell.controls.Menu($('#menu1'));
                    menu1.onmenuitemclick(function (ev) {
                        //alert('Clicked "' + $(ev.target).find('>.Label>.Name').text() + '"');
                        console.log('Clicked "' + $(ev.target).find('>.Label>.Name').text() + '"')
                    });


                    //$(document).contextmenu(function() { return false });
                    //$(document).mouseup(function(e) {
                    //    var ev = e.originalEvent;
                    //    if (ev.button == 2) menu1.show({ left: ev.pageX, top: ev.pageY });
                    //})

                    var menu2 = intell.controls.Menu($('#menu2'));
                });

            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Visual Studio 2017 Themes</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Dark themes with fadein & fadeout (Dark-Blue)</div>

        <div data-code-ref="Example2">
            <style>
                .X-Menu.Dark-Blue{position:relative;display:inline-block}
                .X-Menu.Dark-Blue>.Label{display:flex;align-items:center;padding:2px 10px;border:1px solid transparent;cursor:pointer;transition:background .5s}
                .X-Menu.Dark-Blue>.Label:hover{background:#04789f}
                .X-Menu.Dark-Blue.ACTIVE>.Label{background:#004886}


                .X-Menu.Dark-Blue .X-Menu-Items{display:none;position:absolute;padding:2px;border:1px solid #04789f;background:#001629;transition:opacity .5s;z-index:1}
                .X-Menu.Dark-Blue .X-Menu-Item{display:flex;position:relative}
                .X-Menu.Dark-Blue .X-Menu-Item>.Label{flex:1 1 auto;display:flex;align-items:center;cursor:pointer}
                .X-Menu.Dark-Blue .X-Menu-Item>.Label>.Icon{align-self:stretch;display:flex;width:1em;align-items:center;padding:0 10px;font-family:fontello;box-sizing:content-box}
                .X-Menu.Dark-Blue .X-Menu-Item>.Label>.Name{flex:1 1 auto;padding:3px 40px 3px 8px;white-space:nowrap}
                .X-Menu.Dark-Blue .X-Menu-Item>.Label>.Arrow{padding:0 .3em 0 .5em}
                .X-Menu.Dark-Blue .X-Menu-Item>.Label>.Arrow:before{content:"";font-family:fontello}
                .X-Menu.Dark-Blue .X-Menu-Item>.Label>.Shortcut{padding-right:1em}
                .X-Menu.Dark-Blue .X-Menu-Item>.X-Menu-Items{opacity:0}

                .X-Menu.Dark-Blue.FIRST>.X-Menu-Items{opacity:0}
                .X-Menu.Dark-Blue.ACTIVE>.X-Menu-Items{opacity:1;z-index:2}

                .X-Menu.Dark-Blue .X-Menu-Item.ACTIVE>.Label{background:#04789f}
                .X-Menu.Dark-Blue .X-Menu-Item.ACTIVE>.X-Menu-Items{opacity:1;z-index:2}

                .X-Menu.Dark-Blue .X-Menu-Items.OUT{opacity:0}


                .X-Menu.Dark-Blue .X-Separator{margin-left:calc(20px + 1em);padding:1px 0 1px 5px}
                .X-Menu.Dark-Blue .X-Separator::before{content:"";display:block;height:1px;background:#bec3cb}

            </style>
            <div style="margin-bottom:10px">
                <label>
                    <input id="showOnHover" type="checkbox" value="showOnHover"/> Enable showOnHover
                </label>
            </div>
            <div style="display:flex;background:#032041;color:#fff">

                <div class="X-Menu Dark-Blue" id="menu4">
                    <div class="Label"><div class="Name">File</div></div>
                    <div class="X-Menu-Items">
                        <div class="X-Menu-Item">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name">New</div>
                                <div class="Arrow"></div>
                            </div>
                            <div class="X-Menu-Items">
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Image…</div></div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Video…</div></div>
                                </div>
                            </div>
                        
                        </div>  
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Save</div><div class="Shortcut">Ctrl+S</div></div>
                        </div>
                        <div class="X-Separator"></div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Exit</div><div class="Shortcut">Alt+F4</div></div>
                        </div>
                    </div>
                </div>


                <div class="X-Menu Dark-Blue" id="menu5">
                    <div class="Label"><div class="Name">Edit</div></div>
                    <div class="X-Menu-Items">
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Cut</div><div class="Shortcut">Ctrl+X</div></div>
                        </div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Copy</div><div class="Shortcut">Ctrl+C</div></div>
                        </div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Paste</div><div class="Shortcut">Ctrl+V</div></div>
                        </div>
                    </div>
                </div>
            </div>
        
            <script>
                var menu4 = intell.controls.Menu($('#menu4'));
                var menu5 = intell.controls.Menu($('#menu5'));
                menu4.rootDelayHideTime = 500; // default is 0
                menu5.rootDelayHideTime = 500; // default is 0

                $('#showOnHover').change(function () {
                    menu5.showOnHover = menu4.showOnHover = this.checked;
                })
            
            </script>
        </div>
        <div class="item-code-block">
            <header>Source code - Dark Themes with fadein & fadeout</header>
            <code data-code-name="Example2"></code>    
        </div>

    </div>

    
    <div class="example-template Content">
        <div class="title">Dark Themes with fadein & fadeout And Dropdown arrow</div>

        <div data-code-ref="Example3">
            <style>
                /* Inherit css from dark theme */
                .X-Menu.DropArrow>.Label>.Arrow{margin-left:5px;font-family:fontello}
                
                .X-Menu.DropArrow>.X-Menu-Items>.Arrow{position:absolute;height:8px;width:8px;box-shadow:1px 1px 0 #04789f;background:#001629}                            
                .X-Menu.DropArrow>.X-Menu-Items>.Arrow.DOWN{bottom:-4px;transform:rotate(45deg)}
                .X-Menu.DropArrow>.X-Menu-Items>.Arrow.LEFT{left:-4px;transform: rotate(135deg)}
                .X-Menu.DropArrow>.X-Menu-Items>.Arrow.UP{top:-4px;transform:rotate(225deg)}
                .X-Menu.DropArrow>.X-Menu-Items>.Arrow.RIGHT{right:-4px;transform:rotate(315deg)}
            </style>
            <div style="display:flex;background:#032041;color:#fff">

                <div class="X-Menu Dark-Blue DropArrow" id="menu6">
                    <div class="Label"><div class="Name">File</div><div class="Arrow"></div></div>
                    <div class="X-Menu-Items">
                        <div class="Arrow"></div>
                        <div class="X-Menu-Item">
                            <div class="Label">
                                <div class="Icon"></div>
                                <div class="Name">New</div>
                                <div class="Arrow"></div>
                            </div>
                            <div class="X-Menu-Items">
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Image…</div></div>
                                </div>
                                <div class="X-Menu-Item">
                                    <div class="Label"><div class="Icon"></div><div class="Name">Video…</div></div>
                                </div>
                            </div>
                        
                        </div>  
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Save</div><div class="Shortcut">Ctrl+S</div></div>
                        </div>
                        <div class="X-Separator"></div>
                        <div class="X-Menu-Item">
                            <div class="Label"><div class="Icon"></div><div class="Name">Exit</div><div class="Shortcut">Alt+F4</div></div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                var menu6 = intell.controls.Menu($('#menu6'), { enableDropdownArrow: true });

            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Dark Themes with fadein & fadeout</header>
            <code data-code-name="Example3"></code>    
        </div>
    </div>

    <div class="Content" style="margin-top:10px">
        To create a custom theme, you should pick up a theme then edit it. Menu provides many state class as "FIRST" "ACTIVE" "OUT".
    </div>

</body>
</html>
