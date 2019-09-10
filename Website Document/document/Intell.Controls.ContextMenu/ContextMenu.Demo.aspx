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

    <script>
        $(document).ready(function () { liveexample.auto() });
    </script>
    <style>
        .example-template{margin-bottom:20px}
        .example-template>.title{margin:10px 0;font-size:1.3em;font-weight:bold}
    </style>
        

</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />



    <div class="example-template Content">
        <div class="title">Visual Studio Themes</div>
        <div data-code-ref="Example1">
            <style>
                .X-Menu-Items{display:none;position:absolute;margin-top:-1px;padding:2px;border:1px solid #9ba7b7;background:#eaf0ff;z-index:1}



                /* the left bar on dropdown with background */
                .X-Menu-Items::before{content:"";position:absolute;left:0;top:0;bottom:0;width:calc(22px + 1em);background:#f2f4fe}
                /* the left bar on dropdown with border */
                .X-Menu-Items::after{content:"";position:absolute;left:calc(22px + 1em);top:2px;bottom:2px;border-right:1px solid #bdbdbd}

                .X-Menu-Item{display:flex;position:relative}
                .X-Menu-Item>.Label{flex:1 1 auto;display:flex;align-items:center;cursor:pointer}
                .X-Menu-Item.ACTIVE>.Label{background:#fdf4bf}
                .X-Menu-Item>.Label>.Icon{align-self:stretch;display:flex;width:1em;align-items:center;padding:0 10px;font-family:fontello;box-sizing:content-box}
                .X-Menu-Item>.Label>.Name{flex:1 1 auto;padding:3px 40px 3px 8px;white-space:nowrap}
                .X-Menu-Item>.Label>.Arrow{padding:0 .3em 0 .5em}
                .X-Menu-Item>.Label>.Arrow:before{content:"";font-family:fontello}
                .X-Menu-Item>.Label>.Shortcut{padding-right:1em}
                .X-Menu-Item>.X-Menu-Items{display:none;position:absolute;padding:2px;border:1px solid #9ba7b7;left:100%;top:0;background:#eaf0ff;z-index:1}
                .X-Menu-Item>.X-Menu-Items.OUT{}
                .X-Menu-Item.ACTIVE>.X-Menu-Items{visibility:visible;opacity:1}

                .X-Separator{margin-left:calc(20px + 1em);padding:1px 0 1px 5px}
                .X-Separator::before{content:"";display:block;height:1px;background:#bec3cb}
            </style>

            <div id="context-menu1" class="X-Menu-Items">
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

            <script>
                var control1 = new intell.controls.ContextMenu($('#context-menu1'));

                $(document).mouseup(function(ev) {
                    if (ev.originalEvent.button != 2) return;

                    control1.show({ left: ev.pageX, top: ev.pageY });
                    ev.preventDefault();
                })
                $(document).contextmenu(function() {
                    return false;
                })
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>


   
</body>
</html>
