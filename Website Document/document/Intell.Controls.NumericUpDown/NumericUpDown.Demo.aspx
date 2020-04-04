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
        <div class="title">Light Themes</div>
        <div data-code-ref="Example1">
            <style>
                .X-NumericUpDown.Light{display:inline-flex;border-color:#ccc}
                .X-NumericUpDown.Light input{text-align:right;padding-right:4px;border:1px solid;border-color:inherit}
                .X-NumericUpDown.Light input:focus{outline:none}
                .X-NumericUpDown.Light .X-Numeric-Buttons{border:1px solid;border-color:inherit;border-left:none}
                .X-NumericUpDown.Light .X-Numeric-Buttons .Button{display:flex;height:50%;align-items:center;padding:0 5px;cursor:pointer}
                .X-NumericUpDown.Light .X-Numeric-Buttons .Button:hover{background:rgba(0,0,0,.1)}
                .X-NumericUpDown.Light .X-Numeric-Buttons .Button:active{background:rgba(0,0,0,.2)}
                .X-NumericUpDown.Light .X-Up::before{content:"";font-family:fontello}
                .X-NumericUpDown.Light .X-Down::before{content:"";font-family:fontello}

                .X-NumericUpDown.Light.ACTIVE{}
                .X-NumericUpDown.Light.ACTIVE input{border-color:#0098ff}
            </style>

            <div id="control1" class="X-NumericUpDown Light">
                <input type="text" value="2.99">
                <div class="X-Numeric-Buttons">
                    <div class="Button X-Up"></div>
                    <div class="Button X-Down"></div>
                </div>
            </div>

            <script>
                var control1 = new intell.controls.NumericUpDown($('#control1'), { increment: 5, decimalPlaces: 2, max: 99.99, min: 0});
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>


    <div class="example-template Content">
        <div class="title">Dark Themes</div>
        <div data-code-ref="Example2" style="padding:10px;background:linear-gradient(141deg, #355c5c 0%, #006874 51%, #114d64 75%)">
            <style>
                .X-NumericUpDown.Dark{display:inline-flex;border-color:rgba(255,255,255,.4)}
                .X-NumericUpDown.Dark input{text-align:right;padding-right:4px;border:1px solid;border-color:inherit;background:rgba(0,0,0,.5);color:#fff}
                .X-NumericUpDown.Dark input:focus{outline:1px solid #0098ff;outline-offset:-1px}
                .X-NumericUpDown.Dark .X-Numeric-Buttons{border:1px solid;border-color:inherit;border-left:none;color:#fff}
                .X-NumericUpDown.Dark .X-Numeric-Buttons .Button{display:flex;height:50%;align-items:center;padding:0 5px;cursor:pointer}
                .X-NumericUpDown.Dark .X-Numeric-Buttons .Button:hover{background:rgba(0,0,0,.1)}
                .X-NumericUpDown.Dark .X-Numeric-Buttons .Button:active{background:rgba(0,0,0,.2)}
                .X-NumericUpDown.Dark .X-Up::before{content:"";font-family:fontello}
                .X-NumericUpDown.Dark .X-Down::before{content:"";font-family:fontello}

               
            </style>

            <div id="control2" class="X-NumericUpDown Dark">
                <input type="text" value="2.99">
                <div class="X-Numeric-Buttons">
                    <div class="Button X-Up"></div>
                    <div class="Button X-Down"></div>
                </div>
            </div>

            <script>
                var control2 = new intell.controls.NumericUpDown($('#control2'), { increment: 5, decimalPlaces: 2, max: 99.99, min: 0 });
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>


    <div class="example-template Content">
        <div class="title">Dark Themes</div>
        <div data-code-ref="Example3" style="padding:10px;background:linear-gradient(141deg, #355c5c 0%, #006874 51%, #114d64 75%)">
            <style>

               
            </style>

            <input id="control3" type="text" value="2.99" class="X-NumericUpDown Dark">

            <div  class="X-NumericUpDown Dark">
                
                <div class="X-Numeric-Buttons">
                    <div class="Button X-Up"></div>
                    <div class="Button X-Down"></div>
                </div>
            </div>

            <script>
                var control3 = new intell.controls.NumericUpDown($('#control3'), { increment: 0, decimalPlaces: 2, max: 99.99, min: 0 });
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example3"></code>
        </div>
    </div>
</body>
</html>
