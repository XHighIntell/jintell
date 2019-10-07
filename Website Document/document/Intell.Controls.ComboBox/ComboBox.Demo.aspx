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

    <div class="example-template Content">
        <div class="title">ComboBox</div>
        <div data-code-ref="Example1">
            <style>
                .X-ComboBox.Light{display:inline-flex;position:relative;min-width:200px;align-content:center;padding:.3em .6em;border:1px solid #b6b6b6;box-shadow:none;outline:none;box-sizing:border-box}
                .X-ComboBox.Light:hover{background:rgba(20,20,20,.01)}
                .X-ComboBox.Light:focus{border-color:#0098ff}
                .X-ComboBox.Light::after{content:"▼";display:flex;align-items:center;padding-left:1em;font-size:.5em;color:rgba(0,0,0,.5)}
                .X-ComboBox.Light:focus::after{color:rgba(0,0,0,.9)}
                           
                .X-ComboBox.Light .Selected-Option{flex:1 1;min-height:1.4em}
                           
                .X-ComboBox.Light .Options{display:none;position:absolute;min-width:200px;border:1px solid #6f8ec0;background:#fff;box-sizing:border-box}
                .X-ComboBox.Light .Options>*{display:flex;align-items:center;padding:0 10px}
                .X-ComboBox.Light .Options>*:hover{background:#46a3f9;cursor:default}
                .X-ComboBox.Light .Options>*>.icon{margin-right:5px;font-size:.6em;font-family:fontello}

                .X-ComboBox.Light .Selected-Option>*{display:flex;align-items:center}
                .X-ComboBox.Light .Selected-Option>*>.icon{margin-right:5px;font-size:.6em;font-family:fontello}
            </style>

            <div id="combobox1" class="X-ComboBox Light" tabindex="0">
                <div class="Selected-Option"></div>
                <div class="Options">
                    <div class="item">
                        <div class="icon"></div>
                        <div class="name">Google Chrome</div>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div class="name">Internet Explorer</div>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div class="name">FireFox</div>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div class="name">Opera</div>
                    </div>
                </div>
            </div>
                
           


            <script>
                var combobox1 = new intell.controls.ComboBox($('#combobox1'));
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Combobox</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">ComboBox Dark</div>
        <div data-code-ref="Example2" style="padding:10px;background:linear-gradient(141deg,#355c5c 0%,#006874 51%,#114d64 75%)">
            <style>
                .X-ComboBox.Dark{display:inline-flex;position:relative;min-width:80px;align-content:center;padding:.3em .6em;border: 1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.5);color: #fff;box-shadow:none;outline:none;box-sizing:border-box}
                .X-ComboBox.Dark:hover{background:rgba(20,20,20,.5)}
                .X-ComboBox.Dark:focus{border-color:#0098ff}
                .X-ComboBox.Dark::after{content:"▼";display:flex;align-items:center;padding-left:1em;font-size:.5em;color:rgba(255,255,255,.5)}
                .X-ComboBox.Dark:focus::after{color:rgba(255,255,255,.9)}
                           
                .X-ComboBox.Dark .Selected-Option{display:flex;flex:1 1;min-height:1.1em;font-size:24px}
                .X-ComboBox.Dark .Selected-Option>.icon{font-family:fontello}

                .X-ComboBox.Dark .Options{display:none;position:absolute;min-width:200px;border:1px solid #6f8ec0;background:#03131a;box-sizing:border-box}
                .X-ComboBox.Dark .Options>*{display:flex;align-items:center;padding:0 10px}
                .X-ComboBox.Dark .Options>*:hover{background:#46a3f9;cursor:default}
                .X-ComboBox.Dark .Options>*>.icon{margin-right:5px;font-size:.6em;font-family:fontello}
                           
                .X-ComboBox.Dark .Selected-Option>*{display:flex;align-items:center}
                .X-ComboBox.Dark .Selected-Option>*>.icon{margin-right:5px;font-size:.6em;font-family:fontello}
            </style>

            <div>
                <div id="combobox2" class="X-ComboBox Dark" tabindex="0">
                    <div class="Selected-Option"></div>
                    <div class="Options">
                        <div class="item">
                            <div class="icon"></div>
                            <div class="name">Google Chrome</div>
                        </div>
                        <div class="item">
                            <div class="icon"></div>
                            <div class="name">Internet Explorer</div>
                        </div>
                        <div class="item">
                            <div class="icon"></div>
                            <div class="name">FireFox</div>
                        </div>
                        <div class="item">
                            <div class="icon"></div>
                            <div class="name">Opera</div>
                        </div>
                    </div>
                </div>
                
            </div>


            <script>
                
                var combobox2 = new intell.controls.ComboBox($('#combobox2'));
                combobox2.onchange(function(e) { });
                combobox2.onlabel(function(e) {
                    var $clone = $(e.target).find('.icon').clone();
                    

                    $(this.element).find('.Selected-Option').html('').append($clone);



                    e.preventDefault();
                    console.log(e);
                })
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Combobox</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>

</body>
</html>
