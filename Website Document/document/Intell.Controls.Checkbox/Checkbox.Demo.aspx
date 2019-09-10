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
        <div class="title">Checkbox</div>
        <div data-code-ref="Example1">
            <style>
                .X-Checkbox{display:inline-flex;align-items:center;cursor:pointer}
                .X-Checkbox .icon-check{display:flex;border:1px solid #098ec7;margin-right:7px;border-radius:1px}    
                .X-Checkbox .icon-check::before{content:"";color:#0095ff;font-weight:bold;visibility:hidden;font-family:fontello}
                .X-Checkbox.active .icon-check::before{visibility:visible}

                .X-Checkbox:hover .icon-check{background:rgba(0,0,0,0.04)}
                .X-Checkbox:active .icon-check{background:rgba(94,181,218,.2)}
            </style>

            <div>
                <div class="X-Checkbox">
                    <span class="icon-check"></span>
                    <span>Allow unsafe code</span>
                </div>
            </div>
            <div>
                <div class="X-Checkbox active">
                    <span class="icon-check"></span>
                    <span>Optimize code</span>
                </div>
            </div>

            <script>
                $('.X-Checkbox').click(function () {
                    $(this).toggleClass('active');
                })
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Checkbox</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>





    <div class="example-template Content">
        <div class="title">Radiobox</div>
        <div data-code-ref="Example2">
            <style>
                .X-Radiobox{display:flex;align-items:center;cursor:pointer}
                .X-Radiobox .icon-check{display:flex;width:1em;height:1em;border:1px solid #098ec7;margin-right:7px;border-radius:1em}
                .X-Radiobox:hover .icon-check{background:rgba(234,234,234,.4)}
                .X-Radiobox:active .icon-check{background:rgba(94,181,218,.2)}
                .X-Radiobox.active .icon-check::before{content:"";width:1em;margin:3px;border-radius:1em;background:#0063a9}
            </style>

            <div>
                <div class="X-Radiobox" title="None">
                    <span class="icon-check"></span>
                    <span>Start Project</span>
                </div>
                <div class="X-Radiobox" title="All">
                    <span class="icon-check"></span>
                    <span>Start external program</span>
                </div>
                <div class="X-Radiobox" title="All">
                    <span class="icon-check"></span>
                    <span>Start browser with URL</span>
                </div>
            </div>

            <script>
                $(document).on('click', '.X-Radiobox', function() {
                    $(this).addClass('active').parent().find('>.X-Radiobox').not(this).removeClass('active');
                });
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Radiobox</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>


</body>
</html>
