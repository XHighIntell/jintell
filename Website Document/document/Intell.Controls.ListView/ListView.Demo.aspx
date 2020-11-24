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
        <div class="title">Light Blue Themes - Multi Select</div>
        <div data-code-ref="Example1">
            <style>
                .X-ListView.Light-Blue{}
                .X-ListView.Light-Blue>.Items{overflow:auto}
                .X-ListView.Light-Blue>.Items>.Item{display:inline-flex;max-height:101px;vertical-align:top}
                .X-ListView.Light-Blue>.Items>.Item .Item-Wrap{display:inline-flex;width:94px;align-items:center;flex-direction:column;padding:8px 4px;margin:2px;cursor:pointer;border:1px solid transparent}
                .X-ListView.Light-Blue>.Items>.Item .Item-Wrap .Icon{flex:0 0 32px;display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:center url(/xortal/applications/transfusions/image/unknow.svg) no-repeat;background-size:contain;font-size:.7em;user-select:none}
                .X-ListView.Light-Blue>.Items>.Item .Item-Wrap .Name{width:100%;margin-top:4px;text-align:center;overflow:hidden;text-overflow:ellipsis;}
                .X-ListView.Light-Blue>.Items>.Item .Item-Wrap .Name .Line{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
                           
                .X-ListView.Light-Blue>.Items>.Item .Item-Wrap:hover{background:rgba(53,234,255,.15)}
                           
                .X-ListView.Light-Blue>.Items>.Item.SELECTED{position:relative}
                .X-ListView.Light-Blue>.Items>.Item.SELECTED .Item-Wrap{background:rgba(164,237,255,.5);border:1px solid rgba(67,179,255,.6)}
                .X-ListView.Light-Blue>.Items>.Item.SELECTED .Item-Wrap .Name .Line{white-space:pre-line;word-break:break-all}
            </style>
            <div id="listview1" class="X-ListView Light-Blue">
                <div class="Items">
                    <div class="Item abstract">
                        <div class="Item-Height">
                            <div class="Item-Wrap">
                                <div class="Icon"></div>
                                <div class="Name"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                $(document).ready(function() {
                    var listview = intell.controls.ListView.ListView($('#listview1'));
                    listview.multiSelect = true;

                    listview.add('118669_3330420096981144_4930466329388702720_o.jpg').refreshName(2);
                    listview.add('aaaaaaaaaaaaaaaaaaaa.dat').elementIcon.textContent = 'bin';
                    listview.add('bbb');
                    listview.add('ccc');
                    listview.add('ddd');
                    listview.add('eee');
                    listview.add('fff');

                    //listview.onitemclick(function(e) {
                    //    console.log('listview1 clicked', e);
                    //})
                    //listview.onitemmousedown(function(e) {
                    //    console.log('listview1 mousedown', e);
                    //})
                    //listview.onitemmouseup(function(e) {
                    //    console.log('listview1 mouseup', e);
                    //})
                    listview.onitemdblclick(function(e) {
                        console.log('listview1 onitemdblclick', e);
                    })
                    
                });

                
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Light Blue Themes - Tooltip</div>
        <div data-code-ref="Example2">
            <style>
                #tooltip2{position:absolute;padding:2px 6px;border:1px solid #767676;background:#fff;font-size:12px;pointer-events:none}
                #tooltip2 .property{display:flex}
                #tooltip2 .property .name{padding-right:.4em}
            </style>
            <div id="listview2" class="X-ListView Light-Blue"></div>
            <div id="tooltip2" style="display:none">
                <div class="property">
                    <div class="name">Type:</div>
                    <div class="value">ZIP File</div>
                </div>
                <div class="property">
                    <div class="name">Size:</div>
                    <div class="value">779 MB</div>
                </div>
                <div class="property">
                    <div class="name">Date modified:</div>
                    <div class="value">9/15/2020 1:17AM</div>
                </div>
            </div>
            <script>
                $(document).ready(function() {
                    var listview = intell.controls.ListView.ListView($('#listview2'));
                    var $tooltip = $('#tooltip2');

                    listview.add('aaa.dat')
                    listview.add('bbb.exe');
                    listview.add('ccc.zip');
                    listview.add('ddd.rar');
                    listview.add('eee.flv');
                    listview.add('fff.mp4');


                    var mouseEntered = false;
                    var pageX = 0;
                    var pageY = 0;
                    var timer = 0;
                    $(listview.element).on('mouseenter', '.Item-Wrap', function(e) {

                        var e = e.originalEvent;

                        mouseEntered = true;
                        pageX = e.pageX;
                        pageY = e.pageY;
                        timer = setTimeout(function() {
                            intell.showAt({ left: pageX, top: pageY }, $tooltip[0],
                                //[4, 8, 1, 2, 7, 3],
                                [9, 8, 6, 2, 7, 3],
                                { insideWindow: true, margin: 4, space: 10 });
                        }, 500);
                    });
                    $(listview.element).on('mousemove', '.Item-Wrap', function(e) {
                        var e = e.originalEvent;
                        pageX = e.pageX;
                        pageY = e.pageY;
                    });
                    $(listview.element).on('mouseleave', '.Item-Wrap', function() {
                        mouseEntered = false;
                        clearTimeout(timer);
                        $tooltip.hide();
                    });
                });
                
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Light Blue Themes - Tiles</div>
        <div data-code-ref="Example3">
            <style>
                .X-ListView.Light-Blue.Tiles{}
                .X-ListView.Light-Blue.Tiles>.Items>.Item .Item-Height{height:70px}
                .X-ListView.Light-Blue.Tiles>.Items>.Item .Item-Wrap{flex-direction:row;width:180px}

                .X-ListView.Light-Blue.Tiles>.Items>.Item .Item-Wrap .Detail{margin-left:.3em;overflow:hidden}
                .X-ListView.Light-Blue.Tiles>.Items>.Item .Item-Wrap .Detail .Size{color:gray}
                .X-ListView.Light-Blue.Tiles>.Items>.Item .Item-Wrap .Name{margin-top:0}
                .X-ListView.Light-Blue.Tiles>.Items>.Item.SELECTED .Item-Wrap .Name .Line {white-space:unset;word-break:unset}
            </style>
            <div id="listview3" class="X-ListView Light-Blue Tiles">
                <div class="Items"> 
                    <div class="Item abstract">
                        <div class="Item-Height">
                            <div class="Item-Wrap">
                                <div class="Icon"></div>
                                <div class="Detail">
                                    <div class="Name"></div>
                                    <div class="Size">123kb</div>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <script>
                $(document).ready(function() {
                    var listview = intell.controls.ListView.ListView($('#listview3'));
                    

                    listview.add('aasdasdasdasdasdaa.dat')
                    listview.add('bbb.exe');
                    listview.add('ccc.zip');
                    listview.add('ddd.rar');
                    listview.add('eee.flv');
                    listview.add('fff.mp4');


                    
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
