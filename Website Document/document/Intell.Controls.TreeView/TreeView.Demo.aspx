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
        <div class="title">Light Themes With Arrow</div>
        <div data-code-ref="Example1">
            <style>
                .X-Treeview.Light-Gray{display:flex;flex-direction:column;align-items:flex-start;padding:6px 20px;border:1px solid;overflow:auto}
                .X-Treeview.Light-Gray .Item{}
                .X-Treeview.Light-Gray .Item>.Label{position:relative;display:inline-flex;align-items:center;padding:2px 5px;border:1px solid transparent}
                .X-Treeview.Light-Gray .Item>.Label>.Arrow{position:absolute;display:flex;align-items:center;justify-content:center;left:-16px;width:16px;height:16px;margin-right:6px;visibility:hidden;font-family:fontello}
                .X-Treeview.Light-Gray .Item>.Label>.Arrow::before{content:""}
                .X-Treeview.Light-Gray .Item>.Label>.Arrow:hover{color:#6495ed}
                .X-Treeview.Light-Gray .Item>.Label>.Icon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-right:8px;background:center;background-size:contain;font-family:fontello}
                .X-Treeview.Light-Gray .Item>.Label>.Name{}
                .X-Treeview.Light-Gray .Item>.Children{display:none;padding-left:14px}
                .X-Treeview.Light-Gray .Item>.Label:hover{background:#ececec;cursor:pointer}
                         

                .X-Treeview.Light-Gray .Item.EXPANDED>.Label>.Arrow::before{content:""}
                .X-Treeview.Light-Gray .Item.EXPANDED>.Children{display:block}
                           
                .X-Treeview.Light-Gray .Item.SELECTED{}
                .X-Treeview.Light-Gray .Item.SELECTED>.Label{background:rgba(99,99,99,.4)}
                .X-Treeview.Light-Gray .Item.SELECTED>.Label:hover{border:1px solid rgba(0,0,0,.3)}
                           
                .X-Treeview.Light-Gray .Item.Root>.Label{display:none}
                .X-Treeview.Light-Gray .Item.HAS-CHILDREN>.Label>.Arrow{visibility:visible}
            </style>
            <div id="treeview1" class="X-Treeview Light-Gray">
                <div class="Children">
                    <div class="Item abstract">
                        <div class="Label">
                            <div class="Arrow"></div>
                            <div class="Icon"></div>
                            <div class="Name"></div>
                        </div>
                    </div>

                </div>
                
            </div>

            <script>

                $(document).ready(function() {
                    var treeview1 = window.treeview1 = intell.controls.TreeView.create($('#treeview1'));

                    var root = treeview1.add({ name: "This PC", icon: "" });
                    var bbb = root.add({ name: "Desktop", icon: "" });
                    bbb.add({ name: "song.mp3", icon: "" });

                    bbb.add({ name: "nan.png", icon: "" });
                    root.add({ name: "folder 1", icon: "https://www.flaticon.com/svg/static/icons/svg/3143/3143442.svg" });
                    root.add({ name: "folder 2", icon: "https://www.flaticon.com/svg/static/icons/svg/3143/3143442.svg" });
                });
                
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>



    <div class="example-template Content">
        <div class="title">Light Themes - Load items on expand</div>
        <div data-code-ref="Example2">
            
            <div id="treeview2" class="X-Treeview Light-Gray"></div>

            <script>

                $(document).ready(function() {
                    var treeview2 = window.treeview2 =  intell.controls.TreeView.create($('#treeview2'));

                    var root = treeview2.add({ name: "This Network", icon: "https://www.flaticon.com/svg/static/icons/svg/2580/2580757.svg" });
                    root.showExpandButton();

                    treeview2.onnodeexpand(function(e) {
                        var node = e.node;
                        if (node.added != true) {
                            node.add({ name: "Folder", icon: "https://www.flaticon.com/svg/static/icons/svg/2580/2580757.svg" }).showExpandButton();;
                            node.add({ name: "Folder", icon: "https://www.flaticon.com/svg/static/icons/svg/2580/2580757.svg" }).showExpandButton();;
                            node.added = true;
                        }
                    })
                });
                
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Light Blue Themes</div>
        <div data-code-ref="Example3">
            <style>
                .X-Treeview.Light-Blue{display:flex;flex-direction:column;align-items:flex-start;padding:6px 20px;border:1px solid;overflow:auto}
                .X-Treeview.Light-Blue .Item{}
                .X-Treeview.Light-Blue .Item>.Label{position:relative;display:inline-flex;align-items:center;padding:2px 5px;border:1px solid transparent}
                .X-Treeview.Light-Blue .Item>.Label>.Arrow{position:absolute;display:flex;align-items:center;justify-content:center;left:-16px;width:16px;height:16px;margin-right:6px;visibility:hidden;font-family:fontello}
                .X-Treeview.Light-Blue .Item>.Label>.Arrow::before{content:""}
                .X-Treeview.Light-Blue .Item>.Label>.Arrow:hover{color:#6495ed}
                .X-Treeview.Light-Blue .Item>.Label>.Icon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-right:8px;background:center;background-size:contain;font-family:fontello}
                .X-Treeview.Light-Blue .Item>.Label>.Name{}
                .X-Treeview.Light-Blue .Item>.Children{display:none;padding-left:14px}
                .X-Treeview.Light-Blue .Item>.Label:hover{background:rgba(0,206,255,.1);cursor:pointer}

                .X-Treeview.Light-Blue .Item.EXPANDED>.Label>.Arrow::before{content:""}
                .X-Treeview.Light-Blue .Item.EXPANDED>.Children{display:block}
                           

                .X-Treeview.Light-Blue .Item.SELECTED{}
                .X-Treeview.Light-Blue .Item.SELECTED>.Label{background:rgba(58,216,255,.2)}
                .X-Treeview.Light-Blue .Item.SELECTED>.Label:hover{border:1px solid rgba(67,179,255,.6)}
                            
                .X-Treeview.Light-Blue .Item.Root>.Label{display:none}
                .X-Treeview.Light-Blue .Item.HAS-CHILDREN>.Label>.Arrow{visibility:visible}
            </style>
            <div id="treeview3" class="X-Treeview Light-Blue">

            </div>

            <script>

                $(document).ready(function() {
                    var treeview = intell.controls.TreeView.create($('#treeview3'));

                    var root = treeview.add({ name: "This PC", icon: "" });
                    var bbb = root.add({ name: "Desktop", icon: "" });
                    bbb.add({ name: "song.mp3", icon: "" });

                    bbb.add({ name: "nan.png", icon: "" });
                    root.add({ name: "folder 1", icon: "https://www.flaticon.com/svg/static/icons/svg/3143/3143442.svg" });
                    root.add({ name: "folder 2", icon: "https://www.flaticon.com/svg/static/icons/svg/3143/3143442.svg" });
                });
                
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example3"></code>    
        </div>
    </div>


</body>
</html>
