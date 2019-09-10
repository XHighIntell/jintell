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
        <div class="title">Light Theme</div>
        <div data-code-ref="Example1">
            <style>
                .X-TagsInput.Light{display:inline-flex;flex-wrap:wrap;border:1px solid #000;padding:4px 6px}
                .X-TagsInput.Light>.tag{display:inline-flex;border:1px solid #04b5d2;margin:2px;padding:2px 4px;background:#cefcff;border-radius:2px;animation:TagsInput-Tag .6s}
                .X-TagsInput.Light>.tag .X-Remove{align-self:center;margin-left:5px;padding:0 2px;border-radius:2px;font-size:90%;cursor:pointer}
                .X-TagsInput.Light>.tag .X-Remove:hover{background:rgba(0,0,0,.3);color:white}
                .X-TagsInput.Light>.tag .X-Remove::before{content:"✖"}
        
                .X-TagsInput.Light input{min-width:100px;padding:5px 10px;font-size:100%;border:none;outline:none}
        
                @keyframes TagsInput-Tag {from{}50%{background:#00f1ff}to{}}
            </style>
            <div id="control1" class="X-TagsInput Light">
                <input type="text" placeholder="add a tag" size="1">
            </div>

            <script>
                var control1 = intell.controls.TagsInput($('#control1'), { value: ['Microsoft', 'Intel'] });

            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>

    <div class="example-template Content">
        <div class="title">Dark Theme</div>
        <div data-code-ref="Example2" style="padding:10px;background:linear-gradient(141deg, #355c5c 0%, #000 51%, #114d64 75%)">
            <style>
                .X-TagsInput.Dark{display:inline-flex;flex-wrap:wrap;border:1px solid rgba(255,255,255,.5);padding:4px 6px}
                .X-TagsInput.Dark>.tag{display:inline-flex;border:1px solid #047ed2;margin:2px;padding:2px 4px;background:rgba(0,0,0,.2);border-radius:2px;color:#fff;animation:TagsInput-Tag-Dark .6s}
                .X-TagsInput.Dark>.tag .X-Remove{align-self:center;margin-left:5px;padding:0 2px;border-radius:2px;font-size:90%;cursor:pointer}
                .X-TagsInput.Dark>.tag .X-Remove:hover{background:rgba(4,126,210,.4);color:white}
                .X-TagsInput.Dark>.tag .X-Remove::before{content:"✖"}
                .X-TagsInput.Dark input{min-width:100px;padding:5px 10px;font-size:100%;border:none;outline:none;background:transparent;color:#fff}
                .X-TagsInput.Dark input::placeholder{}

        
                @keyframes TagsInput-Tag-Dark {from{}50%{background:#047ed2}to{}}
            </style>
            <div id="control2" class="X-TagsInput Dark">
                <input type="text" placeholder="add a tag" size="1">
            </div>

            <script>
                var control2 = intell.controls.TagsInput($('#control2'), { value: ['Microsoft', 'Intel'] });

            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>
</body>
</html>
