<%@ Page Language="C#" AutoEventWireup="false"%>
<%@ Register Src="~/bin/Controls/Nav-Bar.ascx" TagPrefix="uc1" TagName="NavBar" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>IntellJs API Documentation</title>
    <link href="/static/css/global.css" rel="stylesheet" />
    <style>        
        .document-session{max-width:980px}
        .document-session>.title{padding:15px 0;font-size:40px;word-wrap:break-word;word-break:break-all;text-align:center}
        .document-session .name{font-size:30px;text-decoration:underline}
        .document-session .list{margin:5px 0 20px 0;padding-left:40px}
        .document-session .list>.item{display:list-item;list-style-type:decimal;font-size:1.2em}
        .document-session .list>.item>a{display:inline-block;padding:2px 10px;color:#000;border:dashed 1px transparent;text-decoration:none}
        .document-session .list>.item>a:hover{border-color:#00bcf2}        
    </style>
</head>
<body>
    <uc1:NavBar runat="server" id="NavBar" />

    <div class="document-session Content">
        <div class="title">Intell Javascript</div>
        
        
        <div class="group">
            <div class="name">Core</div>
            <div class="list">
                <div class="item">
                    <a class="link" href="Intell">Intell</a>
                </div>
                <div class="item">
                    <a class="link" href="JQuery">JQuery Extension</a>
                </div>
            </div>
        </div>

        <div class="group">
            <div class="name">Intell.Controls</div>
            <div class="list">
                <div class="item">
                    <a class="link">Checkbox, Radiobox</a> -
                    <a class="link" href="/Intell/Controls/Checkbox/Demo">Demo</a>
                </div>

                <div class="item">
                    <a class="link" href="/Intell/Controls/ComboBox">ComboBox</a> - 
                    <a class="link" href="/Intell/Controls/ComboBox/Demo">demo</a>
                </div>

                <div class="item" style="display:none">
                    <a class="link" href="/Intell/Controls/ContextMenu">ContextMenu</a> - 
                    <a class="link" href="/Intell/Controls/ContextMenu/Demo">demo</a>
                </div>

                <div class="item">
                    <a class="link" href="/Intell/Controls/Menu">Menu</a> - 
                    <a class="link" href="/Intell/Controls/Menu/Demo">demo</a>
                </div>
                <div class="item"><a class="link" href="/Intell/Controls/NumericUpDown">NumericUpDown</a> - <a class="link" href="/Intell/Controls/NumericUpDown/demo">demo</a></div>
                <div class="item"><a class="link" href="/Intell/Controls/Slideshow">Slideshow</a> - <a class="link" href="/Intell/Controls/Slideshow/demo">demo</a></div>

                <div class="item"><a class="link" href="/Intell/Controls/TagsInput">TagsInput</a> - <a class="link" href="/Intell/Controls/TagsInput/demo">demo</a></div>
                <div class="item"><a class="link" href="/Intell/Controls/TargetPopup">TargetPopup</a> - <a class="link" href="/Intell/Controls/TargetPopup/demo">demo</a></div>
            </div>
        </div>

        <div class="group">
            <div class="name">Layouts</div>
            <div class="list">
                <div class="item">
                    <a class="link" href="Portal">Portal</a> - <a class="link" href="document/Portal/demo/portal.html">demo</a> - <a class="link" href="document/Portal/demo/simple.html">simple demo</a>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
